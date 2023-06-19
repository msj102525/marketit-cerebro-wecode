import { PartialType } from '@nestjs/mapped-types';
import { CreateTagTypeDto } from './create-tag_type.dto';

export class UpdateTagTypeDto extends PartialType(CreateTagTypeDto) {}
