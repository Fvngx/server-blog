import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string  // 联系人

  @Column()
  email: string // 联系方式

  @Column({type: 'mediumtext', default: null, charset: 'utf8mb4'})
  content: string // 评论内容

  @Column({type: 'boolean', default: false})
  pass: boolean   // 是否审核通过

  @Column({type: 'mediumtext', default: null, charset: 'utf8mb4'})
  userAgent: string

  @Column()
  hostId: string  // 关联文章 

  @Column({type: 'boolean', default: false})
  isHostInPage: boolean   // 是否评论动态页面

  @Column({default: null})
  parentCommentId: string // 父级评论 id

  @Column({default: null})
  replyUserName: string // 回复评论用户名

  @Column({default: null})
  replyUserEmail: string  // 回复评论邮箱

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at'
  })
  create_at: Date

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at'
  })
  update_at: Date
}