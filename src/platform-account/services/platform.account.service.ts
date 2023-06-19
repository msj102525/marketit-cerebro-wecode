import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlatformAccount } from '../entities/platform.account.entity';
import { Repository } from 'typeorm';
import { SerializedPlatformAccount } from '../serializers/platform.account.serializer';

@Injectable()
export class PlatformAccountService {
  constructor(
    @InjectRepository(PlatformAccount)
    private platformRepo: Repository<PlatformAccount>,
  ) {}

  async getPlatformAccounts() {
    const result = await this.platformRepo.find();

    const response = result.map((account) => {
      return new SerializedPlatformAccount(account);
    });

    return response;
  }
}
