import { 
  Injectable,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tag } from './tag.entity'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagReposity: Repository<Tag>
  ) {}

  /**
   * 新增标签
   * @param tag 
   */
  async create(tag: Partial<Tag>): Promise<Tag> {
    const { label } = tag
    const exist = await this.tagReposity.findOne({where: {label}})
    if (exist) {
      throw new HttpException('标签已存在', HttpStatus.BAD_REQUEST)
    }

    const newTag = await this.tagReposity.create(tag)
    await this.tagReposity.save(newTag)
    return newTag
  }

  /**
   * 获取所有标签
   * @param queryParams 
   */
  async findAll(queryParams): Promise<Tag[]> {
    const { articleStatus } = queryParams
    const qb = this.tagReposity.createQueryBuilder('tag')
      .orderBy('tag.create_at', 'ASC')
    
    if (articleStatus) {
      qb.leftJoinAndSelect(
        'tag.articles',
        'articles',
        'articles.status=:status',
        {
          status: articleStatus,
        }
      )
    } else {
      qb.leftJoinAndSelect('tag.articles', 'articles')
    }

    const data = await qb.getMany()
    data.forEach(d => {
      Object.assign(d, {articleCount: d.articles.length})
      delete d.articles
    })
    return data
  }

  /**
   * 获取指定标签
   * @param id 
   */
  async findById(id): Promise<Tag> {
    const data = this.tagReposity
      .createQueryBuilder('tag')
      .where('tag.id=:id')
      .orWhere('tag.label=:id')
      .orWhere('tag.value=:id')
      .setParameter('id', id)
      .getOne()
    
    return data
  }

  /**
   * 获取指定标签信息，包含相关文章
   * @param id 
   * @param status 
   */
  async getArticleById(id, status=null): Promise<Tag> {
    const data = await this.tagReposity
      .createQueryBuilder('tag')
      .leftJoinAndSelect('tag.articles', 'articles')
      .orderBy('articles.update_at', 'DESC')
      .where('tag.id=:id')
      .orWhere('tag.label=:id')
      .orWhere('tag.value=:id')
      .setParameter('id', id)
      .getOne()

    if (status) {
      data.articles = data.articles.filter(a => a.status === status)
      return data
    } else {
      return data
    }
  }

  async findByIds(ids): Promise<Tag[]> {
    return this.tagReposity.findByIds(ids)
  }

  /**
   * 更新标签
   * @param id 
   * @param tag 
   */
  async updateById(id, tag: Partial<Tag>): Promise<Tag> {
    const oldTag = await this.tagReposity.findOne(id)
    const updateTag = await this.tagReposity.merge(oldTag, tag)
    return this.tagReposity.save(updateTag)
  }

  /**
   * 删除标签
   * @param id 
   */
  async deleteById(id) {
    const tag = await this.tagReposity.findOne(id)
    return this.tagReposity.remove(tag)
  }
}
