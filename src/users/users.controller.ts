import { Body, Controller, Get, Param, Post, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get()
    getUser(){
        return this.userService.findAll()
    }

    @Get(':id')
    findOneUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOneUser(id)
    }

    @Post()
    craete(@Body() userDto: UserDto){
        return this.userService.create(userDto)
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() userDto: UserDto
    ) {
        return this.userService.update(id, userDto)
    }


    @Delete(':id')
    deleteOne( @Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteOne(id)
    }
}
