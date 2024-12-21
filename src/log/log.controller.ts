import { Controller, Get, Param } from '@nestjs/common';
import { LogService } from './log.service';

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get(':transactionHash')
  async getLog(@Param('transactionHash') transactionHash: string) {
    return this.logService.fetchLog(transactionHash);
  }
}
