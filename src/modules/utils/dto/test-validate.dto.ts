import { IsNumber, IsString } from 'class-validator';

export class TestValidateDto {
  @IsString()
  user: string;

  @IsNumber()
  number: number;
}

export class TestValidateDto1 {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
}
