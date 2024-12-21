import { Controller, Get, Param } from '@nestjs/common';
import { BlockService } from './block.service';

@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get(':blockHash')
  async getBlock(@Param('blockHash') blockHash: string) {
    return this.blockService.fetchBlock(blockHash);
  }
}
