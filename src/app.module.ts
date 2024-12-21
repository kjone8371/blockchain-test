import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockModule } from './block/block.module';
import { TransactionModule } from './transaction/transaction.module';
import { LogModule } from './log/log.module';
import { SlackModule } from './slack/slack.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    BlockModule,
    TransactionModule,
    LogModule,
    SlackModule,
  ],
})
export class AppModule {}
