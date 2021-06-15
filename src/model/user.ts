import {Document, model, Schema} from 'mongoose';
import { updateHook } from './hooks/updateHook';

export interface IUserSchema extends Document{
    username: string,
    password: string,
    createdAt:Date,
    updatedAt:Date,
}

const UserSchema = new Schema<IUserSchema, any>({
    username: String,
    password: String,
    createdAt:{
        type: Date,
    },
    updatedAt:{
        type: Date,
    },
});
UserSchema.pre('save',updateHook);

//một mô hình của user
//đối số đầu tiên là tên mô hình,
const UserModel = model<IUserSchema>('users', UserSchema);

export default UserModel;