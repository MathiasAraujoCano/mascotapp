import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalDto } from 'src/common/dto/animal.dto';
import { Repository } from 'typeorm';
import { v4 as uuid, validate as isUUID } from 'uuid';
import { Dog } from './entity/dog.entity';

@Injectable()
export class DogsService {

    constructor(

        @InjectRepository(Dog)
        private dogRepository: Repository<Dog>
    ){}

    
    async create( animalDto: AnimalDto) {
        
        const dog: Dog = {
            id: uuid(),
            ...animalDto

        }

        const dogToCreate = this.dogRepository.create(dog)

        await this.dogRepository.save(dogToCreate)

        return dogToCreate;
    }

    async findAll() {

        const dog = await this.dogRepository.find()

        return dog;
    }


    async findOne(id: string) {

        let dog: Dog;

        if (isUUID(id)) {
            dog = await this.dogRepository.findOneBy({id})
        }  
        
        if ( !dog ) {
            throw new NotFoundException(`Cat with id "${id}" not found`)
        }

        return dog;
    }


    async update( id: string, updateDog: AnimalDto) {

        const dogToUpdate = await this.dogRepository.preload({
            id,
            ...updateDog
        })

        if ( !dogToUpdate ) {
            throw new NotFoundException(`Product with id: ${id} not found`)
        }

        const userUpdated = this.dogRepository.save(dogToUpdate)

        return userUpdated;
    }


    async delete( id: string ) {
        const dog = await this.findOne(id)

        if (!dog) {
            throw new NotFoundException(`User with id "${id}" not found`)
        }

        await this.dogRepository.remove(dog)

        return `Delete successful`
    }
}
