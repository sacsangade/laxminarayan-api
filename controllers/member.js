const memberModel = require('../models/member');
const userModel = require('../models/user');
const memberController = {};
const userController = {};

const bcrypt = require('bcrypt');
const saltRounds = 10;

memberController.addmember  = async (req, res, next) => {
	let memberav = "";
	let membersign = "";
	let memberadharcardfront = "";
	let memberadharcardback = "";
	let memberpancard = "";
	let membervoteridcardfront = "";
	let membervoteridcardback = "";
	let memberrationcard = "";
	
    if(req.files.newmemberavatar){
		memberav = req.files.newmemberavatar[0].filename;
	}
	if(req.files.newmembersignature){
		membersign = req.files.newmembersignature[0].filename;
	}
	if(req.files.newmemberadharcardfront){
		memberadharcardfront = req.files.newmemberadharcardfront[0].filename;
	}
	if(req.files.newmemberadharcardback){
		memberadharcardback = req.files.newmemberadharcardback[0].filename;
	}
	if(req.files.newmemberpancard){
		memberpancard = req.files.newmemberpancard[0].filename;
	}
	if(req.files.newmembervoteridcardfront){
		membervoteridcardfront = req.files.newmembervoteridcardfront[0].filename;
	}
	if(req.files.newmembervoteridcardback){
		membervoteridcardback = req.files.newmembervoteridcardback[0].filename;
	}
	if(req.files.newmemberrationcard){
		memberrationcard = req.files.newmemberrationcard[0].filename;
	}
    const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
	const day = String(now.getDate()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	const randNum = (1000 + Math.random() * 9000).toFixed(0);
	const memberlastres = await memberModel.findOne().sort({ _id: -1 }).limit(1);
	let memberid = "";
    if(memberlastres){
	const memberc = memberlastres.memberid;
	  memberid = memberc + 1;
	}else{
	  memberid = 1;
	}
	const membercrnno = "LXNY"+randNum+""+seconds+""+minutes+""+year+""+hours+""+month+"";
	const {newmembertitle, newmemberfirstname, newmembermiddlename, newmembersurname, newmembermobileno, newmemberemail, newmemberbirthdate, newmemberage, newmembergender, newmemberfathername, newmemberhusbandname, newmembercaste, newmemberoccupation, newmembermonthlyincome, newmemberidtype, newmemberbankaccountno, newmemberifscno, newmemberbankname, newmemberbranchname, newmemberstreetaddress, newmemberarea, newmembercity, newmemberdistrict, newmemberpincode, newmemberadharcardnumber, newmemberpancardnumber, newmembervoteridcardnumber, newmemberrationcardnumber, newmemberamount, newmemberpaymentmode, newmembercompanyname, newmembercompanygstnumber, newmembercompanystreetaddress, newmembercompanyarea, newmembercompanycity, newmembercompanydistrict, newmembercompanypincode } = req.body;
		var memberObject = {
		memberid: memberid,
		membercrnno:membercrnno,
        membertitle: newmembertitle,
		memberfirstname: newmemberfirstname,
		membermiddlename: newmembermiddlename,
		membersurname:newmembersurname,
		memberavatar:memberav,
		membermobileno:newmembermobileno,
		memberemail:newmemberemail,
		memberbirthdate:newmemberbirthdate,
		memberage:newmemberage,
		membergender:newmembergender,
		memberfathername:newmemberfathername,
		membercaste:newmembercaste,
		memberoccupation:newmemberoccupation,
		membermonthlyincome:newmembermonthlyincome,
		memberidtype:newmemberidtype,
		memberbankaccountno:newmemberbankaccountno,
		memberifscno:newmemberifscno,
		memberbankname:newmemberbankname,
		memberbranchname:newmemberbranchname,
		memberstreetaddress:newmemberstreetaddress,
		memberarea:newmemberarea,
		membercity:newmembercity,
		memberdistrict:newmemberdistrict,
		memberpincode:newmemberpincode,
		memberadharcardnumber:newmemberadharcardnumber,
		memberadharcardfront:memberadharcardfront,
		memberadharcardback:memberadharcardback,
		memberpancardnumber:newmemberpancardnumber,
		memberpancard:memberpancard,
		membervoteridcardnumber:newmembervoteridcardnumber,
		membervoteridcardfront:membervoteridcardfront,
		membervoteridcardback:membervoteridcardback,
		memberrationcardnumber:newmemberrationcardnumber,
		memberrationcard:memberrationcard,
		memberamount:newmemberamount,
		memberpaymentmode:newmemberpaymentmode,
		membersignature:membersign,
		memberjoinyear:year,
		memberaccounttype:1,
		memberstatus:1,
		membercreated:now,
		memberupdated:'NULL',
		memberdeleted:'NULL',
	};
	
	if(newmembertitle=="mrs"){
     Object.assign(memberObject, {memberhusbandname:newmemberhusbandname});
	};
	if(newmembercompanyname){
		Object.assign(memberObject, {membercompanyname:newmembercompanyname, membercompanygstnumber:newmembercompanygstnumber, membercompanystreetaddress:newmembercompanystreetaddress, membercompanyarea:newmembercompanyarea, membercompanycity:newmembercompanycity, membercompanydistrict:newmembercompanydistrict, membercompanypincode:newmembercompanypincode});
	}
	
	const newMember = new memberModel(memberObject);
	await memberModel.insertOne(newMember);
	
	const hash = bcrypt.hashSync(membercrnno, saltRounds);
	var userObject = {
		useremail:newmemberemail,
		username:membercrnno,
		userpassword: hash,
		userrole: "member",
		userfirstname:newmemberfirstname,
		userlastname:newmembersurname
	};
	const newUser = new userModel(userObject);
	await userModel.insertOne(newUser);
    res.status(200).json({'status':'ok'});
};
memberController.editMember  = async (req, res, next) => {
	const memberid = req.params.id;
    const updatedData = req.body;
	console.log(updatedData);
	let memberav = "";
	let membersign = "";
	if(req.files.newmemberavatar){
		memberav = req.files.newmemberavatar[0].filename;
	}else{
		if(updatedData.newmemberavatar){
		  memberav = updatedData.newmemberavatar;
		}
	}
	if(req.files.newmembersignature){
		membersign = req.files.newmembersignature[0].filename;
	}else{
		if(updatedData.newmembersignature){
		  membersign = updatedData.newmembersignature;
		}
	}
    let updatedUser = await memberModel.findOneAndUpdate(
        { memberid: memberid },
        { $set: { 
		membertitle: updatedData.newmembertitle,  
		memberfirstname: updatedData.newmemberfirstname, 
		membermiddlename: updatedData.membermiddlename,
		membersurname: updatedData.newmembersurname,
	    memberavatar: memberav,
		membermobileno: updatedData.newmembermobileno,
		memberemail: updatedData.newmemberemail,
		memberbirthdate: updatedData.newmemberbirthdate,
		memberage: updatedData.newmemberage,
		membergender: updatedData.newmembergender,
		memberfathername: updatedData.newmemberfathername,
		membercaste: updatedData.newmembercaste,
		memberoccupation: updatedData.newmemberoccupation,
		membermonthlyincome: updatedData.newmembermonthlyincome,
		memberidtype: updatedData.newmemberidtype,
		memberbankaccountno: updatedData.newmemberbankaccountno,
		memberifscno: updatedData.newmemberifscno,
		memberbankname: updatedData.newmemberbankname,
		memberbranchname: updatedData.newmemberbranchname,
		memberstreetaddress: updatedData.newmemberstreetaddress,
		memberarea: updatedData.newmemberarea,
		membercity: updatedData.newmembercity,
		memberdistrict: updatedData.newmemberdistrict,
		memberpincode: updatedData.newmemberpincode,
		memberadharcardnumber: updatedData.newmemberadharcardnumber,
		memberadharcardfront: updatedData.newmemberadharcardfront,
		memberadharcardback: updatedData.newmemberadharcardback,
		memberpancardnumber: updatedData.newmemberpancardnumber,
		memberpancard: updatedData.newmemberpancard,
		membervoteridcardnumber: updatedData.newmembervoteridcardnumber,
		membervoteridcardfront: updatedData.newmembervoteridcardfront,
		membervoteridcardback: updatedData.newmembervoteridcardback,
		memberrationcardnumber: updatedData.newmemberrationcardnumber,
		memberrationcard: updatedData.newmemberrationcard,
		memberamount: updatedData.newmemberamount,
		memberpaymentmode: updatedData.newmemberpaymentmode,
		membersignature: membersign,
		}},
        { new: true, upsert: true }
    );
	res.status(200).json({'status':'ok'});
};
memberController.lastmember  = async (req, res, next) => {
	const latestMember = await memberModel.findOne().sort({ field: 'asc', _id: -1 }).limit(1);
    res.status(200).json(latestMember);
};

memberController.getAllMember  = async (req, res, next) => {
	const members = await memberModel.find({memberstatus:1}).sort({ field: 'asc', _id: -1 });
	if(members){
	res.status(200).json(members);
	} else{
		return res.status(401).json({ error: 'No access' });
	}
};
memberController.memberDetails= async (req, res, next) => {
	const memberdetail = await memberModel.find({memberid:req.query.memberid});
	res.status(200).json(memberdetail);
};
memberController.getMemberMobileNumber  = async (req, res, next) => {
	const result = await memberModel.find({membermobileno:req.query.mobileno});
	if(result.length!=0){
		res.status(200).json({'status':'ok'});
	} else {
		res.status(200).json({'status':''});
	}
};

memberController.getMemberEmail  = async (req, res, next) => {
	const result = await memberModel.find({memberemail:req.query.email});
	if(result.length!=0){
		res.status(200).json({'status':'ok'});
	} else {
		res.status(200).json({'status':''});
	}
};

memberController.deactiveMember  = async (req, res, next) => {
	const memberid = req.params.id;
	await memberModel.findOneAndUpdate(
        { memberid: memberid },
		{ $set: { memberstatus: 0,
		}},
        { new: true, upsert: true });
  res.status(200).json({'status':'ok'});
};

memberController.fileup  = async (req, res, next) => {

  res.status(200).json({'status':'ok'});
};

module.exports = memberController;