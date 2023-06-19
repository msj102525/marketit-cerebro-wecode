import { IsInt } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateMemoDto {
  @IsNotEmpty()
  memoContent: string;

  @IsNotEmpty()
  @IsInt()
  influencerPlatformId: number;

  constructor(memoContent: string, influencerPlatformId: number) {
    this.memoContent = memoContent;
    this.influencerPlatformId = influencerPlatformId;
  }
}
