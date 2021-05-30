import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {
  @IsNumber()
  @ApiProperty({ type: Number, required: true })
  id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  label?: string;

  @IsBoolean()
  @ApiProperty({ type: Boolean, required: true })
  isCompleted: boolean;
}
