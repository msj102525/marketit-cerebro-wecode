import { Exclude, Expose } from 'class-transformer';

export class SerializedTagType {
  id: number;
  userId: number;
  tagType: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: number;
  updatorId: number;
  tagState: object;
  tag: {
    tagId: number;
    tagName: string;
  }[];

  constructor(partial: Partial<SerializedTagType>) {
    Object.assign(this, partial);
  }
}
