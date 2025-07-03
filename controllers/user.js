var userModel = require('../models/user');
const userController = {};
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;


const verifyUserLogin = async (loginusername,loginpassword)=>{
    try {
        const user = await userModel.findOne({username:loginusername});
        if(!user){
            return {status:'error',error:'user not found'}
        }
        if(await bcrypt.compare(loginpassword,user.userpassword)){
         
            return {status:'ok'}
		
        }
        return {status:'error',error:'invalid password'}
    } catch (error) {
        console.log(error);
        return {status:'error',error:'timed out'}
    }
}

userController.getSingleuser  = async (req, res, next) => {
	const {loginusername,loginpassword}=req.body;
	const user = await userModel.findOne({username:loginusername});
	const response = await verifyUserLogin(loginusername,loginpassword);
	if(response.status==='ok'){
		const token = jwt.sign({ userId: user._id },secret, {
			expiresIn: '8h',
		});
		res.status(200).json({ token });
    } else {
		return res.status(401).json({ error: 'Authentication failed' });
    }
};


userController.getauthuser = async (req, res, next) => {
   const { authorization } = req.headers;
   const token = authorization.substring('Bearer {"token:""'.length);
   const finaltoken = token.slice(0, -2);
   let userId = "";
   jwt.verify( finaltoken,secret, function(err, decoded) {
		if ( err ) {
			res.status(401).json( { error: err } ); 
		} else {
			userId = Object.values(decoded)[0];
		} 
   });
   if(userId){
   const userinfo = await userModel.findOne({_id:userId},{"_id":0,"username":1,"userrole":2, "userfirstname":3});
   res.status(200).json( userinfo ); 
   }
};
module.exports = userController;