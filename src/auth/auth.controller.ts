import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { SignupDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  userSignUp(@Body() signupdto: SignupDto) {
    return this.authService.signUp(signupdto);
  }

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
}
