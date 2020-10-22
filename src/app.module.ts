import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleModule } from './modules/article/article.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { SearchModule } from './modules/search/search.module';
import { SmtpModule } from './modules/smtp/smtp.module';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';
import { ViewModule } from './modules/view/view.module';

import { User } from './modules/user/user.entity'
import { Article } from './modules/article/article.entity'
import { Category } from './modules/category/category.entity'
import { Comment } from './modules/comment/comment.entity'
import { Search } from './modules/search/search.entity'
import { SMTP } from './modules/smtp/smtp.entity'
import { Tag } from './modules/tag/tag.entity'
import { View } from './modules/view/view.entity'

import {config} from './config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...config.mysql,
      entities: [
        User,
        Article,
        Category,
        Comment,
        Search,
        SMTP,
        Tag,
        View,
      ],
      synchronize: true,
    }),
    ArticleModule,
    AuthModule,
    CategoryModule,
    CommentModule,
    SearchModule,
    SmtpModule,
    TagModule,
    UserModule,
    ViewModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
