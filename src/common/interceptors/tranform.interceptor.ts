import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessResponse } from './success-response.interface';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse<any>> {
    return next.handle().pipe(
      map((data: SuccessResponse<any>) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: data.message,
        data: data.data,
      })),
    );
  }
}
