import { SocialCase } from "../../enum/SocialCase.enum";
import { AuthService } from "./api/authService";
import { ILoginDto } from "./dto/login.dto";
import bcrypt from 'bcrypt';
import { SessionService } from "../session/api/sessionService";
import { SessionServiceImpl } from "../session/session.service";
import UserModel from "../../model/user";
import { SessionPayload } from "../../model/session";
import { IUserInfo, UserInfo } from "./dto/userInfo.dto";
import jwt from 'jsonwebtoken';
import { envConfig } from "../../env";

class Service implements AuthService {
    private sessionService : SessionService;

    constructor(sessionService : SessionService ) {
        this.sessionService = sessionService;
    }

    async loginWithoutSession(loginDto: ILoginDto): Promise<IUserInfo> {
        const user = await UserModel.findOne({
            username : loginDto.username
        });
        
        if(!user || !bcrypt.compareSync(loginDto.password, user.password)){
            throw new Error('Email or password is not correct')
        };

        return UserInfo(user);
    }

    async register(loginDto: ILoginDto): Promise<void> {
        const user = await UserModel.findOne({
            username : loginDto.username
        });
        
        if(user){
            throw new Error('This account was existed');
        };

        loginDto.password = bcrypt.hashSync(loginDto.password, 10);
        
        await UserModel.create(loginDto);
    }

    async loginUserCase(body : any, type: SocialCase): Promise<{info: IUserInfo, accessToken: string}> {
        let info: IUserInfo;
        switch (type) {
            case SocialCase.DEFAULT:
                info = await this.loginWithoutSession(body);
                break;
            case SocialCase.FACEBOOK:
            case SocialCase.GOOGLE:
            case SocialCase.TWITTER:
            default:
                throw new Error("Method not support.")
        }

        return {
            info,
            accessToken: jwt.sign({_id: info._id}, envConfig.get('JWT_SECRET')),
        }
    }
    async loginDefault(loginDto: ILoginDto): Promise<string | null> {
        
        const user = await UserModel.findOne({
            username : loginDto.username
        });
        
        if(!user || !bcrypt.compareSync(loginDto.password, user.password)){
            throw new Error('Email or password is not correct')
        }

        const userInfomation : SessionPayload = {
            _id: user._id,
            username: user.username,
        }
        
        const currentUserSession = await this.sessionService.findByUserId(user.id);
        
        // Tao moi 1 session cho minh
        if(!currentUserSession) {
            console.log("Creating new session");
            
            const session = await this.sessionService.create(userInfomation);
            return session._id;
        }

        // Session cua user khac da het han
        if(Date.now() - currentUserSession.expired > 0 || Date.now() - currentUserSession.renewTime > 0){
            // xoa phien dang nhap cua user do
            await this.sessionService.delete(user._id);
            console.log(`Deleting session with user id: ${user._id}`);
            // Tao moi phien dang nhap cho minh
            const session = await this.sessionService.create(userInfomation);
            return session._id;
        }

        return null;
    }
}

export const AuthServiceImpl = new Service(SessionServiceImpl);
