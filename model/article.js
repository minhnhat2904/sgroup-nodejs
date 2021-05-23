const {model, Schema} = require('mongoose');

const ArticleSchema = new Schema({
    title: String,
    content: String,
    category: String,
    slug: String,
    createdAt:{
        type: Date,
    },
    updatedAt:{
        type: Date,
    },
});
ArticleSchema.pre('save',function(){
    if(!this.createdAt){
        this.createdAt = Date.now();
    }
    this.updatedAt = Date.now();
});

//một mô hình của article
//đối số đầu tiên là tên mô hình,
const ArticleModel = model('articles', ArticleSchema);

module.exports = ArticleModel;