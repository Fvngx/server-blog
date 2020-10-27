import { 
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { SmtpService } from './smtp.service'
import * as swagger from './smtp.swagger'

@Controller('smtp')
export class SmtpController {
  constructor(private readonly smtpService: SmtpService) {}

  /**
   * 发送邮件
   * @param data 
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() data:swagger.smtp) {
    return this.smtpService.create(data)
  }

  /**
   * 获取所有邮件记录
   * @param queryParams 
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() queryParams:swagger.query) {
    return this.smtpService.findAll(queryParams)
  }

  /**
   * 删除邮件记录
   * @param id 
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id:swagger.smtpId) {
    return this.smtpService.deleteById(id)
  }
}
