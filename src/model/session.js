const {model, Schema} = require('mongoose');
const UserModel = require('./user');

const SessionSchema = new Schema({
    user: {
        _id: String,
        username: String,
    },
    lock:{
        type: Boolean
    }
});
SessionSchema.pre('save',function(){
    if(!this.createdAt){
        this.createdAt = Date.now();
    }
    this.updatedAt = Date.now();
});

//một mô hình của user
//đối số đầu tiên là tên mô hình,
const SessionModel = model('session', SessionSchema);

module.exports = SessionModel;