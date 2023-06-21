import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InflcaUserService } from '../services/inflca-user.service';
import { CreateInflcaUserDto } from '../dto/create-inflca-user.dto';
import { UpdateInflcaUserDto } from '../dto/update-inflca-user.dto';

@Controller('inflca-user')
export class InflcaUserController {
  constructor(private readonly inflcaUserService: InflcaUserService) {}

  @Post()
  create(@Body() createInflcaUserDto: CreateInflcaUserDto) {
    return this.inflcaUserService.create(createInflcaUserDto);
  }

  @Get()
  findAll() {
    return this.inflcaUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inflcaUserService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInflcaUserDto: UpdateInflcaUserDto,
  ) {
    return this.inflcaUserService.update(+id, updateInflcaUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inflcaUserService.remove(+id);
  }
}
