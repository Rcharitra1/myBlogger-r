const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors={};

    if(!Validator.isLength(data.name, {min:1, max: 50})){
        errors.name='Name must be in one and 50 characters ';
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}