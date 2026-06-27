import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signUp.dto';
import { hashPassword } from '../../utils/hashPassword';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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
      const payload = {
        id: result.user?.id,
        email: result.user?.email,
      };

      const access_token = await this.jwtService.signAsync(payload);

      return {
        success: true,
        token: access_token,
      };
    }
    return result;
  }
}
