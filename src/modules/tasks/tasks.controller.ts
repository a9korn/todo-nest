import { Body, Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('add')
  async add() {
    return this.tasksService.addCronJob('job1', '5');
  }

  @Get('get')
  async get(@Body('name') name: string) {
    return this.tasksService.addCB();
  }
}
