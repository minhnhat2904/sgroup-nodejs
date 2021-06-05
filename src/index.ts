import express from 'express';
import {join}  from 'path';
import slugify from 'slugify';

import database from './config/database';
import Article  from './model/article';
import methodOverride from './middleware/create_method_override';
import UserModel from './model/user';
import router from './router';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import CONFIG from './env';
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

app.use(methodOverride(function (req: any, res: any) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
},'POST'));
app.use(cookieParser(CONFIG.COOKIE_SECRET));

app.use('/',router);

app.listen(CONFIG.PORT,()=>{
    console.log(`Server is listening on ${CONFIG.PORT}`)
})