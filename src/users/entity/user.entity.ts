import { Cat } from "src/cats/entity/cat.entity";
import { Dog } from "src/dogs/entity/dog.entity";
import { Post } from "src/posts/entity/post.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Dog, dog => dog.id)
    doggy: Dog[];

    @OneToMany(() => Cat, cat => cat.id)
    kitty: Cat[];

}
