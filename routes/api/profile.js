const express=require('express');




//@route GET api/profile/test
//desc Tests post route

//public routes


const router=express.Router();

router.get('/test', (req, res)=> res.json({
    msg:"profile works"
}));


module.exports=router;