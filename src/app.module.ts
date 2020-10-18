import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from './modules/article/article.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { SearchModule } from './modules/search/search.module';
import { SmtpModule } from './modules/smtp/smtp.module';
import { TagModule } from './modules/tag/tag.module';
import { ViewModule } from './modules/view/view.module';

@Module({
  imports: [UserModule, ArticleModule, AuthModule, CategoryModule, CommentModule, SearchModule, SmtpModule, TagModule, ViewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
