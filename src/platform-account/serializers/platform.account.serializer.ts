import { Exclude } from 'class-transformer';

export interface User {
  id: number;
  username: string;
  platform_type: string;
  follower: number;
  state: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: number;
  updatorId: number;
}

export class SerializedPlatformAccount {
  id: number;
  username: string;

  @Exclude()
  platform_type: string;
  @Exclude()
  follower: number;
  @Exclude()
  state: string;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  creatorId: number;
  @Exclude()
  updatorId: number;

  constructor(partial: Partial<SerializedPlatformAccount>) {
    Object.assign(this, partial);
  }
}
