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
    return this.tasksService.getJob(name);
  }

  @Get('all')
  async all(@Body('name') name: string) {
    return this.tasksService.all();
  }

  @Get('send')
  async send() {
    const send_array = [
      {
        task1: 'task1',
      },
      {
        task2: 'task2',
      },
    ];

    for (const task of send_array) {
      await this.tasksService.send(task);
    }

    return 'ok';
  }

  @Get('test')
  async test() {
    const json = [
      {
        id: 61,
        managed_funds_id: 21,
        wallet_uuid: '14be2f36-135c-41a2-a21d-2483e76a4bf9',
        currency: 'USD',
        amount: 55000,
      },
      {
        id: 62,
        managed_funds_id: 21,
        wallet_uuid: '7682730b-0c03-40bb-b661-627d8ea768f9',
        currency: 'EUR',
        amount: 56000,
      },
      {
        id: 63,
        managed_funds_id: 21,
        wallet_uuid: '38a2ab93-bd3b-4c18-a172-273992f3bc5f',
        currency: 'GBP',
        amount: 57000,
      },
    ];

    const usd = json.find((item) => item.currency === 'EUR1')?.amount;
    return usd;
  }
}
