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
import { Result } from '../models/result';
import { JsonPipe } from '../pipes/json/json.pipe';
import { APIService } from './service';

export class Controller<
  T,
  Select extends { where: any; select: any },
  CreateInput,
  UpdateInput,
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
  create(@Body() createUserDto: CreateInput) {
    return this.apiService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query('filter', JsonPipe) filter?: Select,
    @Query('page', ParseIntPipe) page?: number,
    @Query('size', ParseIntPipe) size?: number,
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
  ): Promise<T> {
    return this.apiService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<T> {
    return this.apiService.remove(+id);
  }
}
