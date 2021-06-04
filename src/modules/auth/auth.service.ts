import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { User } from '../user/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

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

  async login(user: User) {
    const payload = { email: user.email };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authDto: AuthDto): Promise<User> {
    const user = await this.userService.findByEmail(authDto.login);
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    const isCorrectPassword = await compare(
      authDto.password,
      user.passwordHash,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException('User password error!');
    }

    return user;
  }
}
