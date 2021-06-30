import { SessionService } from "../session/api/sessionService";
import { SessionServiceImpl } from "../session/session.service";
import { ArticleService } from "./api/articleService";

class Service implements ArticleService{
    private sessionService : SessionService;

    constructor(sessionService : SessionService ) {
        this.sessionService = sessionService;
    }
}

export const ArticleServiceImpl = new Service(SessionServiceImpl);
