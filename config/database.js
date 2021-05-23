const mongoose = require('mongoose');

const ArticleModel = require('../model/article');

const database = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/training', { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify : false ,
        });
        console.log('Connected to mongodb')
       
        //  await ArticleModel.deleteMany();
        
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