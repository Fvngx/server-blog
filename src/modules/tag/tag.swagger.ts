import { APP_FILTER } from '@nestjs/core'
import { ApiProperty } from '@nestjs/swagger'

export class tag {
  @ApiProperty({description: '标签名'})
  label: string
  @ApiProperty({description: '标签的值', required: false})
  value?: string
}

export class findTags {
  @ApiProperty({description: '获取第几页标签'})
  page: number
  @ApiProperty({description: '每页数量'})
  pageSize: number
  @ApiProperty({description: '标签名称', required: false})
  label?: string
  @ApiProperty({description: '标签值', required: false})
  value?: string
}

export class findById {
  @ApiProperty({description: '标签ID'})
  id: string
}

export class articlesById {
  @ApiProperty({description: '文章状态'})
  status: string
}

export class updateTag {
  @ApiProperty({description: '标签名称', required:false})
  label?: string
  @ApiProperty({description: '标签值', required: false})
  value?: string

}