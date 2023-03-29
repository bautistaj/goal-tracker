import { GoalDomain } from 'src/goal/domain/goal.domain';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity('goals')
export class GoalPsqlModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({
    type: 'enum',
    enum: ['PERSONAL', 'PROFESSIONAL'],
    default: 'PERSONAL',
  })
  category: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  progress: string;

  @Column({ name: 'user_id' })
  userId: number;

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

  static toDomain(user: GoalPsqlModel): GoalDomain {
    return user as GoalDomain;
  }

  static toLstDomain(user: GoalPsqlModel[]): GoalDomain[] {
    return user.map((u) => GoalPsqlModel.toDomain(u));
  }

  static fromDomain(userDomain: GoalDomain): GoalPsqlModel {
    return userDomain as GoalPsqlModel;
  }
}
