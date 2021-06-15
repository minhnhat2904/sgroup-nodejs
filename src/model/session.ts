import {Document, model, Schema} from 'mongoose';

export interface SessionPayload{
    _id: string;
    username: string;
}

export interface ISessionSchema extends Document {
    user : SessionPayload,
    expired: number,
    renewTime: number, 
}

const SessionSchema = new Schema<ISessionSchema>({
    user: {
        _id: String,
        username: String,
    },
    expired: Number, // Use logout when expired comes
    renewTime: Number, // Check if user is no longer working in that session
});

//một mô hình của user
//đối số đầu tiên là tên mô hình,
const SessionModel = model<ISessionSchema>('session', SessionSchema);


export default SessionModel;