import { 
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Query,
  Param,
  Body,
  UseGuards
 } from '@nestjs/common';
 import { JwtAuthGuard } from '../auth/jwt-auth.guard'
 import { CategoryService } from './category.service'
 import { Category } from './category.entity'
 import * as swagger from './categor.swagger'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 创建分类
   * @param category 
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() category: swagger.category) {
    return this.categoryService.create(category)
  }

  /**
   * 获取所有分类
   * @param queryParams 
   */
  @Get()
  findAll(@Query() queryParams: swagger.queryParams): Promise<Category[]> {
    return this.categoryService.findAll(queryParams)
  }

  /**
   * 获取指定分类
   * @param id 
   */
  @Get(':id')
  findById(@Param('id') id: swagger.categoryId) {
    return this.categoryService.findById(id)
  }

  /**
   * 更新分类
   * @param id 
   * @param category 
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateById(@Param('id') id: swagger.categoryId, @Body() category: swagger.updateCategory) {
    return this.categoryService.updateById(id, category)
  }

  /**
   * 删除指定分类
   * @param id 
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id: swagger.categoryId) {
    return this.categoryService.deleteById(id)
  }
}
