import { Injectable, NestInterceptor, ExecutionContext, CallHandler, InternalServerErrorException, HttpException, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorCatch implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle()
        .pipe(catchError((err: any) => {
            const { body: reqBody } = context.switchToHttp().getRequest();
            const {name: methodName} = context.getHandler()

            if(reqBody) {
                if(reqBody.password) delete reqBody.password;
            }

            Logger.error(`${err}\nReqBody: ${JSON.stringify(reqBody ?? {})}`, `METHOD: ${methodName}`);
                if(!(err instanceof HttpException)) {
                    console.log(err);
                    throw new InternalServerErrorException("Internal server error - check logs");
                } else {
                    throw err;
                }
            }));
    };
};