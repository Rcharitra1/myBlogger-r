const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors={};

    data.name= !isEmpty(data.name)? data.name :'';
    data.email=!isEmpty(data.email)? data.email:'';
    data.password=!isEmpty(data.password)?data.password:'';
    data.password2=!isEmpty(data.password2)?data.password2:'';

    if(!Validator.isLength(data.name, {min:1, max: 50})){
        errors.name='Name must be in one and 50 characters ';
    }

    if(Validator.isEmpty(data.name)){
        errors.name='Name is a required field';
    }

    if(Validator.isEmpty(data.email)){
        errors.email='email is required field';
    }

    if(!Validator.isEmail(data.email)){
        errors.email='invalid email';
    }

    if(Validator.isEmpty(data.password)){
        errors.password='password is a required field';
    }

    if(!Validator.isLength(data.password, {min:6, max:30})){
        errors.password='password must be atleast 6 characters and maximum of 30 characters';
    }


    if(Validator.isEmpty(data.password2)){
        errors.password2='confirm password is a required field';
    }
    if(!Validator.equals(data.password, data.password2)){
        errors.password='the password and confrim password need to match';
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};