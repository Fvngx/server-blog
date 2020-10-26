import { 
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { TagService } from './tag.service'
import { Tag } from './tag.entity'
import * as swagger from './tag.swagger'
import { ApiTags } from '@nestjs/swagger';

@Controller('tag')
@ApiTags('标签')
@UseGuards(JwtAuthGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  /**
   * 添加标签
   * @param tag 
   */
  @Post()
  create(@Body() tag: swagger.tag) {
    return this.tagService.create(tag)
  }

  /**
   * 获取所有标签
   * @param queryParams 
   */
  @Get()
  findAll(@Query() queryParams: swagger.findTags): Promise<Tag[]> {
    return this.tagService.findAll(queryParams)
  }

  /**
   * 获取指定标签
   * @param id 
   */
  @Get(':id')
  findById(@Param('id') id) {
    return this.tagService.findById(id)
  }

  /**
   * 获取指定标签，包含的文章
   * @param id 
   * @param status 
   */
  @Get(':id/article')
  getArticleById(@Param('id') id, @Query('status') status: swagger.articlesById) {
    return this.tagService.getArticleById(id, status)
  }

  /**
   * 更新标签
   * @param id 
   * @param tag 
   */
  @Patch(':id')
  updateById(@Param('id') id, @Body() tag: swagger.updateTag) {
    return this.tagService.updateById(id, tag)
  }

  /**
   * 删除标签
   * @param id 
   */
  @Delete(':id')
  deleteById(@Param('id') id) {
    return this.tagService.deleteById(id)
  }
}
