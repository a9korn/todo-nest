import {IsBoolean, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateDto {
    @IsString()
    @ApiProperty({type: String, required: false})
    title: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({type:Boolean, required: true, default: false })
    isCompleted?: boolean;
}
