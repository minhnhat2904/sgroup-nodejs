import { Request, Response } from "express";
import slugify from 'slugify';
import Article from '../../model/article';

class Controller {
    create = async (req : Request, res: Response) => {
        var newArticle = {
            "title" : req.body.title,
            "content" : req.body.content,
            "category" : req.body.category,
            "slug" : slugify(req.body.title),
        }
        // database.dbNewArticle(newArticle);
        Article.create(newArticle);
        res.redirect('/');
    }

    updateById = async (req: Request, res: Response) => {
        try {            
            const id = req.params._id;
            let updateArticle = {
                title: req.body.title,
                content: req.body.content,
            };
            const success = await Article.findByIdAndUpdate(id,{
                $set: updateArticle
            });
            if(!success){
                return res.render('pages/error.pug',{
                    error: 'Not found article with id '+ id
                });
            };
            return res.redirect('/');
        } catch (error) {
            console.log("Loi roi huhu " + error);
        }
    }

    deleteBySlug = async (req: Request, res: Response) => {
        const {slug} = req.params;

        const article = await Article.findOne({ slug });

        if (!article) {
            return res.render('pages/error.pug', {
                error: `This article with title ${slug} is not exist`
            });
        }
        
        try {
            await Article.deleteOne({slug });
        } catch (error) {
            console.log(error);
            return res.send("Error");
        }

        return res.redirect('/');
    }

    showSport = async (req: Request, res: Response) => {
        const articles = await Article.find({category: 'sport'}); // lấy tất cả dữ liệu từ database
        return res.render('pages/sport.pug',{
            articles
        });
    }

    showWeather = async (req: Request, res: Response) => {
        const articles = await Article.find({category : 'weathers'}); // lấy tất cả dữ liệu từ database
        return res.render('pages/weathers.pug',{
            articles
        });
    }

    showArticleBySlug = async (req: Request, res: Response) => {
        const {slug} = req.params;
        const article = await Article.findOne({slug});
        if(!article){
            return res.render('pages/error.pug',{
                error: 'Not found article with title '+ slug
            });
        }
        return res.render('pages/detail.pug',{article});
    }
}

export const ArticleController = new Controller();
