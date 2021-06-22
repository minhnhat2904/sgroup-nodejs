import {model, Schema} from 'mongoose';

const ArticleSchema = new Schema({
    title: String,
    content: String,
    category: String,
    slug: String,
    url: String,
    createdAt:{
        type: Date,
    },
    updatedAt:{
        type: Date,
    },
});
ArticleSchema.pre('save',function(){
    if(!(this as any).createdAt){
        (this as any).createdAt = Date.now();
    }
    (this as any).updatedAt = Date.now();
});

//một mô hình của article
//đối số đầu tiên là tên mô hình,
const ArticleModel = model('articles', ArticleSchema);

export default ArticleModel;