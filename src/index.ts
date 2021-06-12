import express, { Request, Response } from 'express';
import {join}  from 'path';

import database from './config/database';
import methodOverride from './middleware/create_method_override';
import router from './core';
import cookieParser from 'cookie-parser';
import {envConfig} from './env';
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

app.use(methodOverride(function (req: Request, res: Response) {  
    if (req.body && typeof req.body === 'object' && '_method' in req.body || req.query._method == "DELETE") {
        var method = req.body._method;        
        if(method == null){
            method = req.query._method;
            delete req.query._method;            
            return method;
        }
        delete req.body._method;
        return method;
    }
}));
app.use(cookieParser(envConfig.get('COOKIE_SECRET')));

app.use('/',router);

app.listen(envConfig.get('PORT'),()=>{
    console.log(`Server is listening on ${envConfig.get('PORT')}`)
});