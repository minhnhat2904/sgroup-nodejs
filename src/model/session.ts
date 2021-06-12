import {model, Schema} from 'mongoose';

const SessionSchema = new Schema({
    user: {
        _id: String,
        username: String,
    },
    expired: Number, // Use logout when expired comes
    renewTime: Number, // Check if user is no longer working in that session
});

//một mô hình của user
//đối số đầu tiên là tên mô hình,
const SessionModel = model('session', SessionSchema);

export default SessionModel;