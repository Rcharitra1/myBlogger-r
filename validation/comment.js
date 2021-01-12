const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports = function validateCommentInput(data){
    let errors={};

    data.text=!isEmpty(data.text)? data.text:'';
    if(!Validator.isLength(data.text, {min:1, max:100})){
        errors.text='Comment needs to between 1 and 100 characters';
    }

    if(Validator.isEmpty(data.text)){
        errors.text='Comment text is a required field';
    }





    return{
        errors,
        isValid: isEmpty(errors)
    };
};