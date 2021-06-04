const {model, Schema} = require('mongoose');

const UserSchema = new Schema({
    username: String,
    password: String,
    createdAt:{
        type: Date,
    },
    updatedAt:{
        type: Date,
    },
});
UserSchema.pre('save',function(){
    if(!this.createdAt){
        this.createdAt = Date.now();
    }
    this.updatedAt = Date.now();
});

//một mô hình của user
//đối số đầu tiên là tên mô hình,
const UserModel = model('users', UserSchema);

module.exports = UserModel;