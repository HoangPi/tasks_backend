import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from './database/datasource';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(datasourceOptions)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
