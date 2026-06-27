import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ example: '12345678' })
  @MaxLength(50, { message: 'Password cannot exceed 50 characters' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
