import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { Todo } from './models/todo.model';

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

  @Post()
  async create(@Body() dto: Todo): Promise<Todo> {
    this.index++;
    const newTodo: Todo = {
      id: this.index,
      title: dto.title,
      isCompleted: false,
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number){
    const delItem = this.todos.find(item=>item.id===id);

    this.todos = this.todos.filter(item=>{
      return item.id !== delItem.id
    });

    return delItem;
  }

  @Patch(':id')
  async update(@Param('id', new ParseIntPipe()) id: number, @Body('isCompleted') isCompleted: boolean){

    this.todos = this.todos.map(item=>{
      return item.id !== id ? item : {...item, isCompleted}
    });

    const updateItem = this.todos.find(item=>item.id===id);

    return updateItem;
  }
}
