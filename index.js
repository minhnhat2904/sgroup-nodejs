const express = require('express');
const {join} = require('path');

const database = require('./config/database');
const Article = require('./model/article');

const PORT = 3000;
const PUBLIC_PATH = join(__dirname, 'public');

const app = express();

database();
 /*Setup pug*/
app.set('view engine', 'pug');
app.set('views',join(__dirname, 'views'));
//có thể gọi file css, js đồ 
app.use(express.static(PUBLIC_PATH));

app.use(
    express.urlencoded({
      extended: true
    })
  )
//Pages
app.get('/',async (req, res)=>{
    const articles = await Article.find(); // lấy tất cả dữ liệu từ database
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

//REST APIs
//post them du lieu
app.post('/articles',(req, res, next) => {
    // return res.join({
    //     message: 'Hello world'
    // })
    var newArticle = {
        "title" : req.body.title,
        "content" : req.body.content,
        "category" : req.body.category
    }
    database(newArticle);
    res.redirect('/');
})
app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`)
})