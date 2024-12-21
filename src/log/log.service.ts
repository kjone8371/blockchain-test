import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './log.entity';

@Injectable()
export class LogService {
  private provider;

  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {
    this.provider = new ethers.providers.InfuraProvider('mainnet', process.env.INFURA_API_KEY);
  }

  async fetchLog(transactionHash: string): Promise<Log[]> {
    const receipt = await this.provider.getTransactionReceipt(transactionHash);
    const logs = receipt.logs.map((log) => this.logRepository.create({
      address: log.address,
      data: log.data,
    }));
    await this.logRepository.save(logs);
    return logs;
  }
}
