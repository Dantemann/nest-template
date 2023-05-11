import { Module } from '@nestjs/common';
import { ErrorCatch } from './interceptos/error-catch.interceptor';

@Module({
    providers: [ErrorCatch],
    exports: [ErrorCatch]
})
export class CommonModule {}
