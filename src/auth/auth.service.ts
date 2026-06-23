import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { hashPassword } from 'utils/hashPassword';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async signUp(signupdto) {
    const { email, password } = signupdto;
    const hashPass = await hashPassword(password);

    return this.userService.user_sign_up({ email, hashPass });
  }
}
