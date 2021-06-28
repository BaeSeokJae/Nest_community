import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino/dist';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: {
          colorize: true,
          levelFirst: true,
          translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z',
        },
      },
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
