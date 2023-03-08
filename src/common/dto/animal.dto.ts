import { Type } from "class-transformer";
import { IsArray, IsDate, IsIn, IsInt, IsString, IsUUID, MinDate, MinLength } from "class-validator";


export class AnimalDto {

    @IsString()
    @IsUUID()
    id: string;

    @IsString()
    @MinLength(1)
    name: string;

    @IsString({ each: true })
    @IsArray()
    color: string[];

    @IsInt()
    age: number;

    @IsDate()
    @Type(() => Date)
    born: Date;

    @IsString()
    @IsIn(['dog', 'cat', 'bird', 'rabbit'])
    raza: string;
}



// endpoint getAll, post, findOne
// todos los servicios se van a usar entre ellos
// cirular dependencies