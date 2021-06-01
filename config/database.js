const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ArticleModel = require('../model/article');
const UserModel = require('../model/user')
const database = async () => {
    try {
        const DEFAULT_FWD = bcrypt.hashSync('333333',10);
        await mongoose.connect('mongodb://localhost:27017/training', { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify : false ,
        });
        console.log('Connected to mongodb')
       
        //  await ArticleModel.deleteMany();
        await UserModel.deleteMany();
        await UserModel.insertMany([{
            username: 'phancaominhnhat10@gmail.com',
            password: DEFAULT_FWD,
        }]);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
const dbNewArticle = async (newArticle) => {
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
module.exports = {database, dbNewArticle}