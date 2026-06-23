import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<UsersService>,
  ) {}

  async user_sign_up({ email, hashPass }) {
    const user = this.userRepository.create({
      email: email,
      password: hashPass,
    });

    return await this.userRepository.save(user);
  }
}
