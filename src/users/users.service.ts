import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { validate as isUUID, v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}


    async findAll() {
        const users = await this.userRepository.find();

        return users;
    }

    async create( userDto: UserDto) {
        
        const user: User = {
            id: uuid(),
            name: userDto.name,
            lastName: userDto.lastName,
            email: userDto.email,
            password: userDto.password,
            doggy: [],
            kitty: []
        }

        const userToCreate = this.userRepository.create(user)

        await this.userRepository.save(userToCreate)

        return userToCreate;
    }


    async findOneUser( id: string) {
        
        let user: User;

        if (isUUID(id)) {
            user = await this.userRepository.findOneBy({id})
        }  
        
        if ( !user ) {
            throw new NotFoundException(`User with id "${id}" not found`)
        }

        return user;
    }


    async update(id: string, updateUser: UserDto) {
        

        const userToUpdate = await this.userRepository.preload({
            id,
            ...updateUser
        })

        if ( !userToUpdate ) {
            throw new NotFoundException(`Product with id: ${id} not found`)
        }

        const userUpdated = this.userRepository.save(userToUpdate)

        return userUpdated;
    }


    async deleteOne( id: string ) {

        const user = await this.findOneUser(id)

        if (!user) {
            throw new NotFoundException(`User with id "${id}" not found`)
        }

        await this.userRepository.remove(user)

        return `Delete successful`
       
    }

}
