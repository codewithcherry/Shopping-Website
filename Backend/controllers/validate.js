const jwt=require('jsonwebtoken')
const jwt_secret=process.env.JWT_SECRET

exports.validate=(req,res,next)=>{

    const token=req.headers["authorization"].split(" ")[1];
    if(token){
         try{
            const user= jwt.verify(token,jwt_secret)
            res.status(200).json(user);
         }
         catch (err) {
            res.status(403).json("invalid token or token expired")
          }
            
    }
    else{
        res.status(403).json("invalid token or token expired")
    }

}

exports.authenticate=(req,res,next)=>{
    const token=req.headers["authorization"].split(" ")[1];
    if(token){
         try{
            const user= jwt.verify(token,jwt_secret)
            req.user=user
            next();
         }
         catch (err) {
            res.status(401).json("unauthorised user login to access")
          }          
    }
    else{
        res.status(403).json("unauthorised user login to access")
    }
}