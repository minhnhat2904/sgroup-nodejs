import { Request, Response } from "express";
import { AuthServiceImpl } from "./auth.service";
import { AuthService } from "./api/authService";
import { LoginDto } from "./dto/login.dto";
import { SocialCase } from "../../enum/SocialCase.enum";

/**
 *  Lam nhiem vu phan tich data tu request
 *  Dieu huong traffic
 */

class Controller {
    private authService: AuthService;
    
    constructor(authService: AuthService) {
        this.authService = authService;
    }
    
    /**
     * @deprecated This function is no longer using
     */
    login = async (req: Request, res: Response) => {        
        try {
            const sessionId = await this.authService.loginDefault(LoginDto(req.body));

            // Phien dang nhap cua nguoi khac dang hop le
            if (!sessionId) {
                // return res.redirect('/auth/login');
                return res.send('Dang co nguoi khac dang nhap roi');
            }
            // Minh da dang nhap
            res.cookie('sesionId', sessionId, {
                httpOnly: true,
                signed: true,
                maxAge: 30 * 1000,
            });

            return res.redirect('/');
        } catch (error) {
            return res.send(error.message);
        }
    }

    loginWithoutSession = async (req: Request, res: Response) => {
        const loginCase = Number.parseInt(req.query.case as string);
        const data = await this.authService.loginUserCase(LoginDto(req.body), loginCase);
        try {
            return res.status(200).json({
                data,
            });
        } catch (error) {
            return res.status(error.status).json({
                message: error.message,
                trace: error.stack,
            })
        }        
    }

    register = async (req: Request, res: Response) => {
        try {            
            await this.authService.register(LoginDto(req.body));
        } catch (error) {
            return res.status(409).json({
                message : error
            })
        }
        return res.status(200).json({
            message: "OK"
        });
    }
}

export const AuthController = new Controller(AuthServiceImpl);
