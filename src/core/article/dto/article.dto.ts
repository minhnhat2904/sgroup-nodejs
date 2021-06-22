import { Request } from "express";

export interface IArticleDto {
    title : string,
    content : string,
    category : string,
    url: string,
}

export function ArticleDto(req: Request) : IArticleDto{
    return {
       title: req.body.title,
       content: req.body.content,
       category: req.body.category,
       url: req.body.url,
    }
}
