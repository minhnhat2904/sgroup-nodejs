import { NextFunction, Request, Response } from "express";
import { SessionPayload } from "../dto/sessionPayload";
import { envConfig } from "../env";

import SessionModel from "../model/session";

interface ExtendedRequestWithUser extends Request {
	user?: SessionPayload
};


/**
 * 	Check session exist
 * 	Then check expired
 *  - Check renewTime
 *  - Check expired
 */
export const authRequired =  async (req: Request, res: Response, next: NextFunction) => {
	
	const sessionId = req.signedCookies.sesionId;
	
	if (sessionId == null) {				
		return res.redirect('/auth/login');
	}
	
	const currentUserSession = await SessionModel.findById(sessionId);
	
	if (!currentUserSession) {
		res.clearCookie('sessionId');
		
		return res.redirect('/auth/login');
	}

	if (Date.now() - currentUserSession.expired > 0) {
		res.clearCookie('sessionId');
		await SessionModel.deleteOne({
			_id: sessionId
		})
		
		return res.redirect('/auth/login');
	}

	if (Date.now() - currentUserSession.renewTime < 0) {
		await SessionModel.updateOne({
			_id: sessionId
		}, {
			renewTime: Date.now() + envConfig.get('SESSION_RENEW')
		});
	}
	(req as ExtendedRequestWithUser).user = currentUserSession.user;
	
	
	return next();
};

export const authNotRequired = (req: Request, res: Response, next: NextFunction) => {
	const { sessionId } = req.signedCookies;
	
	if (sessionId) return res.redirect('/');

	return next();
}