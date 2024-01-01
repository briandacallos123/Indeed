const Auth = require('../../model/auth')
const Token = require('../../utils/tokenUtils')
const bcrpyt = require('bcrypt')
const cookieParser = require('cookie-parser');


const UpdateProfile = async(req, res, next) => {
    const fileName = req?.file?.filename;

    const {fName, lName, address, contact} = req.body;

    try {
        const updateProfile = await Auth.updateOne({_id:req.body.id},{$set:{
            resume:fileName,
            name:`${fName} ${lName}`,
            email:`${lName}${fName}@gmail.com`,
            address
        }})

        res.status(200).json({message:"Updated successfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const Signin = async(req, res, next) => {
    
    try {
        const {username, password} = req.body;

        if(!username || !password) return res.status(500).json({message:"All fields required"});
        const user = await Auth.findOne({username});
        
      
        if(!user)return res.status(404).json({message:"User not found"});

        const match = await bcrpyt.compare(password, user?.password);
        
        if(!match){
            return res.status(500).json({error:"Wrong credentials"});
        }
       const newUser = {
                id:user?._id,
                username:user?.username
            }
        const token = Token.generateToken({user:newUser});

        //   Set token as a cookie
            res.cookie('token', token, { httpOnly: true });
           return res.json({ message: 'Login successful', user });

        
        
    } catch (error) {
        res.status(500).json({Error:error.message})
    }
}

const GetFiles = async(req, res, next) =>{
    try {
        const response = await Auth.find({
            resume:req.body.id
        })

        res.status(200).json({resume:response})
    } catch (error) {
        
    }
}

const Register = async(req, res, next) => {
   
    const {username, password, name, email, age} = req.body;

    try {
        if(!username || !password){
            return res.status(500).json({message:"username and password is required"})
        }
        const hashedPassword = await bcrpyt.hash(password, 10)
        const response = await Auth.create({
            ...req.body,
            password:hashedPassword
        })
        res.status(200).json({message:"Created Successfully"})

    } catch (error) {
       console.log(error)
    }
}

module.exports = {
    Signin,
    Register,
    UpdateProfile,
    GetFiles
}