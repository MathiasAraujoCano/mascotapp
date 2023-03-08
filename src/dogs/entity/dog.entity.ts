import { User } from "src/users/entity/user.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Dog {

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
}