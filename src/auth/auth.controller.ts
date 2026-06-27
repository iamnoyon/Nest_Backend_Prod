import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { SignupDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  userSignUp(@Body() signupdto: SignupDto) {
    return this.authService.signUp(signupdto);
  }

  // login
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async userLogin(
    @Body() logindto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.logIn(logindto);
    if (result.success && 'token' in result) {
      res.cookie('access_token', result.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 15,
      });

      return {
        success: true,
        message: 'User is loggedIn successfully!',
      };
    }
    return result;
  }

  // profile
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  userProfile(@Req() req: Request) {
    return this.authService.profile(req);
  }
}
