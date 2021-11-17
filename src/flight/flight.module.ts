import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGHT } from 'src/common/models/models';
import { PassengerModule } from 'src/passenger/passenger.module';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { FlightSchema } from './schema/flight.schema';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
        //Este puglings se usa àra cuando se retorne el pasajero traiga tpda ña informacion del pasajero y no solo su ID 
        name: FLIGHT.name,
        useFactory:() => FlightSchema.plugin(require('mongoose-autopopulate')),
      }
    ]),PassengerModule
  ],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
