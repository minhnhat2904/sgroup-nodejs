import express, { Request, Response } from 'express';
const router = express.Router();
import articleRouter from './article/article.router';
import authRouter from './auth/auth.router';
import Article from '../model/article';
import { authRequired, authNotRequired } from '../middleware/auth.middleware';
// DEFAULT PAGE
// router.get('/', authRequired, async (req : Request, res : Response)=>{    
//     const articles = await Article.find().sort('-createdAt'); // lấy tất cả dữ liệu từ database
//     return res.render('pages/home.pug',{
//         articles
//     });
// })
router.get('/', async (req : Request, res : Response)=>{    
    const articles = await Article.find().sort('-createdAt'); // lấy tất cả dữ liệu từ database
    return res.render('pages/home.pug',{
        articles
    });
})

router.use('/articles',articleRouter);
// router.use('/auth', authNotRequired, authRouter);

router.use('/auth', authRouter);

export = router;