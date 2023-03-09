import { Type } from "class-transformer";
import { IsArray, IsDate, IsIn, IsInt, IsOptional, IsString, IsUUID, MinDate, MinLength } from "class-validator";


export class AnimalDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    color: string;

    @IsInt()
    age: number;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    born?: Date;

    @IsString()
    @IsIn(['dog', 'cat', 'bird', 'rabbit'])
    raza: string;

    @IsString()
    ownerId: string;

    @IsString()
    @IsOptional()
    bestFriend?: string;
}



// endpoint getAll, post, findOne
// todos los servicios se van a usar entre ellos
// cirular dependencies