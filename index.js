const express = require('express');
const {join} = require('path');
const { default: slugify } = require('slugify');

const database = require('./config/database');
const Article = require('./model/article');
const methodOverride = require('method-override');

const PORT = 3000;
const PUBLIC_PATH = join(__dirname, 'public');

const app = express();

database.database();
 /*Setup pug*/
app.set('view engine', 'pug');
app.set('views',join(__dirname, 'views'));
//có thể gọi file css, js đồ 
app.use(express.static(PUBLIC_PATH));

app.use(
    express.urlencoded({
      extended: true
    })
);

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        console.log(method);
        delete req.body._method;
        return method;
    }
}));

//Pages
app.get('/',async (req, res)=>{
    const articles = await Article.find().sort('-createdAt'); // lấy tất cả dữ liệu từ database
    return res.render('pages/home.pug',{
        articles
    });
})
//du lieu trang sport
app.get('/articles/sport',async (req, res)=>{
    const articles = await Article.find({category: 'sport'}); // lấy tất cả dữ liệu từ database
    return res.render('pages/sport.pug',{
        articles
    });
})
//du lieu trang weathers
app.get('/articles/weathers',async (req, res)=>{
    const articles = await Article.find({category : 'weathers'}); // lấy tất cả dữ liệu từ database
    return res.render('pages/weathers.pug',{
        articles
    });
})
//Get them du lieu
app.get('/articles/new', (req, res, next)=>{
    return res.render('./pages/newArticle.pug');
})

app.get('/articles/:_id/update', async (req, res, next)=>{
    const {_id} = req.params;

    const article = await Article.findOne({_id});
    if(!article){
        return res.render('pages/error.pug',{
            error: 'Fucking error'
        })
    }
    return res.render('./pages/updateArticle.pug',{article});
})


app.get('/articles/:slug',async (req, res)=>{
    const {slug} = req.params;
    const article = await Article.findOne({slug});
    if(!article){
        return res.render('pages/error.pug',{
            error: 'Not found article with title '+ slug
        });
    }
    return res.render('pages/detail.pug',{article});
})

//REST APIs
//post them du lieu
app.post('/articles',(req, res, next) => {
        
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

app.put('/articles/:_id', async (req, res)=>{
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


app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`)
})