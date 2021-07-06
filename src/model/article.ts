import {model, Schema, Types} from 'mongoose';

export interface IArticle {
    title: string,
    content: string,
    category: string,
    slug: string,
    linkImg: string,
    user: Types.ObjectId,
    createdAt: Date,
    updatedAt:Date,
}

const ArticleSchema = new Schema<IArticle>({
    title: String,
    content: String,
    category: String,
    slug: String,
    linkImg: String,
    user: {
        ref: 'users',
        type: Types.ObjectId,
    },
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