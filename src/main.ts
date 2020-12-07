import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as rateLimit from 'express-rate-limit'
import * as compression from 'compression'
import * as helmet from 'helmet'
import { TransformInterceptor } from './interceptors/transform.interceptor'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix('api')
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minutes
      max: 1000, // limit each IP to 1000 request per windowMs
    })
  )

  app.use(compression())  // 启用 gzip 压缩
  app.use(helmet())
  app.useGlobalInterceptors(new TransformInterceptor())  // 正常情况下，响应值统一
  app.useGlobalFilters(new HttpExceptionFilter()) // 异常情况下，响应值统一

  const options = new DocumentBuilder()
    .setTitle('Blog Api')
    .setDescription('博客API 文档')
    .setVersion('1.0.0')
    .build()
  
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)
  
  await app.listen(4000);
}
bootstrap();
