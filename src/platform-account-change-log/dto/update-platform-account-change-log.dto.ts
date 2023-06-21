import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatformAccountChangeLogDto } from './create-platform-account-change-log.dto';

export class UpdatePlatformAccountChangeLogDto extends PartialType(CreatePlatformAccountChangeLogDto) {}
