import { ApiProperty } from '@nestjs/swagger'

export class findUsers {
  @ApiProperty({description: '查找页数'})
  page: number
  @ApiProperty({description: '每页数量'})
  pageSize: number
  @ApiProperty({description: '用户状态', required: false})
  status?: string
  @ApiProperty({description: '用户名', required: false})
  name?: string
}

export class registerUser {
  @ApiProperty({description: '用户名'})
  name: string
  @ApiProperty({description: '用户密码'})
  password: string
}

export class getUser {
  @ApiProperty({description: '用户ID'})
  id: string
}

export class updateUser {
  @ApiProperty({description: '用户ID'})
  id: string
  @ApiProperty({description: '用户名', required: false})
  name?: string
  @ApiProperty({description: '用户状态', required: false})
  status?: string
  @ApiProperty({description: '用户头像', required: false})
  avatar?: string
  @ApiProperty({description: '用户邮箱', required: false})
  email?: string
}

export class updatePass {
  @ApiProperty({description: '用户ID'})
  id: string
  @ApiProperty({description: '旧密码'})
  oldPassword: string
  @ApiProperty({description: '新密码'})
  newPassword: string
}

