import {IsBoolean, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateDto {
    @IsString()
    @IsOptional()
    @ApiProperty({type: String, required: false})
    title?: string;

    @IsBoolean()
    @ApiProperty({type:Boolean, required: true })
    isCompleted: boolean;
}
