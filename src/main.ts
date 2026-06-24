import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('Customer Service Management')
    .setDescription('This is a service provider application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // input validation pipline
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (error) => {
        const formatedErrors = {};

        error.map((err) => {
          formatedErrors[err.property] = Object.values(err.constraints || {});
        });
        return new BadRequestException({ message: formatedErrors });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
