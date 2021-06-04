import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ type: String, required: true, default: 'user1@mail.com' })
  @IsString()
  login: string;

  @ApiProperty({ type: String, required: true, default: 'pass1' })
  @IsString()
  password: string;
}
