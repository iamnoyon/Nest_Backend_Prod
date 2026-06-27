import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signUp.dto';
import { hashPassword } from '../../utils/hashPassword';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async signUp(signupdto: SignupDto) {
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

  async logIn(logindto: SignupDto) {
    const { email, password } = logindto;
    const result = await this.userService.log_in({ email, password });
    if (result.success) {
      return {
        success: true,
        message: 'User loggedin successful!',
      };
    }
    return result;
  }
}
