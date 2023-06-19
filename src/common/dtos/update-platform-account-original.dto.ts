import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatformAccountOriginalDto } from './create-platform-account-original.dto';

export class UpdatePlatformAccountOriginalDto extends PartialType(CreatePlatformAccountOriginalDto) {}
