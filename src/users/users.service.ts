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
    const user = this.userRepository.create({
      email: email,
      password: hashPass,
    });

    await this.userRepository.save(user);
    return true;
  }
}
