const mongoose = require('mongoose');
const memebrSchema = new mongoose.Schema({
	memberid: {
		unique:true,
        type: Number,
    },
	membercrnno: {
		unique:true,
        type: String,
    },
	memberavatar:{
		type: String
	},
	membertitle: {
        required: true,
        type: String
    },
    memberfirstname: {
		required: true,
        type: String
    },
	membermiddlename: {
		required: true,
        type: String
    },
	membersurname:{
		required: true,
		type: String
	},
	membermobileno:{
		required:true,
		unique:true,
		type: Number
	},
	memberemail:{
		required:true,
		unique:true,
		type: String
	},
	memberbirthdate:{
		required: true,
		type: Date
	},
	memberage:{
		required: true,
		type: Number
	},
	membergender:{
		required: true,
		type: String
	},
	memberfathername:{
		required: true,
		type: String
	},
	memberhusbandname:{
		type: String
	},
	membercaste:{
		type: String
	},
	memberoccupation:{
		required: true,
		type: String
	}, 
	membermonthlyincome:{
		required: true,
		type: Number
	}, 
	memberidtype:{
		required: true,
		type: String
	},
	memberbankaccountno:{
		required: true,
		type: String
	}, 
	memberifscno:{
		required: true,
		type: String
	}, 
	memberbankname:{
		required: true,
		type: String
	}, 
	memberbranchname:{
		required: true,
		type: String
	},
	membercompanyname:{
		type: String
	},
	membercompanygstnumber:{
		type: Number
	},
	memberstreetaddress:{
		required: true,
		type: String
	},
	memberarea:{
		type: String
	},
	membercity:{
		required: true,
		type: String
	},
	memberdistrict:{
		required: true,
		type: String
	},
	memberpincode:{
		required: true,
		type: Number
	},
	membercompanystreetaddress:{
		type: String
	},
	membercompanyarea:{
		type: String
	},
	membercompanycity:{
		type: String
	},
	membercompanydistrict:{
		type: String
	},
	membercompanypincode:{
		type: Number,
	},
	memberadharcardnumber:{
		type: Number
	},
	memberadharcardfront:{
		type:String
	},
	memberadharcardback:{
		type:String
	},
	memberpancardnumber:{
		type:String
	},
	memberpancard:{
		type:String
	},
	membervoteridcardnumber:{
		type:String
	},
	membervoteridcardfront:{
		type:String
	},
	membervoteridcardback:{
		type:String
	},
	memberrationcardnumber:{
		type:String
	},
	memberrationcard:{
		type:String
	},
	memberamount:{
		type:Number
	},
	memberpaymentmode:{
		type:String
	},
	membersignature:{
		type:String
	},
	memberaccounttype:{
		type:Number
	},
	memberjoinyear:{
		type:Number
	},
	memberstatus:{
		type:Number
	},
	membercreated:{
		type:Date
	},
	memberupdated:{
		type:String
	},
	memberdeleted:{
		type:String
	}
});

module.exports = mongoose.model('ln_members', memebrSchema);