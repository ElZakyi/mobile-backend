import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnoncesModule } from './annonces/annonces.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppGateway } from './app.gateway';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import {ConfigModule} from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      autoLoadEntities : true,
      synchronize: true

    }),
    AnnoncesModule,
    UsersModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath : join(__dirname,'..','/uploads'),
      serveRoot :'/uploads'
    }),
    ConversationsModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
