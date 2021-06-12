import express, { Request, Response } from 'express';
const router = express.Router();
import Article from '../../model/article';
import { ArticleController } from './article.controller';
import { validateArticle } from './validator/article.validator';

//du lieu trang sport
router.get('/sport',ArticleController.showSport);
//du lieu trang weathers
router.get('/weathers',ArticleController.showWeather);


router.get('/new', (req, res, next)=>{
    return res.render('pages/newArticle.pug');
});

router.post('/new', validateArticle, ArticleController.create);

router.get('/:_id/update', async (req, res, next)=>{
    const {_id} = req.params;

    const article = await Article.findOne({_id});
    if(!article){
        return res.render('pages/error.pug',{
            error: 'Fucking error'
        })
    }
    return res.render('./pages/updateArticle.pug',{article});
});

router.put('/:_id', validateArticle, ArticleController.updateById);
router.get('/:slug',ArticleController.showArticleBySlug);

router.delete('/:slug', ArticleController.deleteBySlug);

export = router;
