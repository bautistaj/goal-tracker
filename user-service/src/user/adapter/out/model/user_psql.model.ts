import { UserDomain } from 'src/user/domain/user.domain';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity('users')
export class UserPsqlModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

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

  static toDomain(user: UserPsqlModel): UserDomain {
    return user as UserDomain;
  }

  static toLstDomain(user: UserPsqlModel[]): UserDomain[] {
    return user.map((u) => UserPsqlModel.toDomain(u));
  }

  static fromDomain(userDomain: UserDomain): UserPsqlModel {
    return userDomain as UserPsqlModel;
  }
}
