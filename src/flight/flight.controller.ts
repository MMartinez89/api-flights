import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { PassengerService } from 'src/passenger/passenger.service';
import { flightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

//Decorador de Swagger
@ApiTags('flights')
@ApiBearerAuth() //Decprador para proteger rutas
@UseGuards(JwtAuthGuard) //Decprador para proteger rutas
@Controller('api/v1/flight')
export class FlightController {
    constructor(private readonly flightService: FlightService, private readonly passengerService: PassengerService){

    }

    @Post()
    create(@Body() flightDTO: flightDTO){
        return this.flightService.create(flightDTO)
    }
    @Get()
    findAll(){
        return this.flightService.findAll();
    }
    @Get(':id')
    finOne(@Param('id') id: string){
        return this.flightService.finOne(id);
    }
    @Put(':id')
    update(@Param('id') id:string, @Body() flightDTO: flightDTO){
        return this.flightService.update(id, flightDTO);
    }
    @Delete(':id')
    delete(@Param('id') id:string){
        return this.flightService.delete(id);
    }
    @Post(':flightId/passenger/:passengerId')
    async addPassenger(@Param('flightId') flightId:string, @Param('passengerId') passengerId:string){
        const passenger =  await this.passengerService.finOne(passengerId)
        if(!passenger){
            throw new HttpException('passenger not found', HttpStatus.NOT_FOUND);
        }

        return this.flightService.addPassenger(flightId,passengerId);
    }
}
