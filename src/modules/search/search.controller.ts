import { 
  Controller,
  Get,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { SearchService } from './search.service'
import * as swagger from './search.swagger'

@Controller('search')
@ApiTags('搜索')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  /**
   * 搜索文章
   * @param keyword 
   */
  @Get('/article')
  async searchArticle(@Query('keyword') keyword: swagger.search) {
    return this.searchService.searchArticles('article', keyword)
  }

  /**
   * 获取搜索记录
   * @param queryParams 
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() queryParams: swagger.query) {
    return this.searchService.findAll(queryParams)
  }

  /**
   * 删除搜索记录
   * @param id 
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id: swagger.serchId) {
    return this.searchService.deleteById(id)
  }
}
