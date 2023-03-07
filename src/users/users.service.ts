import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {

    constructor(
        private userRepository: UserRepository
    ){}

    private Users  : UserDto[] = [
        {
            id: 1,
            name : 'Pablo',
            lastName: 'Lescano',
            email: 'plescano@damasgratis.com',
            password: 'Abc123',
        },
        {
            id: 2,
            name : 'Danilo',
            lastName: 'Alvarez',
            email: 'daniloa@simple.com',
            password: 'Abc123',
        },
    ]

    findAll(): User[] {
        return this.userRepository.findAll();
    }

    create( userDto: UserDto) : User {
        
        const user: User = {
            id: userDto.id,
            name: userDto.name,
            lastName: userDto.lastName,
            email: userDto.email,
            password: userDto.password
        }

        return this.userRepository.create(user)
    }

    findOneUser( id: number) : User {
        
        return this.userRepository.findOneUser(id)
    }


    update(id: number, updateUser: UserDto) : User {
        
        const user: User = {
            id,
            name: updateUser.name,
            lastName: updateUser.lastName,
            email: updateUser.email,
            password: updateUser.password
        }

        return this.userRepository.update(id, user)
    }


    deleteOne( id: number) : string {

        return this.userRepository.delete(id) ? `Delete success` : `User with id "${id}" not found`
    }
}
