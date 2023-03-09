import { BadRequestException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalDto } from 'src/common/dto/animal.dto';
import { Repository } from 'typeorm';
import { v4 as uuid, validate as isUUID } from "uuid";
import { Cat } from './entity/cat.entity';

@Injectable()
export class CatsService {

   constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>
   ){} 

    async getAll() {
        const cat = await this.catRepository.find()

        return cat;
    }


    async findOne( id: string) {
        
        let cat: Cat;

        if (isUUID(id)) {
            cat = await this.catRepository.findOneBy({id})
        }  
        
        if ( !cat ) {
            throw new NotFoundException(`Cat with id "${id}" not found`)
        }

        return cat;
    }


    async create( animalDto: AnimalDto){

        const cat : Cat = {
            id: uuid(),
            ...animalDto
        }

        const catToCreate = this.catRepository.create(cat)

        await this.catRepository.save(catToCreate)

        return catToCreate;

    }


    async update( id: string, updateCat: AnimalDto) {

        const catToUpdate = await this.catRepository.preload({
            id,
            ...updateCat
        })

        if ( !catToUpdate ) {
            throw new NotFoundException(`Product with id: ${id} not found`)
        }

        const userUpdated = this.catRepository.save(catToUpdate)

        return userUpdated;
    }


    async delete( id: string) {

        const cat = await this.findOne(id)

        if (!cat) {
            throw new NotFoundException(`User with id "${id}" not found`)
        }

        await this.catRepository.remove(cat)

        return `Delete successful`
    }
}
