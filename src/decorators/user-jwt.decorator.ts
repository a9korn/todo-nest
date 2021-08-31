import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ENV_DEFAULT_TIMEZONE } from '../app.constants';
import { CronOptions } from '@nestjs/schedule/dist/decorators/cron.decorator';
import { setCutOfTime } from '../common/utils';

export const userJwtDecorator = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);

export function CronDefaultTZ(cronTime: string, options?: CronOptions) {
  return applyDecorators(
    Cron(cronTime, { ...options, timeZone: ENV_DEFAULT_TIMEZONE }),
  );
}

export function CronCutOfTime(cronTime: string, options?: CronOptions) {
  const cutOfTime = setCutOfTime(cronTime);
  console.log('cutOfTime: ', cutOfTime);
  return applyDecorators(CronDefaultTZ(cutOfTime, options));
}
