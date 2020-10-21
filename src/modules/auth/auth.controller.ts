import { 
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
 } from '@nestjs/common';
 import { ApiProperty, ApiTags } from '@nestjs/swagger'
 import { AuthService } from './auth.service'

class LoginUser {
  @ApiProperty({description: '用户名', required: true})
  name: string
  @ApiProperty({description: '密码', required: true})
  password: string
}

@Controller('auth')
@ApiTags('登录')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  /**
   * 用户登录
   * @param user 
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: LoginUser) {
    return await this.authService.login(user)
  }
}
