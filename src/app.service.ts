import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  Default() {
    return {
      message: 'Hello There!',
      time: new Date(),
    }
  }
}
