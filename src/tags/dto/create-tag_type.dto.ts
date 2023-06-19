import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTagTypeDto {
  @IsNotEmpty()
  tagType: string;

  @IsNotEmpty()
  tagState: number;

  userId: number;

  constructor(tagType: string, tagState: number, userId: number) {
    this.tagType = tagType;
    this.tagState = tagState;
    this.userId = userId;
  }
}
