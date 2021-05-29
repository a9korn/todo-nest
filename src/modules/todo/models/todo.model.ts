import {ApiProperty} from "@nestjs/swagger";

export class Todo {
    @ApiProperty({type: Number, required: false})
    id: number;

    @ApiProperty({type: String})
    title: string;

    @ApiProperty({type: Boolean})
    isCompleted: boolean;
}
