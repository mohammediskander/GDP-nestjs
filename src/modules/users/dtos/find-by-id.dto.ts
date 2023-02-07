import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindByIdDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
