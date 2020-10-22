import { 
  Injectable,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SMTP } from './smtp.entity'
import { sendEmail } from './mail.util'

@Injectable()
export class SmtpService {
  constructor(
    @InjectRepository(SMTP)
    private readonly smtpRepository: Repository<SMTP>
  ) {}

  async create(data: Partial<SMTP>): Promise<SMTP> {
    // const {} = await this.smtpRepository.
    return
  }
}
