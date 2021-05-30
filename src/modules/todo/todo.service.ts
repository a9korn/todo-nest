import { Injectable } from '@nestjs/common';
import { Todo } from './models/todo.model';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class TodoService {
  public index = 4;
  private todos: Todo[] = [];

  constructor() {
    this.todos = [
      {
        id: 1,
        label: 'first todo',
        important: true,
        like: true,
        isCompleted: false,
      },
      {
        id: 2,
        label: 'second todo',
        important: true,
        like: true,
        isCompleted: true,
      },
      {
        id: 3,
        label: '3 todo',
        important: true,
        like: true,
        isCompleted: false,
      },
    ];
  }

  async getAll(): Promise<Todo[]> {
    return this.todos;
  }

  async getOne(id: number): Promise<Todo> {
    return this.todos.find((item) => item.id === id);
  }

  async create(createDto: CreateDto): Promise<Todo> {
    this.index++;
    const newTodo: Todo = {
      id: this.index,
      label: createDto.label,
      important: false,
      like: false,
      isCompleted: createDto.isCompleted || false,
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  async delete(id: number) {
    const delItem = this.todos.find((item) => item.id === id);

    this.todos = this.todos.filter((item) => {
      return item.id !== delItem.id;
    });

    return delItem;
  }

  async update(updateDto: UpdateDto) {
    this.todos = this.todos.map((item) => {
      return item.id !== updateDto.id
        ? item
        : {
            ...item,
            label: updateDto.label,
            isCompleted: updateDto.isCompleted,
          };
    });

    return this.todos.find((item) => item.id === updateDto.id);
  }
}
