const db = require("../models/index");
const user = db.user;
const bcrypt = require("bcrypt");

exports.regesterUser = async(req,res,next)=>{
    try{
       let body = req.body;
       let exist = await user.findOne({where:{email:body.email}});
       if(exist){
        res.send({status:403,message:"User Already Exist."});
       }
       let salt =await bcrypt.genSalt(10);
       let hashpass = await bcrypt.hash(body.password,salt);

       let result = await user.create({
        userName:body.userName,
        email:body.email,
        password:hashpass
       });
       if(result){
        let newUser = await user.findOne({where:{email:body.email},attributes:{exclude:["password"]}});
        return res.send({status:200,message:"User regester sucessfully.",newUser});
       }
    }
    catch(error){
        next(error);
    }
}

exports.loginUser = async(req,res,next)=>{
    try{
      let body = req.body;
      let exist = await user.findOne({where:{email:body.email}});
      if(!exist){
        return res.send({status:404,message:"User doesn't exist."});
      }
      let matched =  bcrypt.compare(exist.password,body.password);
      if(!matched){
        return res.send({status:400,message:"Invalid email or password."});
      }
      let token = await user.generateToken(
        exist.userName,
        exist.email,
        
      );
      if(token){
        return res.send({status:200,message:"User Login Sucessfully.",token});
      }
    }
    catch(error){
        next(error)
    }
}

exports.getallUser = async(req,res,next)=>{
    try{
      let result = await user.findAll();
      console.log(result);
      if(!result){
        return res.send({status:404,message:"User Not Found."});
      }
      if(result){
        return res.send({status:200,message:"User Found Sucessfully.",result});
      }
    }
    catch(error){
        next(error);
    }
}

