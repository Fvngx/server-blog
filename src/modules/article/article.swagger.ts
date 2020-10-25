import { APP_FILTER } from '@nestjs/core'
import { ApiProperty } from '@nestjs/swagger'

export class articleAdd {
  @ApiProperty({description: '文章标题'})
  title: string
  @ApiProperty({description: '文章封面', required: false})
  cover?: string
  @ApiProperty({description: '文章简介', required: false})
  summary?: string
  @ApiProperty({description: '文章详情', required: false})
  content?: string
  @ApiProperty({description: '文章html详情', required: false})
  html?: string
  @ApiProperty({description: '文章分类', required: false})
  category?: any
  @ApiProperty({description: '文章标签', required: false})
  tags?: any[]
  @ApiProperty({description: '文章状态'})
  status: string
  @ApiProperty({description: '文章访问数量'})
  views: number
}

export class findArticles {
  @ApiProperty({description: '获取第几页'})
  page: number
  @ApiProperty({description: '每页的数量'})
  pageSize: number
  @ApiProperty({description: '文章标题', required: false})
  title?: string
  @ApiProperty({description: '文章状态'})
  status?: string
}

export class articleId {
  @ApiProperty({description: '文章ID'})
  id: number
}

export class categoryId {
  @ApiProperty({description: '分类ID'})
  id: string
}

export class tagId {
  @ApiProperty({description: '标签ID'})
  id: string
}

export class status {
  @ApiProperty({description: '文章状态'})
  status: string
}

