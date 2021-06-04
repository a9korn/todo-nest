import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { genSalt, hash } from 'bcrypt';
import { User } from '../user/models/user.model';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(authDto: AuthDto): Promise<User> {
    const salt = await genSalt(10);

    const oldUser = await this.userService.findByEmail(authDto.login);
    if (oldUser) {
      throw new BadRequestException(
        `User with login ${authDto.login} already exists!`,
      );
    }

    return await this.userService.create({
      email: authDto.login,
      passwordHash: await hash(authDto.password, salt),
    });
  }
}
