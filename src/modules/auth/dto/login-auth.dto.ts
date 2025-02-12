import { IsEmail, IsString, Length } from "class-validator";


export class LoginAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(1, 15)
    password: string;
}