import SessionModel from '../model/session';

export default {
    auth(type : any){
        return async (req : any, res: any, next:any) => {
            const {user} = req.signedCookies;
            
            // const session = await SessionModel.findById(user);
           
            switch (type) {
                case 'REQUIRE':
                    
                    if(!user){
                        const session = await SessionModel.findOneAndUpdate({lock: true},{lock:false});
                        return res.redirect('/auth/login');
                    }

                    // if(!session.lock){
                    //     return res.redirect('/auth/login');
                    // }
                    break;
                case 'NOT_REQUIRE':
                    
                default:
                    if(user){
                        return res.redirect('/');
                    }
                    break;
            }
            return next();
        }
        
    }
}