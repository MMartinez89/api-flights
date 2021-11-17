import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

//Decorador de Swagger
@ApiTags('passengers')
@ApiBearerAuth() //Decprador para proteger rutas
@UseGuards(JwtAuthGuard) //Decprador para proteger rutas
@Controller('api/v1/passenger')
export class PassengerController {
    constructor( private passengerService: PassengerService){

    }
    @Post()
    create(@Body() passengerDTO: PassengerDTO){
        return this.passengerService.create(passengerDTO);
    }
    @Get()
    findAll(){
        return this.passengerService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.passengerService.finOne(id);
    }
    @Put(':id')
    update(@Param('id') id:string, @Body() passengerDTO:PassengerDTO){
        return this.passengerService.update(id, passengerDTO)
    }
    @Delete(':id')
    delete(@Param('id') id: string){
        return this.passengerService.delete(id);
    }

}
