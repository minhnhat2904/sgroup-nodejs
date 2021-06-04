const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Article = require('../../model/article');

//du lieu trang sport
router.get('/sport',async (req, res)=>{
    const articles = await Article.find({category: 'sport'}); // lấy tất cả dữ liệu từ database
    return res.render('pages/sport.pug',{
        articles
    });
})
//du lieu trang weathers
router.get('/weathers',async (req, res)=>{
    const articles = await Article.find({category : 'weathers'}); // lấy tất cả dữ liệu từ database
    return res.render('pages/weathers.pug',{
        articles
    });
})


router.get('/new', (req, res, next)=>{
    return res.render('pages/newArticle.pug');
})

router.post('/new',(req, res, next) => {
        
    var newArticle = {
        "title" : req.body.title,
        "content" : req.body.content,
        "category" : req.body.category,
        "slug" : slugify(req.body.title),
    }
    // database.dbNewArticle(newArticle);
    Article.create(newArticle);
    res.redirect('/');
})

router.get('/:_id/update', async (req, res, next)=>{
    const {_id} = req.params;

    const article = await Article.findOne({_id});
    if(!article){
        return res.render('pages/error.pug',{
            error: 'Fucking error'
        })
    }
    return res.render('./pages/updateArticle.pug',{article});
})

router.put('/:_id', async (req, res)=>{
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
        }
        return res.redirect('/');
    } catch (error) {
        console.log("Loi roi huhu " + error);
    }
})
router.get('/:slug',async (req, res)=>{
    const {slug} = req.params;
    const article = await Article.findOne({slug});
    if(!article){
        return res.render('pages/error.pug',{
            error: 'Not found article with title '+ slug
        });
    }
    return res.render('pages/detail.pug',{article});
})


module.exports = router;
