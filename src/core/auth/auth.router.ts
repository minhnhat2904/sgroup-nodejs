import express, { Request, Response } from 'express';
const router = express.Router();
import SessionModel from '../../model/session';
import { AuthController } from './auth.controller';
import { validateLogin } from './validator/login.validator';
//authen
router.get('/login',(req: Request, res: Response) =>{
    return res.render('pages/login.pug');
})

/**
 *  Check if user exist and password matched
 *  Fetch it out
 *  Check the session with userId -> if not createOne
 *  If have -> check lock -> not login
 *  If not lock -> expired -> delete the old and create new
 */

router.post('/login',validateLogin,AuthController.login);

router.get('/logout',async(req, res) => {
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
