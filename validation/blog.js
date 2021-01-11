const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors={};

    data.heading=!isEmpty(data.heading)? data.heading:'';
    data.text=!isEmpty(data.text)? data.text:'';

    if(!Validator.isLength(data.heading, {min:1, max:150})){
        errors.heading='heading accepts characters between 1 and 150';
    }

    if(!Validator.isLength(data.text, {min:1, max:2000})){
        errors.text='text needs to be min of 1 words';
    }


    if(Validator.isEmpty(data.heading)){
        errors.heading='heading is a required field';
    }

    if(Validator.isEmpty(data.text)){
        errors.text='text is required field';
    }


   








    return{
        errors,
        isValid: isEmpty(errors)
    };
};