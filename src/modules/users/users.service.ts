import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Status, User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, UpdateResult } from 'typeorm';
import { DeleteResultModel } from '../../models/delete-result.model';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async findAll(): Promise<User[]> {
    try {
      return await this.repository.find({
        withDeleted: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Unexpected error while fetching all users',
      );
    }
  }

  async findOneOrFail(id: string): Promise<User> {
    try {
      return await this.repository.findOneByOrFail({
        id,
      });
    } catch (error) {
      this.logger.error('User not found', error.stack);

      throw new NotFoundException('User not found');
    }
  }

  async create(payload: Partial<User>): Promise<User> {
    try {
      return await this.repository.save(payload);
    } catch (error) {
      this.logger.error('Error while creating user', error.stack);

      throw new BadRequestException('Error while creating user');
    }
  }

  async update(id: string, payload: Partial<User>): Promise<User> {
    const user = await this.findOneOrFail(id);

    return this.repository.save({
      ...user,
      ...payload,
    });
  }

  async delete(id: string): Promise<DeleteResultModel> {
    const user = await this.findOneOrFail(id);

    const deleteResult = await this.repository.softRemove(user.id);

    return new DeleteResultModel(id, deleteResult);
  }
}
