import { ApiProperty } from '@nestjs/swagger'

export class tag {
  @ApiProperty({description: '标签名'})
  label: string
  @ApiProperty({description: '标签...', required: false})
  vaule?: string
  @ApiProperty({description: '包含的文章'})
  articles?: any[]
}

export class query {
  @ApiProperty({description: '文章状态', required: false})
  status?: string
}

export class tagId {
  @ApiProperty({description: '标签ID'})
  id: string
}