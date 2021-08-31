import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
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
  async getFile(@Body() body: SampleDto, @UploadedFile() file) {
    const baseDir = process.cwd() + '/public/';
    await fs.writeFileSync(baseDir + file.originalname, file.buffer);

    const fileData = await fs.readFileSync(baseDir + file.originalname);
    return {
      type: 'image/png',
      data: fileData.toString('base64'),
    };
    // const buffer = await fs.readFileSync(baseDir + file.originalname);
    // return { data: buffer };
    // return res.sendFile(baseDir + file.originalname);
    // return fs.createReadStream(baseDir + file.originalname).pipe(response);
  }

  @Get('load')
  async load() {
    const image = process.cwd() + '/public/_CA3M00001.png';

    const fileData = await fs.readFileSync(image);
    return { type: 'image/png', data: fileData.toString('base64') };
  }
}
