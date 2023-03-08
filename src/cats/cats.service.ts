import { BadRequestException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { AnimalDto } from 'src/common/dto/animal.dto';
import { v4 as uuid } from "uuid";

@Injectable()
export class CatsService {

    private Cats  : AnimalDto[] = [
        {
        id: uuid(),
        name : 'Roberto',
        color: ['negro', 'blanco'],
        age: 3,
        raza: 'cat',
        born: new Date('2020-02-02')
    },
    {
        id: uuid(),
        name : 'Adolf',
        color: ['amarillo'],
        age: 1,
        raza: 'cat',
        born: new Date('2020-02-02')
    },
]

    getAll() {
        return this.Cats;
    }


    findOne( id: string ) {

        const oneCat = this.Cats.find(cat => cat.id === id )

        if ( !oneCat ) throw new NotFoundException(`The cat with id "${id}" not found`)

        return oneCat;
    }


    create( animalDto: AnimalDto) {

        const cat : AnimalDto = {
            id: uuid(),
            name : animalDto.name,
            color: animalDto.color,
            age: animalDto.age,
            raza: animalDto.raza,
            born: animalDto.born
        }

        const verifyCat = this.Cats.find(kitty => kitty.id === cat.id)

        if (!verifyCat) {

            this.Cats.push(cat)

            return cat;
            
        } else {
            throw new BadRequestException(`Already exist a cat with id "${cat.id}"`)
        }

    }


    update( id: string, updateDto: AnimalDto) {

        let catToUpdate = this.findOne( id )

        if (!catToUpdate) throw new NotFoundException(`Cat with id "${id}" not found`)

        this.Cats = this.Cats.map( kitty => {
            if ( kitty.id === id ) {
                catToUpdate = { ...catToUpdate, ...updateDto }
                return catToUpdate; 
            }
            return kitty;
        })

        return catToUpdate;
    }


    delete( id: string) {
        return this.Cats.filter(cat => cat.id !== id)
    }
}
