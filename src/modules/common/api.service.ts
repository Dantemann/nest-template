import { Injectable, InternalServerErrorException, HttpException } from '@nestjs/common';

@Injectable()
export class ApiService {
    async dispatchApiRequest(callback: Function) {
        try {
            return await callback()
        } catch(error) {
            if(error instanceof HttpException) return error;

            console.log(error);
            throw new InternalServerErrorException("Internal server error - check logs");
        }
    }

}
