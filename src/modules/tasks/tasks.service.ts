import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { setCutOfTime } from '../../common/utils';
import { CronCutOfTime } from '../../decorators/user-jwt.decorator';

@Injectable()
export class TasksService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  private readonly logger = new Logger(TasksService.name);

  @CronCutOfTime('* * * * * *')
  async handleCron() {
    console.log('CronExpression.EVERY_10_MINUTES', new Date());
  }

  async addCronJob(name: string, seconds: string) {
    const r = this.schedulerRegistry.doesExists('cron', name);
    if (r) {
      console.log('exists');
      const job = this.schedulerRegistry.getCronJob(name);
      if (!job.running) {
        job.start();
        return 'started';
      } else {
        return 'already runnig' + new Date().toString();
      }
    }

    let a = 't';

    const job = new CronJob(
      '*/5 * * * * *',
      () => {
        this.show(a);
        this.logger.warn(`time (${seconds}) for job ${name} to run!`);
      },
      () => {
        console.log('COMPLETE!');
      },
      true,
      'Europe/London',
      { test: 1 },
    );

    // job.start();

    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`,
    );

    return {
      name,
      running: job.running,
      nextDate: job
        .nextDate()
        .toDate()
        .toLocaleString('en-GB', { timeZone: 'Europe/London' }),
    };
  }

  async show(test: string) {
    console.log('TEST=' + test);
  }

  async all() {
    const jobs = this.schedulerRegistry.getCronJobs();
    const jobsArray = [];
    for (const [key, job] of jobs) {
      jobsArray.push({
        name: key,
        nextDate: job.nextDate(),
        running: job.running,
      });
    }
    return jobsArray;
  }

  async getJob(name: string) {
    if (!this.schedulerRegistry.doesExists('cron', name)) {
      return 'job does not exists';
    }

    const job = this.schedulerRegistry.getCronJob(name);
    return {
      name,
      running: job.running,
      nextDate: job
        .nextDate()
        .toDate()
        .toLocaleString('en-GB', { timeZone: 'Europe/London' }),
    };
  }

  async send(params) {
    const job = new CronJob(
      '0 */1 * * * *',
      () => {
        console.log('params: ', params);
        job.stop();
      },
      null,
      true,
    );
  }
}
