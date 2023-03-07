import { IsEmail, IsInt, IsPositive, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class UserDto {

    @IsInt()
    id: number;

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    lastName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;
}