import { UpdateResult } from 'typeorm';

export class DeleteResultModel {
  message: string;

  success: boolean;

  constructor(id: string, updateResult: UpdateResult) {
    this.message = `Entity with id ${id} was deleted`;
    this.success = updateResult.affected > 0;
  }
}
