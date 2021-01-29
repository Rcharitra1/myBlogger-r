const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports = function validateBlogInput(data){
    let errors={};

    data.heading=!isEmpty(data.heading)? data.heading:'';
    

    if(!Validator.isLength(data.heading, {min:1, max:150})){
        errors.heading='heading needs to be min of 1 words';
    }
    if(Validator.isEmpty(data.heading)){
        errors.heading='heading is a required field';
    }

   

   





    return{
        errors,
        isValid: isEmpty(errors)
    };
};