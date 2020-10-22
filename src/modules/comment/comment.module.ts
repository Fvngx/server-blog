import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { SmtpModule } from '../smtp/smtp.module'
import { UserModule } from '../user/user.module'
import { ArticleModule } from '../article/article.module'
import { Comment } from './comment.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    AuthModule,
    ArticleModule,
    SmtpModule,
    UserModule,
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
