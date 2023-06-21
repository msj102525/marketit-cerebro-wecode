import { PartialType } from '@nestjs/mapped-types';
import { CreateInflcaUserDto } from './create-inflca-user.dto';

export class UpdateInflcaUserDto extends PartialType(CreateInflcaUserDto) {}
