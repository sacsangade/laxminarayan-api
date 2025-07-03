const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
	username: {
        required: true,
        type: String
    },
    useremail: {
        type: String
    },
	userpassword: {
        type: String
    },
	userrole:{
		type: String
	},
	userfirstname:{
		type: String
	},
	userlastname:{
		type: String
	}
	
})

module.exports = mongoose.model('ln_users', userSchema);
 