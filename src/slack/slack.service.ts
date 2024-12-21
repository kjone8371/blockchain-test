import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';

@Injectable()
export class SlackService {
  private client: WebClient;

  constructor() {
    this.client = new WebClient(process.env.SLACK_TOKEN);
  }

  async sendBlockCount(count: number) {
    await this.client.chat.postMessage({
      channel: 'your-channel-id',
      text: `현재 데이터베이스에 저장된 블록 수: ${count}`,
    });
  }

  async sendError(error: string) {
    await this.client.chat.postMessage({
      channel: 'your-channel-id',
      text: `에러 발생: ${error}`,
    });
  }
}
