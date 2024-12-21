import { Injectable } from '@nestjs/common';
import * as ethers from 'ethers';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Block } from './block.entity';

@Injectable()
export class BlockService {
  private provider;

  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
  ) {
    this.provider = new ethers.providers.InfuraProvider('mainnet', process.env.INFURA_API_KEY);
  }

  async fetchBlock(blockHash: string): Promise<Block> {
    const block = await this.provider.getBlock(blockHash);
    const blockEntity = this.blockRepository.create({
      blockNumber: block.number,
      hash: block.hash,
      timestamp: block.timestamp,
    });
    await this.blockRepository.save(blockEntity);
    return blockEntity;
  }
}
