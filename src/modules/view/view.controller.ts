import { 
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards,
  Body,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ViewService } from './view.service'
import * as view from './view.swagger'

function getClientIP(req) {
  const ip = 
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    (req.connection && req.connection.remoteAddress) || // 判断 connection 的远程 IP
    (req.socket && req.socket.remoteAddress) || // 判断后端的socket 的 IP
    (req.connection && 
      req.connection.socket &&
      req.connection.socket.remoteAddress)
    
  return ip.split(':').pop()
}

@Controller('view')
@ApiTags('阅读量')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  /**
   * 添加访问
   * @param req 
   * @param data 
   */
  @Post()
  create(@Request() req, @Body() data: view.viewCreate) {
    const userAgent = req.headers['user-agent']
    const url = data.url
    return this.viewService.create(getClientIP(req), userAgent, url)
  }

  /**
   * 获取所有访问
   * @param queryParam 
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() queryParam: view.viewsAll) {
    return this.viewService.findAll(queryParam)
  }

  /**
   * 获取指定访问
   * @param url 
   */
  @Get('url')
  @UseGuards(JwtAuthGuard)
  findByUrl(@Query('url') url:view.viewsUrl) {
    return this.viewService.findByUrl(url)
  }

  /**
   * 获取指定访问
   * @param id 
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(@Param('id') id:view.viewsId) {
    return this.viewService.findById(id)
  }

  /**
   * 更新页面
   * @param id
   * @param info 
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateIpAddress(@Param('id') id, @Body() info: view.updateAddress) {
    return this.viewService.updateIpAddress(id, info)
  }

  /**
   * 删除访问
   * @param id 
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id) {
    return this.viewService.deleteById(id)
  }
}
