import { ApiProperty } from '@nestjs/swagger'

export class viewCreate {
  @ApiProperty({description: 'url 的访问'})
  url: string
}

export class viewsAll {
  @ApiProperty({description: '分页'})
  page: number
  @ApiProperty({description: '每页数量'})
  pageSize: number
  @ApiProperty({description: '路径', required: false})
  url?: string
}

export class viewsUrl {
  @ApiProperty({description: 'url路径'})
  url: string
}

export class viewsId {
  @ApiProperty({description: '访问ID'})
  id: string
}

export class updateAddress {
  @ApiProperty({description: '更新后的地址'})
  address: string
}
