import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const emailOptions = new DocumentBuilder()
    .setTitle('email-backend API')
    .setDescription('API for managing email services')
    .setVersion('1.0')
    .addTag('Email')
    .build();
  const emailDocument = SwaggerModule.createDocument(app, emailOptions);
  SwaggerModule.setup('api', app, emailDocument);
}
