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
import { SelectFilter } from './repository';
import { APIService } from './service';

export class RestController<
  T,
  Select extends SelectFilter,
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
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<Result<T>> {
    return this.apiService.findAll(filter, page, size);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<T | null> {
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
