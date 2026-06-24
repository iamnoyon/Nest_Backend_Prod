import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignupDto } from './dto/signUp.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  userSignUp(@Body() signupdto: SignupDto) {
    return this.userService.user_sign_up(signupdto);
  }
}
