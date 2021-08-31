import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@ApiTags('Base')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('load')
  @UseInterceptors(FileInterceptor('file'))
  loadFile(@Req() request, @UploadedFile() file) {
    console.log('file: ', file);
    fs.writeFileSync(file.originalname, file.buffer);
    return 'ok';
  }
}
