import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const validUser = await this.authService.validateUser(authDto);
    if (!validUser) {
      throw new UnauthorizedException('Login is not valid!');
    }

    return this.authService.login(validUser);
  }
}
