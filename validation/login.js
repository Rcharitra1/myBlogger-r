const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors={};

    data.email=!isEmpty(data.email)? data.email:'';
    data.password=!isEmpty(data.password)?data.password:'';

  

    if(!Validator.isEmail(data.email)){
        errors.email='invalid email';
    }

    if(Validator.isEmpty(data.password)){
        errors.password='password is a required field';
    }

    if(Validator.isEmpty(data.email)){
        errors.email='email is required field';
    }





    return{
        errors,
        isValid: isEmpty(errors)
    };
};