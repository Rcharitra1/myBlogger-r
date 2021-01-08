const { json } = require('body-parser');
const express=require('express');
const { profile_url } = require('gravatar');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');

//Load blogger home page
const Blogger=require('../../models/Blogger');
const User=require('../../models/User');

//Load Validation

const validateBloggerInput=require('../../validation/blogger');


//@route GET api/blogger/test
//desc Tests post route

//public routes




router.get('/test', (req, res)=> res.json({
    msg:"blogger works"
}));

//@route GET api/blogger
//desc Get current blogger

//private
router.get('/', passport.authenticate('jwt', {session:false}), (req, res)=>{
    const errors={};
    Blogger.findOne({user:req.user.id})
    .then(blogger=>{
        if(!blogger){
            errors.nouser='There is no blogger details for this user'
            res.status(404).json(errors)
        }
        res.json(blogger);
    }).catch(err=>res.status(404).json(err));
});



//@route Post api/blogger
//desc post to update current blogger details
//private route

router.post('/', passport.authenticate('jwt', {session:false}), (req, res)=>{
    console.log(req.body);
    //validator method for blogger details
    const {errors, isValid}=validateBloggerInput(req.body);

    if(!isValid){
        res.status(400).json(errors);
    }
   //Get Fields

   const bloggerDetails={};
   bloggerDetails.user=req.user.id;
   if(req.body.handle)  bloggerDetails.handle=req.body.handle;
   if(req.body.organization) bloggerDetails.organization=req.body.organization;
   if(req.body.location) bloggerDetails.location=req.body.location;
   if(req.body.bio) bloggerDetails.bio=req.body.bio;
   if(typeof(req.body.skills)!=='undefined'){
       bloggerDetails.speciality=req.body.speciality.split(',');
   }
   bloggerDetails.socialHandles={};
   if(req.body.youtube) bloggerDetails.socialHandles.youtube=req.body.youtube;
   if(req.body.twitter) bloggerDetails.socialHandles.twitter=req.body.twitter;
   if(req.body.facebook) bloggerDetails.socialHandles.facebook=req.body.facebook;

   console.log(bloggerDetails);

   Blogger.findOne({user: req.user.id})
   .then(blogger=>{
       if(blogger){
           Blogger.findOneAndUpdate({user:req.user.id}, 
            {$set:bloggerDetails}, {new:true})
            .then(profile=res.json(profile));

       }else{
           //create 

           //check if handle exists
           Profile.findOne({handle:bloggerDetails.handle})
           .then(blogger=>{
               if(blogger){
                   errors.handle='That handle already exists';
                   res.status(400).json(errors);
               }

               //Save blogger details
               new Blogger(bloggerDetails).save()
               .then(blogger=>res.json(blogger));
           });


       }
   })

})


module.exports=router;