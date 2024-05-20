import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
interface ErrorResponse {
  statusCode: number;
  message: string;
}

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        console.error('An error occurred:');
        const response: ErrorResponse = {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: error.message || 'Internal server error',
        };
        return throwError(response);
      }),
    );
  }
}
