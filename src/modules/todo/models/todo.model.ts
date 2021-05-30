import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class Todo {
  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  id: number;

  @IsString()
  @ApiProperty({ type: String })
  label: string;

  @IsBoolean()
  @ApiProperty({ type: Boolean })
  important: boolean;

  @IsBoolean()
  @ApiProperty({ type: Boolean })
  like: boolean;

  @IsBoolean()
  @ApiProperty({ type: Boolean })
  isCompleted: boolean;
}
