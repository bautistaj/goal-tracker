import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITaskRepository } from 'src/task/application/port/out/itask.repository';
import { TaskDomain } from 'src/task/domain/task.domain';
import { Repository } from 'typeorm';
import { TaskPsqlModel } from './model/task_psql.model';

@Injectable()
export class TaskAdapter implements ITaskRepository {
  constructor(
    @InjectRepository(TaskPsqlModel)
    private taskPsqlRepository: Repository<TaskPsqlModel>,
  ) {}

  async findAll(goalId: number): Promise<TaskDomain[]> {
    const lstTask = await this.taskPsqlRepository.find({
      where: { goalId: goalId },
    });

    return TaskPsqlModel.toLstDomain(lstTask);
  }

  create(taskDomain: TaskDomain): Promise<TaskDomain> {
    return this.taskPsqlRepository.save(
      this.taskPsqlRepository.create(taskDomain),
    );
  }

  async update(id: number, taskDomain: TaskDomain): Promise<TaskDomain> {
    this.taskPsqlRepository.update(
      id,
      this.taskPsqlRepository.create(taskDomain),
    );

    return this.taskPsqlRepository.findOne({ where: { id } });
  }

  delete(id: number): Promise<any> {
    return this.taskPsqlRepository.delete(id);
  }

  async findOneById(id: number): Promise<TaskDomain> {
    const taskDomain = await this.taskPsqlRepository.findOne({ where: { id } });
    return TaskPsqlModel.toDomain(taskDomain);
  }
}
