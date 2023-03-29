import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IGoalRepository } from 'src/goal/application/port/out/igoal.repository';
import { GoalDomain } from 'src/goal/domain/goal.domain';
import { Repository } from 'typeorm';
import { GoalPsqlModel } from './model/goal_psql.model';

@Injectable()
export class GoalAdapter implements IGoalRepository {
  constructor(
    @InjectRepository(GoalPsqlModel)
    private goalPsqlRepository: Repository<GoalPsqlModel>,
  ) {}
  async findAll(userId: number): Promise<GoalDomain[]> {
    const lstGoals = await this.goalPsqlRepository.find({
      where: { userId: userId },
    });

    return GoalPsqlModel.toLstDomain(lstGoals);
  }

  create(goalDomain: GoalDomain): Promise<GoalDomain> {
    return this.goalPsqlRepository.save(
      this.goalPsqlRepository.create(goalDomain),
    );
  }

  async update(id: number, goalDomain: GoalDomain): Promise<GoalDomain> {
    this.goalPsqlRepository.update(
      id,
      this.goalPsqlRepository.create(goalDomain),
    );

    return this.goalPsqlRepository.findOne({ where: { id } });
  }

  delete(id: number): any {
    return this.goalPsqlRepository.delete(id);
  }

  async findOneById(id: number): Promise<GoalDomain> {
    const goalDomain = await this.goalPsqlRepository.findOne({ where: { id } });
    return GoalPsqlModel.toDomain(goalDomain);
  }
}
