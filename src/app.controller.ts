import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Return to current time of server backend

  @Get()
  Default(){
    return this.appService.Default();
  }

}
