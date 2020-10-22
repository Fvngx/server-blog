import { 
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
// import {} from ''
import { TagService } from '../tag/tag.service'
import { CategoryService } from '../category/category.service'
import { Article } from './article.entity'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRespository: Repository<Article>,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService
  ) {}

  async create(article: Partial<Article>): Promise<Article> {
    const { title } = article
    const exist = await this.articleRespository.findOne({where: {title}})
    if (exist) {
      throw new HttpException('文章标题已存在', HttpStatus.BAD_REQUEST)
    }

    let { tags, category, status } = article
    if (status === 'publish') {
      Object.assign(article, {
        // publish_at: 
      })
    }

    // tags = await this.tagService.

    return
  }
}
