import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  private users: User[] = [];
  private index = 0;

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = { id: this.index++, ...createUserDto };
    await this.users.push(newUser);
    console.log(`User was created: ${newUser.email}`);
    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
