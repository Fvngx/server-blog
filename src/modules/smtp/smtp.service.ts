import { 
  Injectable,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SMTP } from './smtp.entity'
import { sendEmail } from './mail.util'
import { config } from '../../config'

@Injectable()
export class SmtpService {
  constructor(
    @InjectRepository(SMTP)
    private readonly smtpRepository: Repository<SMTP>
  ) {}

  /**
   * 添加邮件，发送邮件并保存
   * @param data 
   */
  async create(data: Partial<SMTP>): Promise<SMTP> {
    const {
      host,
      port,
      user,
      pass,
      from
    } = config.smtp
    Object.assign(data, {from})

    await sendEmail(data, {
      host,
      port,
      user,
      pass
    }).catch(() => {
      throw new HttpException('邮件发送失败', HttpStatus.BAD_REQUEST)
    })
    const newSMTP = this.smtpRepository.create(data)
    await this.smtpRepository.save(newSMTP)
    return newSMTP
  }

  /**
   * 获取所有邮件
   * @param queryParams 
   */
  async findAll(queryParams: any={}): Promise<[SMTP[], number]> {
    const query = this.smtpRepository
      .createQueryBuilder('smtp')
      .orderBy('smtp.create_at', 'DESC')

    const { page=1, pageSize=12, ...otherParams } = queryParams
    query.skip((+page - 1) * +pageSize)
    query.take(+pageSize)

    if (otherParams) {
      Object.keys(otherParams).forEach(key => {
        query.andWhere(`smtp.${key} LIKE :${key}`)
          .setParameter(`${key}`, `%${otherParams[key]}%`)
      })
    }
    return query.getManyAndCount()
  }

  /**
   * 删除邮件
   * @param id 
   */
  async deleteById(id) {
    const SMTP = await this.smtpRepository.findOne(id)
    return this.smtpRepository.remove(SMTP)
  }
}
