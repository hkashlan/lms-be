import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Payload } from '../../auth/auth.service';
import { CurrentUser } from '../../auth/constants';
import { Result } from '../models/result';
import { JsonPipe } from '../pipes/json/json.pipe';
import { SelectFilter } from './repository';
import { APIService } from './service';

export type BasicRecrod = {
  name?: string | Prisma.StringFieldUpdateOperationsInput;
  createdDate?: string | Date | Prisma.DateTimeFieldUpdateOperationsInput;
  updatedDate?: string | Date | Prisma.DateTimeFieldUpdateOperationsInput;
  createdUserName?: string | Prisma.StringFieldUpdateOperationsInput;
  createdUserId?: number | Prisma.IntFieldUpdateOperationsInput;
  updatedUserName?: string | Prisma.StringFieldUpdateOperationsInput;
  updatedUserId?: number | Prisma.IntFieldUpdateOperationsInput;
};

export class ModelRestController<
  T,
  Select extends SelectFilter,
  CreateInput extends BasicRecrod,
  UpdateInput extends BasicRecrod,
> {
  constructor(
    private readonly apiService: APIService<
      T,
      Select,
      CreateInput,
      UpdateInput
    >,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateInput, @CurrentUser() user: Payload) {
    createUserDto.createdUserName = user.name;
    createUserDto.createdUserId = user.sub;
    createUserDto.createdDate = new Date();
    createUserDto.updatedUserName = user.name;
    createUserDto.updatedUserId = user.sub;
    createUserDto.updatedDate = new Date();
    return this.apiService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query('filter', JsonPipe) filter?: Select,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<Result<T>> {
    return this.apiService.findAll(filter, page, size);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<T> {
    return this.apiService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateInput,
    @CurrentUser() user: Payload,
  ): Promise<T> {
    updateUserDto.updatedUserName = user.name;
    updateUserDto.updatedUserId = user.sub;
    updateUserDto.updatedDate = new Date();
    return this.apiService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<T> {
    return this.apiService.remove(+id);
  }
}
