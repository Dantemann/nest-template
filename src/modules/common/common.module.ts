import { Module } from '@nestjs/common';
import { ApiService } from './api.service';

@Module({
  controllers: [],
  providers: [ApiService],
  exports: [ApiService]
})
export class CommonModule {}
