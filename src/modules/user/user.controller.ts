import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async all(): Promise<User[]> {
    return this.userService.findAll();
  }
}
