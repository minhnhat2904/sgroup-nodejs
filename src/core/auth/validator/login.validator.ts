import { NextFunction, Request, Response } from "express";
import { ILoginDto } from "../dto/login.dto";

function validate(input: any, regex: RegExp, err: string){
    return new Promise<string>((resolve, reject) => {
        if(!input || !input.match(regex)){
            resolve(err);
        }
        reject("OK");
    })
}

export async function validateLogin(req: Request, res: Response, next: NextFunction) {
    const body : ILoginDto = req.body;
    
    if(typeof req.query.case !== 'string'){
        return res.send('Case is not formatted correctly')
    }

    if(!body.username || !body.username.match(/\S+@\S+\.\S+/)){
        return res.send('Email is not formatted correcttly');
    }

    if(!body.password || !body.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)){
        return res.send("Wrong password format");
    }
    return next();
}