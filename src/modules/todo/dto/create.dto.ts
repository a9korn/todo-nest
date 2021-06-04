import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDto {
  @IsString()
  @ApiProperty({ type: String, default: 'My new label' })
  label: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, default: false })
  important: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, default: false })
  like: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, default: false })
  isCompleted?: boolean;
}
