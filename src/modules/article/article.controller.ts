import { 
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ArticleService } from './article.service'
import { Article } from './article.entity'
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import * as swagger from './article.swagger'

@Controller('article')
@ApiTags('文章')
@UseGuards(JwtAuthGuard)
export class ArticleController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly articleService: ArticleService,
    private readonly userService: UserService
  ) {}

  /**
   * 创建文章
   * @param article 
   */
  @Post()
  create(@Body() article: swagger.articleAdd) {
    return this.articleService.create(article)
  }

  /**
   * 获取所有文章
   * @param queryParams 
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() queryParams: swagger.findArticles) {
    return this.articleService.findById(queryParams)
  }

  /**
   * 获取分类下所有文章
   * @param category 
   * @param queryParams 
   */
  @Get('/category/:id')
  @HttpCode(HttpStatus.OK)
  findArticleByCategory(@Param('id') category: swagger.categoryId, @Query() queryParams: swagger.findArticles) {
    return this.articleService.findArticlesByCategory(category, queryParams)
  }

  /**
   * 获取标签下所有文章
   * @param tag 
   * @param queryParams 
   */
  @Get('/tag/:id')
  @HttpCode(HttpStatus.OK)
  findByTag(@Param('id') tag: swagger.tagId, @Query() queryParams: swagger.findArticles) {
    return this.articleService.findArticlesByTag(tag, queryParams)
  }

  /**
   * 获取所有归档文章
   */
  @Get('/archives')
  @HttpCode(HttpStatus.OK)
  getAtchives(): Promise<{ [key: string]: Article[] }> {
    return this.articleService.getArchives()
  }

  /**
   * 推荐文章
   * @param articleId 
   */
  @Get('/recommend')
  @HttpCode(HttpStatus.OK)
  recommend(@Query('articleId') articleId: swagger.articleId) {
    return this.articleService.recommend(articleId)
  }

  /**
   * 获取指定文章
   * @param req 
   * @param id 
   * @param status 
   */
  @Get(':id')
  async findById(@Request() req, @Param('id') id: swagger.articleId, @Query('status') status: swagger.status) {
    let token = req.headers.authorization

    if (/Bearer/.test(token)) {
      // 不需要 Bearer， 否则验证失败
      token = token.split(' ').pop()
    }

    try {
      const tokenUser = this.jwtService.decode(token) as any
      const userId = tokenUser.id
      const exist = await this.userService.findById(userId)
      return this.articleService.findById(id, status)
    } catch (e) {
      return this.articleService.findById(id, status)
    }
  }

  /**
   * 文章访问量
   * @param id 
   */
  @Post(':id/view')
  @HttpCode(HttpStatus.OK)
  checkPassword(@Param('id') id: swagger.articleId) {
    return this.articleService.updateViewsById(id)
  }

  /**
   * 更新文章
   * @param id 
   * @param article 
   */
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateById(@Param('id') id: swagger.articleId, @Body() article: swagger.articleAdd) {
    return this.articleService.updateById(id, article)
  }

  /**
   * 删除指定文章
   * @param id 
   */
  @Delete(':id')
  deleteById(@Param('id') id: swagger.articleId) {
    return this.articleService.deleteById(id)
  }
}
