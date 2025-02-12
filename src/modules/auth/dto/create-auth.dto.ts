import { IsString, IsEmail, Length, IsOptional, IsIn } from "class-validator";
import { IAuth } from "../interfaces";
import { ROLESUSER } from "src/core/constants/ROLES/rolUser";

export class CreateAuthDto implements IAuth {

    @IsString()
    @Length(1, 15)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(1, 15)
    password: string;

    @IsOptional()
    @IsString({ each: true })
    @IsIn(ROLESUSER, { each: true })
    roles?: string[]; 
}
