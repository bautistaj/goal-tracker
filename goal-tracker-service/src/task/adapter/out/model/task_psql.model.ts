import { TaskDomain } from 'src/task/domain/task.domain';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity('tasks')
export class TaskPsqlModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({
    type: 'enum',
    enum: ['TO_DO', 'IN_PROGRESS', 'DONE'],
    default: 'TO_DO',
  })
  state: string;

  @Column({ name: 'goal_id' })
  goalId: number;

  @CreateDateColumn({
    name: 'creation_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  static toDomain(task: TaskPsqlModel): TaskDomain {
    return task as TaskDomain;
  }

  static toLstDomain(task: TaskPsqlModel[]): TaskDomain[] {
    return task.map((u) => TaskPsqlModel.toDomain(u));
  }

  static fromDomain(userDomain: TaskDomain): TaskPsqlModel {
    return userDomain as TaskPsqlModel;
  }
}
