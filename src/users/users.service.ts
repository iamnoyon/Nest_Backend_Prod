import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async user_sign_up({ email, hashPass }) {
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

      const savedUser = await this.userRepository.save(user);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
