import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindByIdDto } from './dtos/find-by-id.dto';

@Controller({
  path: 'users',
})
export class UsersController {
  @Inject()
  private readonly service: UsersService;

  @Get()
  findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.service.create(user);
  }

  @Get(':id')
  findOneOrFail(@Param() { id }: FindByIdDto): Promise<User> {
    const user = this.service.findOneOrFail(id);

    console.log(user);

    return user;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: Partial<User>): Promise<User> {
    return this.service.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
