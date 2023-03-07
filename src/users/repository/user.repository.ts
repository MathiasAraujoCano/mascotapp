import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from '../entity/user.entity';


@Injectable()
export class UserRepository {

    private usersArray : User[];

    constructor(){
        this.usersArray = [];
    }


    findAll(): User[] {
        return this.usersArray;
    }


    findOneUser(id: number) : User {

        const verifyUser = this.usersArray.find( u => u.id === id)

        if ( !verifyUser ) throw new NotFoundException(`Not found user with id "${id}"`)

        return verifyUser;
    }


    create(user: User) : User {

        const verifyUser = this.usersArray.find(person => person.id === user.id)

        if (!verifyUser) {

            this.usersArray.push(user)

            return user;
            
        } else {
            throw new BadRequestException(`Already exist a user with id "${user.id}"`)
        }

    }


    update(id: number, userUpdate: User) : User {
        let user = this.findOneUser(id)

        if (!user) throw new NotFoundException(`User with id "${id}" not found`)

        this.usersArray = this.usersArray.map(u => {
            if (u.id === id) {
                user = { ...user, ...userUpdate }
                return user;
            }
            return u;
        })
        this.usersArray.push(user);
        return user;
    }


    delete(id: number) : boolean {

        const verifyUser = this.usersArray.filter(u => u.id !== id)

        if ( this.usersArray.length === verifyUser.length ) {
            return false
        }

        return true;

    }
}