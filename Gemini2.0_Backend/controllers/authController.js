const UserModel = require("../models/User");
const { oauth2client } = require("../utils/GoogleConfig");
const jwt=require("jsonwebtoken")
const axios=require("axios")
const googleLogin=async(req,res)=>{
    console.log("Yaha call aai hai ")
    try{
        const {code}=req.query;
        const googleRes=await oauth2client.getToken(code)
        oauth2client.setCredentials(googleRes.tokens)

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
          );
          
        console.log("USER LOGIN RESPONSE",userRes.data)
        const {email,name,picture}=userRes.data;
        let user=await UserModel.findOne({email});
        if(!user){
            user=await UserModel.create({
                name,email,profilePicture:picture
            })
        }

        const { _id } = user; // Correct destructure from MongoDB user
        const token = jwt.sign(
          { _id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_TIMEOUT
          }
        );
        
        console.log("Token is ", token);
        console.log("user is", user);
        return res.status(200).json({
          success: true,
          token,
          user
        })
        
        return res.status(200).json({
            success:true,
            token,
            user
        })

    }catch(error){
             res.status(500).json({
                success:false,
                message:"Internal Server Error"
             })
    }
  }

  module.exports={googleLogin}