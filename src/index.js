const express = require('express');
const {join} = require('path');
const { default: slugify } = require('slugify');

const database = require('./config/database');
const Article = require('./model/article');
// const methodOverride = require('method-override');
const methodOverride = require('./middleware/create_method_override')
const UserModel = require('./model/user');
const router = require('./router');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const {PORT, COOKIE_SECRET} = require('./env');
const ROOT_DIR = process.cwd();

const PUBLIC_PATH = join(ROOT_DIR, 'public');
const VIEW_PATH = join(ROOT_DIR,'views')
const app = express();

database.database();
 /*Setup pug*/
app.set('view engine', 'pug');
app.set('views',VIEW_PATH);
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
        delete req.body._method;
        return method;
    }
},'POST'));
app.use(cookieParser(COOKIE_SECRET));

app.use('/',router);

app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`)
})