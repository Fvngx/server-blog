import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Search {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column() 
  type: string  // 搜索类型

  @Column()
  keyword: string // 关键词

  @Column({default: 1})
  count: 1  // 搜索关键词次数

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at',
  })
  create_at: Date

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at',
  })
  update_at: Date
}