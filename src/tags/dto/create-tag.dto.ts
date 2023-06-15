import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  readonly tagName: string;

  @IsNotEmpty()
  @IsString()
  readonly tagType: string;
}
