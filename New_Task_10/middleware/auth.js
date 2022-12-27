const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req,res,next)=>{
    try{
       let token = req.header("Authorization");
       let token2 = token.split(" ")[1]

       console.log("Token2 = ",token2);
       if(!token2){
        return res.send({status:404,message:"Token Not Provided."});
       }
       let decode = jwt.verify(token2,config.get("jwtPrivateKey"));
       console.log("decode = ",decode);
       let isAdmin = decode.isAdmin;
       console.log("isadmin = ",isAdmin);
       if(!isAdmin){
        res.send({status:401,message:"Anauthorised"})
       }
       next()
    }
    catch(error){
        next(error);
    }
}