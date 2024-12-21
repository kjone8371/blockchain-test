import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  private provider;

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {
    this.provider = new ethers.providers.InfuraProvider('mainnet', process.env.INFURA_API_KEY);
  }

  async fetchTransaction(transactionHash: string): Promise<Transaction> {
    const receipt = await this.provider.getTransactionReceipt(transactionHash);
    const transactionEntity = this.transactionRepository.create({
      hash: receipt.transactionHash,
      from: receipt.from,
      to: receipt.to,
    });
    await this.transactionRepository.save(transactionEntity);
    return transactionEntity;
  }
}
