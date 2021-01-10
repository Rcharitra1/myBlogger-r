const express=require('express');
const router=express.Router();

//@route GET api/posts/test
//desc Tests post route
//public routes

router.get('/test', (req, res) => res.json({msg:'blogs works'
}));

module.exports=router;