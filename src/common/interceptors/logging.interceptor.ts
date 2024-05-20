import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express'; // Import Response from 'express'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse(); // Correct Response typing
    const startTime = Date.now();
    Logger.debug(
      `${context.getClass().name}.${context.getHandler().name}() : ${req.method} ${req.url}`,
      'LoggingInterceptor',
    );

    return next.handle().pipe(
      tap(() => {
        const executionTime = Date.now() - startTime;
        Logger.debug(
          `${context.getClass().name}.${context.getHandler().name}() : ${req.method} ${req.url} - ${executionTime}ms`, // Logging request method and URL
          'LoggingInterceptor',
        );
      }),
    );
  }
}
