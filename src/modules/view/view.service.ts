import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { View } from './view.entity'

@Injectable()
export class ViewService {
  constructor(
    @InjectRepository(View)
    private readonly viewRepository: Repository<View>
  ) {}

  /**
   * 增加访问量
   * @param ip 
   * @param userAgent 
   * @param url 
   */
  async create(ip: string, userAgent: string, url: string): Promise<View> {
    const exist = await this.viewRepository.findOne({
      where: {ip, userAgent, url}
    })

    if (exist) {
      const count = exist.count
      const newData = await this.viewRepository.merge(exist, {
        count: count + 1
      })
      await this.viewRepository.save(newData)
      return newData
    }

    const newData = await this.viewRepository.create({ip, userAgent, url})
    await this.viewRepository.save(newData)
    return newData
  }

  /**
   * 获取所有访问
   * @param queryParams 
   */
  async findAll(queryParams: any = {}): Promise<[View[], number]> {
    const query = this.viewRepository
      .createQueryBuilder('view')
      .orderBy('view.create_at', 'DESC')
    const { page=1, pageSize=12, pass, ...otherParams } = queryParams

    query.skip((+page-1) * pageSize)
    query.take(+pageSize)

    if (otherParams) {
      Object.keys(otherParams).forEach(key => {
        query.andWhere(`view.${key} LIKE :${key}`)
        .setParameter(`${key}`, `%${otherParams[key]}%`)
      })
    }

    return query.getManyAndCount()
  }

  /**
   * 查找指定路径的访问统计
   * @param url 
   */
  async findByUrl(url): Promise<any> {
    return this.viewRepository.find({
      where: {url},
      order: {update_at: 'DESC'}
    })
  }

  /**
   * 获取指定访问
   * @param id 
   */
  async findById(id): Promise<View> {
    return this.viewRepository.findOne(id)
  }

  /**
   * 更新地址
   * @param id 
   * @param param1 
   */
  async updateIpAddress(id, {address}): Promise<View> {
    const old = await this.viewRepository.findOne(id)
    const updatePage = await this.viewRepository.merge(old, {
      address,
      update_at: old.update_at
    })

    return this.viewRepository.save(updatePage)
  }

  /**
   * 删除访问量
   * @param id 
   */
  async deleteById(id) {
    const data = await this.viewRepository.findOne(id)
    return this.viewRepository.remove(data)
  }
}
