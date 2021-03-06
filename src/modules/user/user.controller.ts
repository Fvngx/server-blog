import { 
  Controller,
  HttpException,
  HttpStatus,
  HttpCode,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { User } from './user.entity'
import { UserService } from './user.service'
import * as userSwager from './user.swagger'

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * 查找所有用户
   * @param query 
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Query() query: userSwager.findUsers) {
    return this.userService.findAll(query)
  }

  /**
   * 注册用户
   * @param user 
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() user: userSwager.registerUser): Promise<User> {
    return await this.userService.createUser(user)
  }

  /**
   * 权限验证
   * @param req 
   * @param user 
   */
  async checkPermission(req, user) {
    let token = req.headers.authorization
    if (!token) {
      throw new HttpException('未认证', HttpStatus.UNAUTHORIZED)
    }

    if (/Bearer/.test(token)) {
      // 不需要Bearer，否则验证失败
      token = token.split(' ').pop()
    }
    const tokenUser = this.jwtService.decode(token) as any
    const id = tokenUser.id
    if (!id) {
      throw new HttpException('未认证', HttpStatus.UNAUTHORIZED)
    }

    const exist = await this.userService.findById(id)
    if (exist.id !== user.id) {
      throw new HttpException('无权处理', HttpStatus.FORBIDDEN)
    }
  }

  /**
   * 更新用户信息
   * @param req 
   * @param user 
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('update')
  @HttpCode(HttpStatus.CREATED)
  async update(@Request() req, @Body() user: userSwager.updateUser): Promise<User> {
    await this.checkPermission(req, user)
    return await this.userService.updateById(user.id, user)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('updatePassword')
  @HttpCode(HttpStatus.CREATED)
  async updatePassword(@Request() req, @Body() user: userSwager.updatePass): Promise<User> {
    await this.checkPermission(req, user)
    return await this.userService.updatePassword(user.id, user)
  }
}
