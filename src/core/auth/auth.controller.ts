import { Request, Response } from "express";
import { AuthServiceImpl } from "./auth.service";
import { AuthService } from "./api/authService";
import { LoginDto } from "./dto/login.dto";

/**
 *  Lam nhiem vu phan tich data tu request
 *  Dieu huong traffic
 */

class Controller {
    private authService: AuthService;
    constructor(authService: AuthService) {
        this.authService = authService;
    }

    login = async (req: Request, res: Response) => {
        const loginCase = Number.parseInt(req.query.case as string);

        try {
            const sessionId = await this.authService.loginUserCase(LoginDto(req.body), loginCase);

            // Phien dang nhap cua nguoi khac dang hop le
            if (!sessionId) {
                // return res.redirect('/auth/login');
                return res.send('Dang co nguoi khac dang nhap roi')
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
}

export const AuthController = new Controller(AuthServiceImpl);
