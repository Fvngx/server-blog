import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { ArticleModule } from '../article/article.module'
import { Search } from './search.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Search]), AuthModule, ArticleModule],
  exports: [SearchService],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
