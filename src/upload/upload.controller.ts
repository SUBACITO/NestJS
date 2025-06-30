import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res, BadRequestException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { UploadService } from './upload.service';
import { Response } from 'express';


@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', { // 'file' là tên field mà client phải gửi
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Chỉ cho phép file hình ảnh!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    // console.log('Received file:', file);
    
    if (!file) {
      throw new BadRequestException('Không có file được upload');
    }
    
    const imageUrl = this.uploadService.getImageUrl(file.filename);
    
    return {
      success: true,
      message: 'Upload thành công',
      data: {
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
        url: imageUrl,
      },
    };
  }

  // API để truy cập file đã upload
  @Get('images/:filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: join(process.cwd(), 'uploads/images') });
  }
}

