import { IsString, IsUUID, Min, MinLength } from 'class-validator';


export class PostDto {

    @IsString()
    @IsUUID()
    id: string;
    
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