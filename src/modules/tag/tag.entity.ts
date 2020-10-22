import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm'
import { Article } from '../article/article.entity'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  label: string

  @Column()
  value: string

  @ManyToMany(
    () => Article,
    article => article.tags
  )
  articles: Array<Article>

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