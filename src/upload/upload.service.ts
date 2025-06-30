import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  constructor() {
    // Đảm bảo thư mục uploads tồn tại
    const uploadPath = join(process.cwd(), 'uploads');
    const imagesPath = join(uploadPath, 'images');
    
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath);
    }
    
    if (!existsSync(imagesPath)) {
      mkdirSync(imagesPath);
    }
  }

  getImageUrl(filename: string): string {
    // Trả về URL để truy cập file
    return `${process.env.API_URL || 'http://localhost:3000'}/uploads/images/${filename}`;
  }
}