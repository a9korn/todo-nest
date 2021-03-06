import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Todo } from './models/todo.model';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UpdateDto } from './dto/update.dto';
import { CreateDto } from './dto/create.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { TodoService } from './todo.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Todos')
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async getAll() {
    return this.todoService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.getOne(id);
  }

  @Post()
  async create(@Body() createDto: CreateDto): Promise<Todo> {
    return this.todoService.create(createDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.delete(id);
  }

  @ApiBody({ type: UpdateDto })
  @Patch()
  async update(@Body() updateDto: UpdateDto) {
    return this.todoService.update(updateDto);
  }
}
