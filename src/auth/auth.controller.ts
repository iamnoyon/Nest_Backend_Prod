import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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
  userLogin(@Body() logindto: SignupDto) {
    return this.authService.logIn(logindto);
  }
}
