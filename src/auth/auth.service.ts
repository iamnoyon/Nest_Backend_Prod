import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  signUp(signupdto) {
    const { email, password } = signupdto;
    console.log(email, password);
    return this.userService.user_sign_up();
  }
}
