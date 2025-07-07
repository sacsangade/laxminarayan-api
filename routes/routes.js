const router = require('express').Router();
const multer = require('multer');
var userController = require('../controllers/user');
var memberController = require('../controllers/member');
var fs = require('fs');
var memberModel = require('../models/member');

	
const multerStorage = multer.diskStorage({
  destination: async(req, file, cb) => {
	if(req.params.id){
		const memberinfo= await memberModel.findOne({memberid:req.params.id});
		let memberImageType = "";
		if(file.fieldname=='newmemberavatar'){
			memberImageType = "avatar"; 
		}else if(file.fieldname=='newmembersignature'){
			memberImageType = "signature";
		}else{
			memberImageType = "documents";
		}
		const dir = "public/uploads/members/"+memberinfo.memberjoinyear+"/"+req.params.id+"/"+memberImageType+"";
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir, { recursive: true });
		}
		cb(null, dir);
	}else{
		const now = new Date();
		const year = now.getFullYear();
		const memberlastres = await memberModel.findOne().sort({ _id: -1 }).limit(1);
		let memberid = "";
		if(memberlastres){
			const memberc = memberlastres.memberid;
			memberid = memberc + 1;
		}else{
			memberid = 1;
		}
		let memberImageType = "";
		if(file.fieldname=='newmemberavatar'){
			memberImageType = "avatar"; 
		}else if(file.fieldname=='newmembersignature'){
			memberImageType = "signature";
		}else{
			memberImageType = "documents";
		}
		const dir = "public/uploads/members/"+year+"/"+memberid+"/"+memberImageType+"";
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir, { recursive: true });
		}
		    cb(null, dir);
	}

  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
	cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
	
  },
});
let upload  = multer({ storage: multerStorage});


router.get("/api/",(req,res)=>{
	res.render("pages/index");
});

router.post('/login', userController.getSingleuser);
router.post('/add-member',upload.fields([{name: 'newmemberavatar', maxCount: 1},{name: 'newmembersignature', maxCount: 1},{name: 'newmemberadharcardfront', maxCount: 1},{name: 'newmemberadharcardback', maxCount: 1},{name: 'newmemberpancard', maxCount: 1},{name: 'newmembervoteridcardfront', maxCount: 1},{name: 'newmembervoteridcardback', maxCount: 1},{name: 'newmemberrationcard', maxCount: 1}]), memberController.addmember);
router.get('/all-member', memberController.getAllMember);
router.put('/edit-member/:id',upload.fields([{name: 'newmemberavatar', maxCount: 1},{name: 'newmembersignature', maxCount: 1},{name: 'newmemberadharcardfront', maxCount: 1},{name: 'newmemberadharcardback', maxCount: 1},{name: 'newmemberpancard', maxCount: 1},{name: 'newmembervoteridcardfront', maxCount: 1},{name: 'newmembervoteridcardback', maxCount: 1},{name: 'newmemberrationcard', maxCount: 1}]), memberController.editMember);
router.patch('/deactive-member/:id', memberController.deactiveMember);
router.post('/fileup', upload.single('memberavatar'), memberController.fileup);
router.get('/last-member', memberController.lastmember);
router.get('/get-member-by-id', memberController.memberDetails);
router.get('/get-member-mobile-number', memberController.getMemberMobileNumber);
router.get('/get-member-email', memberController.getMemberEmail);
router.get('/getauthuser', userController.getauthuser);






module.exports = router;
