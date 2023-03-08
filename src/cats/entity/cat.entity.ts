import { Dog } from "src/dogs/entity/dog.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Cat {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column()
    born: Date;

    @ManyToOne(() => User, user => user.id)
    owner: User;

    @OneToOne(() => Dog, dog => dog.id)
    bestFriend: Dog;
}