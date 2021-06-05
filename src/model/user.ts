import {model, Schema} from 'mongoose';

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
    if(!(this as any).createdAt){
        (this as any).createdAt = Date.now();
    }
    (this as any).updatedAt = Date.now();
});

//một mô hình của user
//đối số đầu tiên là tên mô hình,
const UserModel = model('users', UserSchema);

export default UserModel;