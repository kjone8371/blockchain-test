import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':transactionHash')
  async getTransaction(@Param('transactionHash') transactionHash: string) {
    return this.transactionService.fetchTransaction(transactionHash);
  }
}
