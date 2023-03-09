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

    @Column({ default: '2020-02-02'})
    born?: Date;

    @ManyToOne(() => User, user => user.id)
    ownerId: string;

    @OneToOne(() => Dog, dog => dog.id)
    bestFriend?: string;
}