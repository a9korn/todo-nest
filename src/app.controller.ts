import { Body, Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiTags} from "@nestjs/swagger";
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

export class SampleDto {
  name: string;
}
@ApiTags('Base')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  async getFile(@Body() body: SampleDto,@UploadedFile() file, @Res() res) {
    const baseDir = process.cwd() + '/public/';
    await fs.writeFileSync(baseDir + file.originalname,file.buffer);

    return res.sendFile(baseDir + file.originalname);
    // return fs.createReadStream('test1.jpg').pipe(res);
  }
}
