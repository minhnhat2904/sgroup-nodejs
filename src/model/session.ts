import {model, Schema} from 'mongoose';
import UserModel from './user';

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
    if(!(this as any).createdAt){
        (this as any).createdAt = Date.now();
    }
    (this as any).updatedAt = Date.now();
});

//một mô hình của user
//đối số đầu tiên là tên mô hình,
const SessionModel = model('session', SessionSchema);

export default SessionModel;