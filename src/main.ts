import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cookie parser
  app.use(cookieParser());

  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('Customer Service Management')
    .setDescription('This is a service provider application')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // input validation pipline
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove those property those are not exist in DTO
      forbidNonWhitelisted: false, // if true then give me error for those property are not exist in DTO
      transform: true, // It's convert inpute as per DTO.

      // modifyed error messages
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
void bootstrap();
