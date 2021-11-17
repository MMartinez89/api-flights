import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { MongooseConfigService } from './config/mongo.config.service';
import { UserModule } from './user/user.module';
import { RolesModule } from './modules/roles/roles.module';
import { PassengerModule } from './passenger/passenger.module';
import { FlightModule } from './flight/flight.module';
import { AuthModule } from './auth/auth.module';

@Module({
  //conectar la base de datos
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    UserModule,
    RolesModule,
    PassengerModule,
    FlightModule,
    AuthModule,
    //  MongooseModule.forRoot(process.env.MONGO_URI,{
    //    //useCreateIndex: true,
    //   //  useCreatendex: true,
    //    //useFindAndModify: false
    //  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
