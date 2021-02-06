const express=require('express');
const router=express.Router();

const mongoose=require('mongoose');
const passport=require('passport');
const { json } = require('body-parser');
//Bring in user and blogs
const Blogger=require('../../models/Blogger');
const Blog=require('../../models/Blog');



//Bring in validation
const validateBlogInput=require('../../validation/blog');
const validateCommentInput=require('../../validation/comment');

const validateSectionInput=require('../../validation/section')



//@route Get api/blogs/test
//@desc Get a post
//@access Public

router.get('/test', (req, res)=> res.json({msg:'blogs works'}));




//@route Get api/blogs/:blog_id
//@desc Get a post
//@access Public



router.get('/blog/:blog_id', (req, res)=>{
    Blog.findOne({_id:req.params.blog_id})
    .then(blog=>{
        if(!blog){
            res.status(404).json({noblog:'Blog requested is not present or is deleted by user'});
        }

        res.json(blog);
        
    }).catch(err=>res.status(400).json(err));
})


//@route Get api/blogs/all
//@desc Get all blogs
//@access Public



router.get('/all', (req, res)=>{
    Blog.find().
    sort({date:-1})
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
    
    const {errors, isValid}=validateBlogInput(req.body);
    if(!isValid)
    {
        return res.status(400).json(errors);

    }
    const newBlog=new Blog({
        user:req.user.id,
        name:req.user.name,
        avatar:req.user.avatar,
        
        heading:req.body.heading

    });
    newBlog.save().then(newBlog=>res.json(newBlog));
});

//@route POST api/blogs/:blog_id
//@desc create a section
//@access Private

router.post('/create/:blog_id', passport.authenticate('jwt', {session:false}), (req, res)=>{




    const {errors, isValid}=validateSectionInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    Blog.findOne({_id:req.params.blog_id})
    .then(newBlog=>{
        const section={
            subHeading:req.body.subHeading,
            text:req.body.text
        }

        newBlog.section.push(section);
        newBlog.save().then(newBlog=>res.json(newBlog));
    });

});


//@route delete api/blogs/:blog_id
//@desc delete a blog
//@access Private

router.delete('/:blog_id', passport.authenticate('jwt', {session:false}), (req, res)=>{


    Blogger.findOne({user:req.user.id})
    .then(Blogger=>{
        Blog.findById(req.params.blog_id).
        then(blog=>{
            console.log(blog);
            if(blog.user.toString()!==req.user.id){
                return res.status(401).json({notauthorized:'User not authorized'});

                
            }
            blog.remove().then(()=> res.json({success:true}).catch(err=>res.status(404).json({postnotfound:'blog wasnt found'})))
        }).catch(err=>res.json(err));
    });
    


});



//@route Post api/blogs/section/:blog_id
//delete a section
//access private 


router.post('/section/:blog_id', passport.authenticate('jwt', {session:false}), (req, res)=>
{
    Blogger.findOne({user: req.user.id})
    .then(Blogger => {
        Blog.findById(req.params.blog_id)
        .then(blog=> {

           
            if(blog.user.toString()===req.user.id)
            {
                console.log(req.body.sectionId)
                let indexRemoved;
                for(let i=0; i<blog.section.length;i++)
                {
                    if(blog.section[i]._id.toString()===req.body.sectionId)
                    {
                        indexRemoved=i;
                    }
                }

                blog.section.splice(indexRemoved, 1);
                blog.save().then(blog=> res.status(200).json(blog));

            }else
            {
                res.json({error : "not authorized"})
            }

        }).catch(err=> res.status(400).json({noblog: 'no blog found'}))
    })
})


//@route Post api/blogs/like/:blog_id
//@desc increment like of the blogger
//@access private 

router.post('/like/:blog_id', passport.authenticate('jwt', {session:false}), (req, res)=>{
  
    Blogger.findOne({user: req.user.id})
    .then(blogger=>{
        Blog.findById(req.params.blog_id)
        .then( blog =>{
            console.log(blog);
            if(blog.likes.filter(like=>like.user.toString()===req.user.id).length>0){
                return res.status(400).json({liked:'User had an existing like'})
            }
            blog.likes.unshift({user: req.user.id});

            blog.save().then(blog=>res.json(blog));
        })
    })
});





//@route Post api/blogs/unlike/:blog_id
//@desc unincrement like of the blogger
//@access private 

router.post('/unlike/:blog_id', passport.authenticate('jwt', {session:false}), (req, res)=>{
  
    Blogger.findOne({user: req.user.id})
    .then(blogger=>{
        Blog.findById(req.params.blog_id)
        .then( blog =>{
            console.log(blog);
            if(blog.likes.filter(like=>like.user.toString()===req.user.id).length===0){

                res.status(400).json({nolike:'You dont have a like to remove'});
            }

            const indexToRemove=blog.likes.map(item=> item.user.toString()).indexOf(req.user.id);

            blog.likes.splice(indexToRemove, 1);
            blog.save().then(blog=> res.json(blog));
        })
        .catch(err=> res.status(404).json({noblog: 'No blog found'}));
    })
});


//@route Post api/blogs/comment/:blog_id
//@desc add a comment to a  blog
//@access private 


router.post('/comment/:blog_id', passport.authenticate('jwt', {session:false}), (req, res)=>{
    const {errors, isValid}=validateCommentInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    console.log(req.params.blog_id);
    Blog.findById(req.params.blog_id)
    .then(blog=>{
        if(!blog){
            errors.noblog='the blogs may be deleted or doesnt exist';
            res.status(404).json(errors)
        }

        const comment={};
        comment.name=req.user.name;
        comment.avatar=req.user.avatar,
        comment.text=req.body.text,
        comment.user=req.user.id;
        blog.comment.unshift(comment);
        blog.save().then(blog=> res.json(blog));
    }).catch(err=> res.status(404).json({noblog:'no blog found'}));
});


//@route Delete api/blogs/comment/:id/:blog_id
//@desc delete a comment from a blog
//@access private 


router.delete('/comment/:blog_id/:comment_id', passport.authenticate('jwt', {session:false}), (req, res)=>{

    Blog.findById(req.params.blog_id)
    .then(blog=>{
        if(blog.comment.filter(item=>item._id.toString()===req.params.comment_id).length===0){
            res.status(404).json({nocomment:'Comment not found'});
        }
        else
        {
            const indexToRemove=blog.comment.map(item=>item._id).indexOf(req.params.comment_id);

            blog.comment.splice(indexToRemove, 1);
            blog.save().then(blog=>res.json(blog));
        }
    }).catch(err=> res.status(404).json({noblog:'No blog by this id'}));
})










module.exports=router;