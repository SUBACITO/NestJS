import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UploadController,],
  providers: [UploadService, JwtService],
  exports: [UploadService],
})
export class UploadModule {}