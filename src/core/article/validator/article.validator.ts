import { NextFunction, Request, Response } from "express";
import { IArticleDto } from "../dto/article.dto";

export async function validateArticle(req: Request, res: Response, next: NextFunction){
    const body : IArticleDto = req.body;

    if(!body.title || body.title.match(/^[0-9]+$/)){
        return res.send('Title Invalid');
    }

    if(!body.content || body.content.match(/^[0-9]+$/)){
        return res.send("Content Invalid");
    }
    if(!body.category || body.category.match(/^[0-9]+$/)){
        return res.send("Category Invalid");
    }
    return next();
}