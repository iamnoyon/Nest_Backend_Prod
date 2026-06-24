import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('/signup')
  userSignUp(@Body() signupdto: SignupDto) {
    return this.userService.user_sign_up(signupdto);
  }
}
