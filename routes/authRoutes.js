const express =require("express");
const bcrypt = require("bcryptjs");
const User =require("../models/User");

 
const router  = express.Router();

router.post("/register", async(req,res)=>{
    try{
     const {name,email,password}= req.body;

     const existingUser = await User.findOne({email});
      if(existingUser)
        return res.status(400).json({msg:"User already existed"});

      const salt = await bcrypt.genSalt(10);
      const hashedpassword =await bcrypt.hash(password,salt);

      const user = new User({
        name,
        email,
        password:hashedpassword
      });
           
      await user.save();
      res.status(201).json({msg:"User registered Succefully"});
    }
    catch(error){
       res.status(500).json({error:error.message});
    }
});

router.post("/login", async(req,res)=>{
    try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user)
        return res.status(400).json({msg:"Invalid Credential"});

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch)
        return res.status(400).json({msg:"Invalid Credential"});
  
    
    res.json({msg:`welcome ${user.name}`});
    
    
    }
    catch(error){
      res.status(500).json({error: error.message});
    }
})

module.exports = router;