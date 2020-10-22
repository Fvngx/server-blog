import { 
  Injectable,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  /**
   * 添加分类
   * @param category 
   */
  async create(category: Partial<Category>): Promise<Category> {
    const { label } = category
    const exist = await this.categoryRepository.findOne({where: {label}})

    if (exist) {
      throw new HttpException('分类已存在', HttpStatus.BAD_REQUEST)
    }

    const newCategory = await this.categoryRepository.create(category)
    await this.categoryRepository.save(newCategory)
    return newCategory
  }

  /**
   * 获取所有分类
   * @param queryParams 
   */
  async findAll(queryParams): Promise<Category[]> {
    const { articleStatus } = queryParams
    const qb = this.categoryRepository
      .createQueryBuilder('category')
      .orderBy('category.create_at', 'ASC')
    
    if (articleStatus) {
      qb.leftJoinAndSelect(
        'category.articles',
        'articles',
        'articles.status=:status',
        {
          status: articleStatus
        }
      )
    } else {
      qb.leftJoinAndSelect('category.articles', 'articles')
    }

    const data = await qb.getMany()

    data.forEach(d => {
      Object.assign(d, {articleCount: d.articles.length})
      delete d.articles
    })
    return data
  }

  /**
   * 获取指定分类
   * @param id 
   */
  async findById(id): Promise<Category> {
    const data = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id=:id')
      .orWhere('category.label=:id')
      .orWhere('category.value=:id')
      .setParameter('id', id)
      .getOne()

    return data
  }

  async findByIds(ids): Promise<Array<Category>> {
    return this.categoryRepository.findByIds(ids)
  }

  /**
   * 更新分类
   * @param id 
   * @param category 
   */
  async updateById(id, category: Partial<Category>): Promise<Category> {
    const oldCategory = await this.categoryRepository.findOne(id)
    const updateCategory = await this.categoryRepository.merge(
      oldCategory,
      category
    )
    return this.categoryRepository.save(updateCategory)
  }

  async deleteById(id) {
    const category = await this.categoryRepository.findOne(id)
    return this.categoryRepository.remove(category)
  }
}
