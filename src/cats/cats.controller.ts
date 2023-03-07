import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AnimalDto } from 'src/common/dto/animal.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {

    constructor(
        private readonly catsService: CatsService
    ){}

    @Get()
    findAll(animalDto: AnimalDto){
        return this.catsService.getAll();
    }

    @Get(':id')
    findOne( @Param('id', ParseIntPipe) id: number) {

        return this.catsService.findOne(id);
    }

    @Post()
    create( @Body() animalDto: AnimalDto) {
        return this.catsService.create(animalDto);
    }


    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() animalDto: AnimalDto) 
    {
        return this.catsService.update(id, animalDto)
    }
}
