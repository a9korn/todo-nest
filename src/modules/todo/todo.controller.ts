import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {Todo} from './models/todo.model';
import {ApiBody, ApiTags} from "@nestjs/swagger";

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
  async delete(@Param('id', ParseIntPipe) id: number){
    const delItem = this.todos.find(item=>item.id===id);

    this.todos = this.todos.filter(item=>{
      return item.id !== delItem.id
    });

    return delItem;
  }

  @ApiBody({ type: Todo })
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body('isCompleted') isCompleted: boolean){

    this.todos = this.todos.map(item=>{
      return item.id !== id ? item : {...item, isCompleted}
    });

    const updateItem = this.todos.find(item=>item.id===id);

    return updateItem;
  }
}
