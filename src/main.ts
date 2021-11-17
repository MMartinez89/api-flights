import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filter/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter);
  app.useGlobalInterceptors(new TimeOutInterceptor);
  app.useGlobalPipes(new ValidationPipe());

  //Implementacion del Swagger
  const options = new DocumentBuilder().setTitle('SuperFlight-API').setDescription('Schedule Flights App').setVersion('1.0.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);
  //Configuracion de Swagger
  SwaggerModule.setup('/api/docs/', app, document,{
    swaggerOptions:{
      filter:true
    }
  })

  await app.listen(process.env.PORT || 3000);
  console.log(process.env.PORT)
}
bootstrap(); 