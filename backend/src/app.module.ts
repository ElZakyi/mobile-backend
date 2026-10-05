import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnoncesModule } from './annonces/annonces.module';

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
    AnnoncesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
