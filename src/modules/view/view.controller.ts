import { 
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { ViewService } from './view.service'


function getClientIP(req) {
  const ip = 
  req.headers['']
}
@Controller('view')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Post()
  create(@Request() req, @Body() data) {
    return this.viewService.create(view)
  }
}
