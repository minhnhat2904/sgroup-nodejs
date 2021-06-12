import { Request, Response } from "express";
import UserModel from '../../model/user';
import bcrypt from 'bcrypt';
import SessionModel from '../../model/session';
import { SessionPayload } from '../../dto/SessionPayload';
import { envConfig } from '../../env';
import { ILoginDto, LoginDto } from "./dto/login.dto";
import { SocialCase } from "../../enum/SocialCase.enum";

class Controller {
    login = async (req: Request, res: Response) => {
       
        if(typeof req.query.case !== 'string') return res.send("Case is not string");

        const loginCase = Number.parseInt(req.query.case as string);
        switch (loginCase){
            case SocialCase.DEFAULT:
                {
                    const loginDto : ILoginDto = LoginDto(req);
        
                    let sessionId;
                    const user = await UserModel.findOne({
                        username : loginDto.email
                    });
                    if(!user || !bcrypt.compareSync(loginDto.password, user.password)){
                        return res.send("Khong thay username");
                    }
                    const currentUserSession = await SessionModel.findOne({
                        'user._id' : user._id,
                    });
                    
                    const userInfomation : SessionPayload = {
                        _id: user._id,
                        username: user.username,
                    }
                    
                    // console.log("==========Current session==========");
                    // console.log(currentUserSession);
                    
                    if(!currentUserSession){
                        // console.log("New Session");
                        
                        const session = await SessionModel.create({
                            user: userInfomation,
                            expired: Date.now() + envConfig.get('SESSION_EXPIRED'),
                            renewTime: Date.now() + envConfig.get('SESSION_RENEW'),
                        });
                        sessionId = session._id;
                    }else{
                        if(Date.now() - currentUserSession.expired > 0 || Date.now() - currentUserSession.renewTime > 0){
                            await SessionModel.deleteOne({
                                'user._id': user._id
                            })
                            // console.log(`Deleting session with user id: ${user._id}`);
                            
                            const session = await SessionModel.create({
                                user: userInfomation,
                                expired: Date.now() + envConfig.get('SESSION_EXPIRED'),
                                renewTime: Date.now() + envConfig.get('SESSION_RENEW'),
                            });
                            sessionId = session._id;
                        } else{
                            return res.redirect('/auth/login');
                        }
                    }
                    
                    res.cookie('sesionId', sessionId,{
                        httpOnly: true,
                        signed: true,
                        maxAge: 30*1000,
                    });
                
                    return res.redirect('/');
                }
            break;
        case SocialCase.FACEBOOK:
            return res.redirect('/');
        break;
        case SocialCase.GOOGLE:
            return res.redirect('/');
        break;
        case SocialCase.TWITTER:
            return res.redirect('/');
        break;
        }
    }
}

export const AuthController = new Controller();
