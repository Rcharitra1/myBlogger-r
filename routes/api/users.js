const express=require('express');

const router=express.Router();
//Load user model

const User = require('../../models/User.js');

const gravatar=require('gravatar');

const becrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const keys=require('../../config/keys');
const passport=require('passport');

//

const validateRegisterInput=require('../../validation/register');

const validateLoginInput=require('../../validation/login');






//@route GET api/users/test
//desc Tests post route

//public routes


router.get('/test', (req, res)=> res.json({
    msg:"Users works"
}));




//@route GET api/users/register
//desc Tests post route

//public routes



router.post('/register', (req, res)=>{
    const {errors, isValid} = validateRegisterInput(req.body);


    if(!isValid){
        return res.status(400).json(errors)
    }

    
    User.findOne({email:req.body.email})
    .then(user => {
        if(user){
            return res.status(400).json({
                email : 'Email already exists'
            });
        }else{
            const avatar=gravatar.url(req.body.email, {
                s:'200' ,//size
                r:'pg',//rating
                d:'mm'//default
            });
            const newUser=new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password
            });
            becrypt.genSalt(10, (err, salt) => {
                becrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err){
                        throw err;
                    }
                    newUser.password=hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                })
            } )
        }
    })
});



//@route GET api/users/login
//@desc Login USer/ returning JWT Token
//@access Public


router.post('/login', (req, res) => {
    const email=req.body.email;
    const password=req.body.password;

    //find the user
    const {errors, isValid}=validateLoginInput(req.body);



    if(!isValid){
        return res.status(400).json(errors)
    }


    User.findOne({email})
    .then(user => {
        if(!user){
            errors.email='User not found';
            return res.status(404).json(errors);
        }

        //check password

        becrypt.compare(password, user.password)
        .then(isMatch=>{
            if(isMatch){
                //user matched
                //Create JWT payload
                const payload={
                    id:user.id,
                    name:user.name,
                    avatar:user.avatar
                };
                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600}, (err, token)=>{
                    res.json({
                        success:true,
                        token:`Bearer ${token}`
                    })
                });
            }else{
                errors.password='password incorrect';
                return res.status(400).json({errors});
            }
        });
    });

});



//@route GET api/users/current
//@desc Return current user
//@access Private


router.get('/current', passport.authenticate('jwt', {session:false}), (req, res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email
    })
});

module.exports=router;


