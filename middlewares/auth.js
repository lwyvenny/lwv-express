//做登录校验的中间件

const auth = () =>{
    return (req,res,next) =>{
        if(!req.session.user){
            res.redirect(`/use/login?redirect=${req.originalUrl}`);
        }else{
            next();
        }
    }
}

module.exports = auth;