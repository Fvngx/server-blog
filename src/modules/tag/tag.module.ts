import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { Tag } from './tag.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), AuthModule],
  exports: [TagService],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
