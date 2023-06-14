import { IsNotEmpty } from 'class-validator';

export class CreatePlatformAccountOriginalDto {
  @IsNotEmpty()
  platformType: string;

  @IsNotEmpty()
  username: string;
}
