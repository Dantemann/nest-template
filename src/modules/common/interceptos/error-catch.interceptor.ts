import { Injectable, NestInterceptor, ExecutionContext, CallHandler, InternalServerErrorException, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorCatch implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle()
            .pipe(catchError((err: any) => {
                if(!(err instanceof HttpException)) {
                    console.log(err);
                    throw new InternalServerErrorException("Internal server error - check logs");
                } else {
                    throw err;
                }
            }));
    };
};