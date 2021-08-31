import { applyDecorators, SetMetadata } from '@nestjs/common';

export function CutOfTimeDecorator() {
  console.log('test', this);
  return applyDecorators(SetMetadata('roles', 'role'));
}
