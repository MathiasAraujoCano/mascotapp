import { Body, Controller, Get, Param, Post, ParseIntPipe, Patch } from '@nestjs/common';
import { AnimalDto } from 'src/common/dto/animal.dto';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {

    constructor(private readonly dogService: DogsService) {}

    @Get()
    findAll(){
        return this.dogService.findAll()
    }


    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.dogService.findOne( id )
    }


    @Post()
    create( @Body() animalDto: AnimalDto) {
        return this.dogService.create(animalDto)
    }


    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() animalDto: AnimalDto
    ) {
        return this.dogService.update(id, animalDto)
    }
}
