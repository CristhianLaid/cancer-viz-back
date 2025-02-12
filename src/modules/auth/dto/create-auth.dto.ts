import { IsString, IsEmail, Length } from "class-validator";
import { IAuth } from "../interfaces";

export class CreateAuthDto implements IAuth {

    @IsString()
    @Length(1, 15)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(1, 15)
    password: string;
}
