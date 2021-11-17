import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import {UserDTO} from './dto/user.dto'
import { UserService } from './user.service';

//Decorador de Swagger
@ApiTags('users')
@ApiBearerAuth() //Decprador para proteger rutas
@UseGuards(JwtAuthGuard) //Decprador para proteger rutas
@Controller('api/v1/user')
export class UserController {
    constructor(private userService:UserService){

    }
    @Post()
    create(@Body() userDTO: UserDTO){
        return this.userService.create(userDTO)
    }
    @Get()
    findAll(){
        return this.userService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id:string ){
        return this.userService.findOne(id);
    }
    @Put(':id')
    update(@Param('id') id:string, @Body() userDTO: UserDTO ){
        return this.userService.update(id, userDTO)
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.userService.delete(id);
    }

}
