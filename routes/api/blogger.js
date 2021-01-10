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

const validateExperienceInput=require('../../validation/experience');


const validateEducationInput=require('../../validation/education');

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

//@route Get api/blogger/handle/:handle
//desc Find Blogger by Handle
//public 

router.get('/handle/:handle',(req, res)=>{
    const errors={};
    Blogger.findOne({handle:req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(blogger=>{
        if(!blogger){
            errors.nouser='There isnt a user with that handle',
            res.status(404).json(errors);
        }

        res.json({blogger});

    })
    .catch(err=>res.status(404).json(err));
} )

//@route Get api/blogger/user/:user_id
//desc find user by user id
//public 

router.get('/user/:user_id', (req, res)=>{
    const errors={};
    Blogger.findOne({user:req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(blogger=>{
        if(!blogger){
            errors.nouser='There isnt a user by that id';
            res.status(404).json(errors);
        }
        res.json(blogger);
    }).catch(err=>res.status(404).json({profile:'This user id doesnt exist'}));
})

//@route Get api/blogger/all
//desc Get all bloggers 
//public 

router.get('/all', (req, res)=>{
    const errors={};
    Blogger.find().
    populate('user', ['name', 'avatar'])
    .then(bloggers=>{

        if(!bloggers){
            errors.noblogger='No bloggers to display';
            res.status(404).json(errors);
        }

        res.json(bloggers);
        
    }).catch(err=> res.status(404).json({profile: 'there are no bloggers to display'}));
})

//@route Post api/blogger
//desc post to update current blogger details
//private route

router.post('/', passport.authenticate('jwt', {session:false}), (req, res)=>{
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
   if(typeof(req.body.speciality)!=='undefined'){
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
            .then(blogger=>res.json(blogger))
            .catch(err=>console.log(err));

       }
       else
       {
           //create 

           //check if handle exists
           Blogger.findOne({handle:bloggerDetails.handle})
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


//@route Post api/blogger/experience
//desc post to create and update work experience details
//private route

router.post('/experience', passport.authenticate('jwt', {session:false}), (req, res)=>{
    const {errors, isValid}=validateExperienceInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    Blogger.findOne({user:req.user.id})
    .then(blogger =>{
        
        const newExp={
            title:req.body.title,
            company:req.body.company,
            location:req.body.location,
            from:req.body.from,
            to:req.body.to,
            current:req.body.current,
            description: req.body.description 
        }

        //Add to exp array
        blogger.experience.unshift(newExp);

        blogger.save().then( blogger=> res.json(blogger));
    })
});





//@route Post api/blogger/eduction
//desc post to create and update educational details
//private route

router.post('/education', passport.authenticate('jwt', {session:false}), (req, res)=>{
    const {errors, isValid}=validateEducationInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    Blogger.findOne({user:req.user.id})
    .then(blogger =>{
        
        const newEdu={
            degree:req.body.degree,
            institution:req.body.institution,
            finished:req.body.finished,
            current:req.body.current,
            description: req.body.description 
        }

        //Add to exp array
        blogger.education.unshift(newEdu);

        blogger.save().then( blogger=> res.json(blogger));
    })
});

//@route Delete api/blogger/experience/:exp._id
//desc deletes an experience
//private route



router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res)=>{
    
    Blogger.findOne({user: req.user.id})
    .then(blogger=>{
        const removeIndex=blogger.experience.map(item=>item.id).indexOf(req.params.exp_id);
        blogger.experience.splice(removeIndex, 1);
        blogger.save().then(blogger=> res.json(blogger));
    }).catch(err=> res.status(404).json(err));
});



//@route Delete api/blogger/education/:edu._id
//desc deletes an educational record
//private route


router.delete('/education/:edu_id', passport.authenticate('jwt', {session:false}), (req, res)=>{
    console.log(req.params.edu_id);
    Blogger.findOne({user:req.user.id})
    .then(blogger=> {
        const IndexToRemove=blogger.education.map(edu=>edu.id).indexOf(req.params.edu_id);

        blogger.education.splice(IndexToRemove, 1);
        blogger.save().then(blogger=>res.json(blogger));
    }).catch(err=>res.status(400).json(err));
});



//@route Delete api/blogger
//desc deletes an blogger details
//private route


router.delete('/', passport.authenticate('jwt', {session:false}), (req, res)=>{
    Blogger.findOneAndRemove({user:req.user.id})
    .then(()=>{
        User.findOneAndRemove({_id: req.user.id})
        .then(()=> res.json({success:'Delete profile and user'}));
    })
})

module.exports=router;