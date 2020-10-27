import { ApiProperty } from '@nestjs/swagger'

export class search {
  @ApiProperty({description: '关键字'})
  keyword: string
}

export class query {
  @ApiProperty({description: '第 page 页搜索记录'})
  page: number
  @ApiProperty({description: '每页数量'})
  pageSize: number
  @ApiProperty({description: '搜索类型', required: false})
  type?: string
  @ApiProperty({description: '关键字', required: false})
  keyword?: string
}

export class serchId {
  @ApiProperty({description: '搜索记录ID'})
  id: string
}