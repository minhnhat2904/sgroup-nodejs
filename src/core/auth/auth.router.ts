import express from 'express';
const router = express.Router();
import SessionModel from '../../model/session';
import { AuthController } from './auth.controller';
import { validateLogin } from './validator/login.validator';
//authen
router.get('/login', (req, res) =>{
    return res.render('pages/login.pug');
});

router.get('/register', (req, res) =>{
    return res.render('pages/register.pug');
});


/**
 *  Check if user exist and password matched
 *  Fetch it out
 *  Check the session with userId -> if not createOne
 *  If have -> check lock -> not login
 *  If not lock -> expired -> delete the old and create new
 */

router.post('/login',validateLogin, AuthController.loginWithoutSession);

router.post('/register', AuthController.register);

router.get('/logout', async(req, res) => {
    console.log("Im login out");
    
    const sessionId = req.signedCookies.sesionId;
    
    if(sessionId){
        await SessionModel.deleteOne({
            _id : sessionId,
        });        
        return res.status(203).json({
            message: 'Logout success'
        });
    }
    return res.status(404).json({
        message: 'Can not logout'
    });
})


export default router;
