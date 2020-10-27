import { ApiProperty } from '@nestjs/swagger'

export class smtp {
  @ApiProperty({description: '邮件发送方'})
  from: string
  @ApiProperty({description: '邮件接收方'})
  to: string
  @ApiProperty({description: '邮件主题', required: false})
  subject?: string
  @ApiProperty({description: '邮件内容', required: false})
  text?: string
  @ApiProperty({description: '邮件内容', required: false})
  html?: string
}

export class query {
  @ApiProperty({description: '获取第 page 页邮件'})
  page: number
  @ApiProperty({description: '每页的数量'})
  pageSize: number
  @ApiProperty({description: '邮件发送方', required: false})
  from?: string
  @ApiProperty({description: '邮件接收方', required: false})
  to?: string
  @ApiProperty({description: '邮件主题', required: false})
  subject?: string
  @ApiProperty({description: '邮件内容', required: false})
  text?: string
}

export class smtpId {
  @ApiProperty({description: '邮件ID'})
  id: string
}