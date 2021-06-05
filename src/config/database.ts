import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import ArticleModel from '../model/article';
import UserModel from '../model/user';
import SessionModel from '../model/session';
import CONFIG from '../env';

const database = async () => {
    try {
        const DEFAULT_FWD = bcrypt.hashSync('333333',10);
        await mongoose.connect("" + CONFIG.DB_CONNECTION, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify : false ,
        });
        console.log('Connected to mongodb')
        await SessionModel.deleteMany();
        //  await ArticleModel.deleteMany();
        await UserModel.deleteMany();
        await UserModel.insertMany([{
            username: 'phancaominhnhat10@gmail.com',
            password: DEFAULT_FWD,
        },
        {
            username: 'nhat@gmail.com',
            password: DEFAULT_FWD,
        }
    ]);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
const dbNewArticle = async (newArticle: any) => {
    try {
        await mongoose.connect('mongodb://localhost:27017/training', { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        });       
        await ArticleModel.insertMany(newArticle);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default {database, dbNewArticle}