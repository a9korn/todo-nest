import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
export class Todo {
  @ApiProperty({ type: Number })
  @IsNumber()
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @IsString()
  @ApiProperty({ type: String })
  @Column({ type: 'varchar' })
  label: string;

  @IsBoolean()
  @ApiProperty({ type: Boolean })
  @Column({ type: 'boolean' })
  important: boolean;

  @IsBoolean()
  @ApiProperty({ type: Boolean })
  @Column({ type: 'boolean' })
  like: boolean;

  @IsBoolean()
  @ApiProperty({ type: Boolean })
  @Column({ type: 'boolean' })
  isCompleted: boolean;

  @IsOptional()
  @Column({ type: 'varchar', nullable: true })
  ttt?: string;
}
