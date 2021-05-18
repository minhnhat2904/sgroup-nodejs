const {model} = require('mongoose');
//một mô hình của article
//đối số đầu tiên là tên mô hình,
const ArticleModel = model('articles', {
    title: String,
    content: String,
    category: String
});

module.exports = ArticleModel;