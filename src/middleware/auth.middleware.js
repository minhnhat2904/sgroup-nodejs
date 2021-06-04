const SessionModel = require("../model/session");

module.exports = {
    auth(type){
        return async (req, res, next) => {
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