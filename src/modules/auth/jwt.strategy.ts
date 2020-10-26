import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '../user/user.entity'
import { AuthService } from './auth.service'


@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'starkey',
    })
  }

  async validate(payload: User) {
    console.log('user:', payload);
    
    const user = await this.authService.validateUser(payload)

    if (!user) {
      throw new UnauthorizedException('身份验证失败')
    }

    return user
  }
}
