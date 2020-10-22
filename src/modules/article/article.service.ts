import { 
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as dayjs from 'dayjs'
import { TagService } from '../tag/tag.service'
import { CategoryService } from '../category/category.service'
import { Article } from './article.entity'
import { stat } from 'fs';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRespository: Repository<Article>,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService
  ) {}

  /**
   * 创建文章
   * @param article 
   */
  async create(article: Partial<Article>): Promise<Article> {
    const { title } = article
    const exist = await this.articleRespository.findOne({where: {title}})
    if (exist) {
      throw new HttpException('文章标题已存在', HttpStatus.BAD_REQUEST)
    }

    let { tags, category, status } = article
    if (status === 'publish') {
      Object.assign(article, {
        publish_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }

    tags = await this.tagService.findByIds(('' + tags).split(','))
    let existCategory = await this.categoryService.findById(category)
    const newArticle = await this.articleRespository.create({
      ...article,
      category: existCategory,
      tags,
    })
    await this.articleRespository.save(newArticle)
    return newArticle
  }

  /**
   * 获取所有的文章（按页）
   * @param queryParams 
   */
  async findAll(queryParams: any= {}): Promise<[Article[], number]> {
    const query = this.articleRespository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.tags', 'tag')
      .leftJoinAndSelect('article.category', 'category')
      .orderBy('article.publicshat', 'DESC')

    const { page=1, pageSize=12, status, ...otherParams } = queryParams
    query.skip((+page - 1) * +pageSize)
    query.take(+pageSize)

    if (status) {
      query.andWhere('article.status=:status').setParameter('status', status)
    }

    if (otherParams) {
      Object.keys(otherParams).forEach(key => {
        query.andWhere(`article.${key} LIKE :${key}`)
          .setParameter(`${key}`, `%${otherParams[key]}%`)
      })
    }

    const [data, total] = await query.getManyAndCount()
    
    return [data, total]
  }

  /**
   * 根据 category 查找文章
   * @param category 
   * @param queryParams 
   */
  async findArticlesByCategory(category, queryParams) {
    const query = this.articleRespository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .where('category.value=:value', {value: category})
      .orderBy('article.publish_at', 'DESC')

    const { page=1, pageSize=12, status } = queryParams
    query.skip((+page - 1) * +pageSize)
    query.take(+pageSize)

    if (status) {
      query.andWhere('article.status=:status').setParameter('status', status)
    }

    const [data, total]  = await query.getManyAndCount()

    return [data, total]
  }

  /**
   * 根据 tag 查找文章
   * @param tag 
   * @param queryParams 
   */
  async findArticlesByTag(tag, queryParams) {
    const query = this.articleRespository
      .createQueryBuilder('article')
      .innerJoinAndSelect('article.tags', 'tag', 'tag.value=:value', {
        value: tag
      })
      .orderBy('article.publish_at', 'DESC')

    const { page=1, pageSize=12, status } = queryParams
    query.skip((+page - 1) * pageSize)
    query.take(+pageSize)

    if (status) {
      query.andWhere('article.status=:status').setParameter('status', status)
    }

    const [data, total] = await query.getManyAndCount()

    return [data, total]
  }

  /**
   * 获取归档文章
   */
  async getArchives(): Promise<{[key: string]: Article[]}> {
    const data = await this.articleRespository.find({
      where: {status: 'publish'},
      order: {publish_at: 'DESC'}
    } as any)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June', 
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    let ret = {}
    data.forEach(d => {
      const year = new Date(d.publish_at).getFullYear()
      const month = new Date(d.publish_at).getMonth()

      if (!ret[year]) {
        ret[year] = {}
      }

      if (!ret[year][months[month]]) {
        ret[year][months[month]] = []
      }
      ret[year][months[month]].push(d)
    })

    return ret
  }

  /**
   * 获取指定文章
   * @param id 
   * @param status 
   */
  async findById(id, status=null): Promise<Article> {
    const query = this.articleRespository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tags', 'tags')
      .where('article.id=:id')
      .orWhere('article.title=:title')
      .setParameter('id', id)
      .setParameter('title', id)
    
    if (status) {
      query.andWhere('article.status=:status').setParameter('status', status)
    }
    const data = await query.getOne()

    return data
  }

  /**
   * 更新指定文章
   * @param id 
   * @param article 
   */
  async updateById(id, article: Partial<Article>): Promise<Article> {
    const oldArticle = await this.articleRespository.findOne(id)
    let { tags, category, status } = article
    if (tags) {
      tags = await this.tagService.findByIds(('' + tags).split(','))
    }

    let existCategory = await this.categoryService.findById(category)
    const newArticle = {
      ...article,
      views: oldArticle.views,
      category: existCategory,
      publish_at:
        oldArticle.status === 'draft' && status === 'publish'
        ? dayjs().format('YYYY-MM-DD HH:mm:ss')
        : oldArticle.publish_at
    }

    if (tags) {
      Object.assign(newArticle, {tags})
    }

    const updateArticle = await this.articleRespository.merge(oldArticle, newArticle)

    return this.articleRespository.save(updateArticle)
  }

  /**
   * 更新指定文章却度量 +1
   * @param id 
   */
  async updateViewsById(id): Promise<Article> {
    const oldArticle = this.articleRespository.findOne(id) as any
    const updatedArticle = await this.articleRespository.merge(oldArticle, {
      views: oldArticle.views + 1,
    });
    return this.articleRespository.save(updatedArticle)
  }

  /**
   * 删除指定文章
   * @param id 
   */
  async deleteById(id) {
    const article = await this.articleRespository.findOne(id)
    return this.articleRespository.remove(article)
  }

  /**
   * 关键词搜搜文章
   * @param keyword 
   */
  async search(keyword) {
    const res = await this.articleRespository
      .createQueryBuilder('article')
      .where('article.title LIKE :keyword')
      .orWhere('article.summary LIKE :keyword')
      .orWhere('article.content LIKE :keyword')
      .setParameter('keyword', `%${keyword}%`)
      .getMany()
    return res
  }

  /**
   * 推荐文章
   * @param articleId 
   */
  async recommend(articleId = null) {
    const query = this.articleRespository
      .createQueryBuilder('article')
      .orderBy('article.publish_at', 'DESC')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tags', 'tags')

    if (!articleId) {
      query.where('article.status=:status').setParameter('status', 'publish')
      return query.take(6).getMany()
    } else {
      const sub = this.articleRespository
        .createQueryBuilder('article')
        .orderBy('article.publish_at', 'DESC')
        .leftJoinAndSelect('article.category', 'category')
        .leftJoinAndSelect('article.tags', 'tags')
        .where('article.id=:id')
        .setParameter('id', articleId)
      const exist = await sub.getOne()

      if (!exist) {
        return query.take(6).getMany()
      }

      const {title, summary} = exist
      try {
        const nodejieba = require('nodejieba')
        const topN = 4
        const kw1 = nodejieba.extract(title, topN)
        const kw2 = nodejieba.extract(summary, topN)

        kw1.forEach((kw, i) => {
          let paramKey = `title_` + i
          if (i === 0) {
            query.where(`article.title LIKE :${paramKey}`)
          } else {
            query.orWhere(`article.title LIKE :${paramKey}`)
          }
          query.setParameter(paramKey, `&${kw.word}&`)
        })

        kw2.forEach((kw, i) => {
          let paramKey = `summary_` + i
          if (i === 0) {
            query.where(`article.summary LIKE :${paramKey}`)
          } else {
            query.orWhere(`article.summary LIKE :${paramKey}`)
          }
          query.setParameter(paramKey, `&${kw.word}&`)
        })
      } catch(e) {
        1
      }

      const data = await query.getMany()
      return data.filter(d => d.id !== articleId && d.status === 'publish')
    }
  }
}
