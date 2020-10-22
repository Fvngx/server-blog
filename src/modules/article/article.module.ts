import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { UserModule } from '../user/user.module'
import { TagModule } from '../tag/tag.module'
import { CategoryModule } from '../category/category.module'
import { Article } from './article.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    CategoryModule,
    TagModule,
    UserModule,
    AuthModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
