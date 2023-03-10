import { IsString, IsUUID, Min, MinLength } from 'class-validator';


export class PostDto {
    
    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    description: string;

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    userId: string

}