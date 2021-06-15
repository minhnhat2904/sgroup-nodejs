import { Request } from "express";

export interface ILoginDto {
    email : string,
    password : string,
}

export function LoginDto(body: any) : ILoginDto{
    return {
        email : body.email,
        password : body.password,
    }
}

