import { 
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { TagService } from './tag.service'
import * as swagger from './tag.swagger' 

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  /**
   * 添加标签
   * @param tag 
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() tag: swagger.tag) {
    return this.tagService.create(tag)
  }

  /**
   * 获取所有标签
   * @param queryParams 
   */
  @Get()
  findAll(@Query() queryParams:swagger.query) {
    return this.tagService.findAll(queryParams)
  }

  /**
   * 获取指定标签
   * @param id 
   */
  @Get(':id')
  findById(@Param('id') id:swagger.tagId) {
    return this.tagService.findById(id)
  }

  /**
   * 获取指定文章，包含的文章
   * @param id 
   * @param status 
   */
  @Get(':id/articles')
  getArticlesById(@Param('id') id: swagger.tagId, @Query('status') status) {
    return this.tagService.getArticleById(id, status)
  }

  /**
   * 更新标签
   * @param id 
   * @param tag 
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateById(@Param('id') id: swagger.tagId, @Body() tag: swagger.tag) {
    return this.tagService.updateById(id, tag)
  }

  /**
   * 删除指定标签
   * @param id 
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id: swagger.tagId) {
    return this.tagService.deleteById(id)
  }
}
