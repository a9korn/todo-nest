import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { userJwtDecorator } from '../../decorators/user-jwt.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async all(@userJwtDecorator() email: string): Promise<User[]> {
    console.log('jwt-user:', email);
    return this.userService.findAll();
  }
}
