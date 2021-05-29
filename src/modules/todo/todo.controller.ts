import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe} from '@nestjs/common';
import {Todo} from './models/todo.model';
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {UpdateDto} from "./dto/update.dto";
import {CreateDto} from "./dto/create.dto";

@ApiTags('Todos')
@Controller('todos')
export class TodoController {
  private index = 4;
  private todos: Todo[] = [
    {
      id: 1,
      title: 'first todo',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'second todo',
      isCompleted: true,
    },
    {
      id: 3,
      title: '3 todo',
      isCompleted: false,
    },
  ];

  @Get()
  async getAll() {
    return this.todos;
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id:number) {
    return this.todos.find(item=>item.id===id);
  }

  @Post()
  async create(@Body() createDto: CreateDto): Promise<Todo> {
    this.index++;
    const newTodo: Todo = {
      id: this.index,
      title: createDto.title,
      isCompleted: createDto.isCompleted || false,
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number){
    const delItem = this.todos.find(item=>item.id===id);

    this.todos = this.todos.filter(item=>{
      return item.id !== delItem.id
    });

    return delItem;
  }

  @ApiBody({ type: UpdateDto })
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateDto){
    this.todos = this.todos.map(item=>{
      return item.id !== id ? item : {...item, title: updateDto.title, isCompleted: updateDto.isCompleted}
    });

    return  this.todos.find(item=>item.id===id);
  }
}
