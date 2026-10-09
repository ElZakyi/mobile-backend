import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnoncesModule } from './annonces/annonces.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host : 'localhost',
      port : 5433,
      username : 'souk_user',
      password : 'souk_password',
      database : 'souk_db',
      autoLoadEntities : true,
      synchronize: true

    }),
    AnnoncesModule,
    UsersModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath : join(__dirname,'..','/uploads'),
      serveRoot :'/uploads'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
