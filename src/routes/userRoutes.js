const userController=require('../controllers/userController');
const express=require('express');
const router=express.Router();

router.post('/new',userController.addUser);
router.post('/login',userController.login);
router.get('/verify',userController.verifyToken);
module.exports = router;
module.exports=router;

