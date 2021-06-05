import express from 'express';
const router = express.Router();
import articleRouter from './article';
import authRouter from './auth';
import Article from '../model/article';
import auth from '../middleware/auth.middleware';

// DEFAULT PAGE
router.get('/', auth.auth('REQUIRE'), async (req : any, res : any)=>{
    const articles = await Article.find().sort('-createdAt'); // lấy tất cả dữ liệu từ database
    return res.render('pages/home.pug',{
        articles
    });
})

router.use('/articles',articleRouter);
router.use('/auth', auth.auth('NOT_REQUIRE'), authRouter);

export = router;