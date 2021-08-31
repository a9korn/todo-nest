import 'dotenv/config';
import { utc } from 'moment';

export const setCutOfTime = (cronTime: string, addMinutes: number = 0) => {
  if (typeof cronTime != 'string') {
    throw new Error('cronTime must be a string!');
  }

  const cutOfTime = utc(process.env.CUT_OF_TIME, 'HH:mm').add(
    addMinutes,
    'minutes',
  );

  if (!cutOfTime.isValid()) {
    throw new Error(
      'please set correct value for CUT_OF_TIME in environment (exmpl.: CUT_OF_TIME=16:30 )!',
    );
  }

  const cronTimeArray = cronTime.split(' ');

  /** cron time with seconds */
  if (cronTimeArray.length === 6) {
    cronTimeArray[1] = cutOfTime.minutes().toString();
    cronTimeArray[2] = cutOfTime.hours().toString();

    return cronTimeArray.join(' ');
  }

  /** cron time without seconds, just minutes */
  if (cronTimeArray.length === 5) {
    cronTimeArray[0] = cutOfTime.minutes().toString();
    cronTimeArray[1] = cutOfTime.hours().toString();

    return cronTimeArray.join(' ');
  }

  throw new Error('Wrong cron time (exmpl: 30 16 * * *)');
};
