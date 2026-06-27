import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { comparePassword } from '../../utils/hashPassword';
import { JwtPayload } from 'src/auth/guards/jwt.guard';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async user_sign_up({ email, hashPass }: { email: string; hashPass: string }) {
    try {
      const find_user = await this.userRepository.findOne({
        where: { email },
      });

      if (find_user) {
        return {
          success: false,
          message: 'User already exist with this email.',
        };
      }

      const user = this.userRepository.create({
        email,
        password: hashPass,
      });

      // it can return current user also
      await this.userRepository.save(user);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // user login service
  async log_in({ email, password }: { email: string; password: string }) {
    try {
      const find_user = await this.userRepository.findOne({
        where: { email },
      });

      // if not found then send response
      if (!find_user) {
        return {
          success: false,
          message: 'User not exist with this email!',
        };
      }

      // match the password
      const isMatch = await comparePassword(password, find_user.password);

      // if password is not match then send res
      if (!isMatch) {
        return {
          success: false,
          message: 'Password is incorrect!',
        };
      }
      return {
        success: true,
        user: find_user,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // profile
  async get_profile(user: JwtPayload) {}
}
