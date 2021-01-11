const express=require('express');
const router=express.Router();

const mongoose=require('mongoose');
const passport=require('passport');
const { json } = require('body-parser');
//Bring in user and blogs
const User=require('../../models/User');
const Blog=require('../../models/Blog');



//Bring in validation
const validateBlogInput=require('../../validation/blog')



//@route Get api/blogs/test
//@desc Get a post
//@access Public

router.get('/test', (req, res)=> res.json({msg:'blogs works'}));




//@route Get api/blogs/:blog_id
//@desc Get a post
//@access Public



router.get('/user/:blog_id', (req, res)=>{
    Blog.findOne({_id:req.params.blog_id})
    .then(blog=>{
        if(!blog){
            res.status(404).json({noblog:'Blog requested is not present or is deleted by user'});
        }

        res.json(blog);
        
    }).catch(err=>res.status(400).json(err));
})


//@route Get api/blogs/users/all
//@desc Get all blogs
//@access Public



router.get('/all', (req, res)=>{
    Blog.find()
    .then(blogs=>{

        if(!blogs){
       
            res.status(404).json({noblogs:'No Blogs to display'});
        }

        res.json(blogs);
        
    }).catch(err=> res.status(404).json(err));
})

//@route POST api/blogs
//@desc create blog
//@access Private


router.post('/create', passport.authenticate('jwt', {session:false}), (req, res)=>{
    console.log(req.body);
    const newBlog=new Blog({
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id

    });
    newBlog.save().then(newBlog=>res.json(newBlog));
});

//@route POST api/blogs/:blog_id
//@desc create Post
//@access Private

router.post('/create/:blog_id', passport.authenticate('jwt', {session:false}), (req, res)=>{



    console.log(req.body);

    const {errors, isValid}=validateBlogInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    Blog.findOne({_id:req.params.blog_id})
    .then(newBlog=>{
        const blog={
            heading:req.body.heading,
            text:req.body.text
        }

        newBlog.section.push(blog);
        newBlog.save().then(newBlog=>res.json(newBlog));
    });

});


//@route delete api/blogs/:blog_id
//@desc create Post
//@access Private


router.delete('/:blog_id', passport.authenticate('jwt', {session:false}), (req, res)=>{


    console.log(req.params.blog_id);
    Blog.findOneAndRemove({_id:req.params.blog_id})
    .then(Blog=> res.json({success:'Delete was successful'}))
    .catch(err=> res.status(404).json({err}));


})









module.exports=router;