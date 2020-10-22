import { Module } from '@nestjs/common';
import { SmtpController } from './smtp.controller';
import { SmtpService } from './smtp.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { SMTP } from './smtp.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SMTP]), AuthModule],
  exports: [SmtpService],
  controllers: [SmtpController],
  providers: [SmtpService]
})
export class SmtpModule {}
