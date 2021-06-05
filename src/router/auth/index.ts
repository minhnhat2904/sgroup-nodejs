import express from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../../model/user';
const router = express.Router();
const {v4: uuidv4} = require('uuid');
import SessionModel from '../../model/session';
//authen
router.get('/login',(req:any, res:any) =>{
    return res.render('pages/login');
})

router.post('/login',async (req:any, res:any) => {
    const user = await UserModel.findOne({
        username : req.body.email
    });
    if(!user || !bcrypt.compareSync(req.body.password, user.password)){
        return res.send("Khong thay username");
    }
    const currentUserSession = await SessionModel.findOne({
        'user.username' : user.username,
    });
    
    if(currentUserSession != null){
        if(currentUserSession.lock){
            return res.send("Error: have some user using this account");
        }
    }

    const userInfomation = {
        _id: user._id,
        username: user.username,
    }
    
    
    let session = await SessionModel.findOne({'user._id': userInfomation._id});
    if(session == null){
        const createSession = await SessionModel.create({user: userInfomation, lock: true});
        res.cookie('user', createSession._id,{
            httpOnly: true,
            signed: true,
            maxAge: 30*1000,
        });
    
        return res.redirect('/');
    }
    session = await SessionModel.findOneAndUpdate({'user._id': userInfomation._id},{lock:true});
    res.cookie('user', session._id,{
        httpOnly: true,
        signed: true,
        maxAge: 30*1000,
    });

    return res.redirect('/');
} )

export = router;