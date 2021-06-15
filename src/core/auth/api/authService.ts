import { SocialCase } from "../../../enum/SocialCase.enum";
import { ILoginDto } from "../dto/login.dto";

export interface AuthService {
    loginUserCase<T>(body : T, type: SocialCase): Promise<string | null>;
    loginDefault(loginDto: ILoginDto): Promise<string | null>;
}