import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TasksService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_10_MINUTES, { name: '1min' })
  handleCron() {
    this.logger.debug('Called every 1 minute');
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
        return 'already runnig';
      }
    }

    const job = new CronJob(CronExpression.EVERY_5_SECONDS, () => {
      this.logger.warn(`time (${seconds}) for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob(name, job);

    job.start();

    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`,
    );

    return 'jobs';
  }

  async addCB() {
    const name = 'job1';
    if (!this.schedulerRegistry.doesExists('cron', name)) {
      return 'job does not exists';
    }

    const job = this.schedulerRegistry.getCronJob('job1');
    job.stop();
    console.log(job.running);
    return 'stopped';
  }
}
