import { ApiProperty } from '@nestjs/swagger'

export class category {
  @ApiProperty({description: '分类名'})
  label: string
  @ApiProperty({description: '分类...', required: false})
  value?: string
  @ApiProperty({description: '分类包含的文章', required: false})
  articles?: any[]
}

export class queryParams {
  @ApiProperty({description: '文章状态：草稿，已发布', })
  articleStatus: string
  @ApiProperty({description: '分类名', required: false})
  label?: string
}

export class categoryId {
  @ApiProperty({description: '分类ID'})
  id: string
}

export class updateCategory {
  @ApiProperty({description: '分类名', required: false})
  label?: string
  @ApiProperty({description: '分类...', required: false})
  value?: string
  @ApiProperty({description: '分类包含的文章', required: false})
  articles?: any[]
}