import { Module } from '@nestjs/common';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { View } from './view.entity'

@Module({
  imports: [TypeOrmModule.forFeature([View]), AuthModule],
  exports: [ViewService],
  controllers: [ViewController],
  providers: [ViewService]
})
export class ViewModule {}
