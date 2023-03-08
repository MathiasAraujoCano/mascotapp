import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AnimalDto } from 'src/common/dto/animal.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DogsService {

    private Dogs  : AnimalDto[] = [
        {
        id: uuid(),
        name : 'Snoopy',
        color: ['marron'],
        age: 3,
        raza: 'dog',
        born: new Date('2020-02-02')
    },
    {
        id: uuid(),
        name : 'Scooby',
        color: ['negro'],
        age: 1,
        raza: 'dog',
        born: new Date('2020-02-02')
    },
]

    create( animalDto: AnimalDto) {
        
        const dog: AnimalDto = {
            id: uuid(),
            name: animalDto.name,
            color: animalDto.color,
            age: animalDto.age,
            raza: animalDto.raza,
            born: animalDto.born
        }
        const verifyDog = this.Dogs.find(doggy => doggy.id === dog.id)

        if (!verifyDog) {

            this.Dogs.push(dog)

            return dog;
            
        } else {
            throw new BadRequestException(`Already exist a dog with id "${dog.id}"`)
        }
    }

    findAll() {
        return this.Dogs;
    }


    findOne(id: string) {

        const oneDog = this.Dogs.find(dog => dog.id === id);

        if (!oneDog) throw new NotFoundException(`Dog with id "${id}" not found`)

        return oneDog;
    }


    update( id: string, updateDto: AnimalDto) {

        let dogToUpdate = this.findOne(id)

        if (!dogToUpdate) throw new NotFoundException(`Dog with id "${id}" not found`)

        this.Dogs = this.Dogs.map(doggy => {
            if (doggy.id === id) {
                dogToUpdate = { ...dogToUpdate, ...updateDto }
                return dogToUpdate;
            }
            return doggy;
        })
        return dogToUpdate;
    }


    delete( id: string ) {
        return this.Dogs.filter(dog => dog.id !== id)
    }
}
