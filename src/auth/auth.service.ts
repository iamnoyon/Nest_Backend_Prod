import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { hashPassword } from 'utils/hashPassword';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async signUp(signupdto) {
    const { email, password } = signupdto;
    const hashPass = await hashPassword(password);
    const result = await this.userService.user_sign_up({ email, hashPass });
    if (result.success) {
      return {
        success: true,
        message: 'Registration successful!',
      };
    }
    return result;
  }
}
