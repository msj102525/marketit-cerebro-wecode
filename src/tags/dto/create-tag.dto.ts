import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  readonly tagName: string;

  @IsNotEmpty()
  @IsNumber()
  readonly tagTypeId: number;
}
