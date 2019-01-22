import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => User, u => u.sessions, { eager: true })
  user: User
}
