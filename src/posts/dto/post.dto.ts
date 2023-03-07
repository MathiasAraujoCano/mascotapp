import { IsInt, IsString, Min, MinLength } from 'class-validator';


export class PostDto {

    @IsInt()
    id: number;
    
    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    description: string;

    @IsString()
    @MinLength(1)
    name: string;

}