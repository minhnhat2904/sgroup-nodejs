const express = require('express');
const router = express.Router();
const articleRouter = require('./article');
const authRouter = require('./auth')
const Article = require('../model/article');
const { auth } = require('../middleware/auth.middleware');

// DEFAULT PAGE
router.get('/', auth('REQUIRE'), async (req, res)=>{
    const articles = await Article.find().sort('-createdAt'); // lấy tất cả dữ liệu từ database
    return res.render('pages/home.pug',{
        articles
    });
})

router.use('/articles',articleRouter);
router.use('/auth', auth('NOT_REQUIRE'), authRouter);

module.exports = router;