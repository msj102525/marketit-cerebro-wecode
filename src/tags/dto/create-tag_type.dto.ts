import { IsNotEmpty } from 'class-validator';

export class CreateTagTypeDto {
  @IsNotEmpty()
  tagType: string;

  @IsNotEmpty()
  tagState: number;

  constructor(tagType: string, tagState: number) {
    this.tagType = tagType;
    this.tagState = tagState;
  }
}
