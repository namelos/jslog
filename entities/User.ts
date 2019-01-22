import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Session } from './Session'
import { Todo } from './Todo'

@Entity()
export class User  {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @OneToMany(type => Session, s => s.user)
  sessions: Array<Session>

  @OneToMany(type => Todo, t => t.user, { eager: true })
  todos: Array<Todo>
}
