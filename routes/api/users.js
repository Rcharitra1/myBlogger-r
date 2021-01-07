const express=require('express');




//@route GET api/users/test
//desc Tests post route

const router=express.Router();

router.get('/test', (req, res)=> res.json({
    msg:"Users works"
}));


module.exports=router;