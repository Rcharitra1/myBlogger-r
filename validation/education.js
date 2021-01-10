const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports = function validateEducationInput(data){
    let errors={};

    data.degree=!isEmpty(data.degree)? data.degree:'';
    data.institution=!isEmpty(data.institution)?data.institution:'';
    data.description=!isEmpty(data.description)?data.description:'';

  

    if(!Validator.isLength(data.degree, {min:2, max:50})){
        errors.degree='degree can be between 2 to 50 characters';
    }

    if(Validator.isEmpty(data.degree)){
        errors.degree='degee is a required field';
    }

    if(!Validator.isLength(data.institution, {min:2, max:50})){
        errors.institution='institution can be between 2 to 50 characters';
    }
    if(Validator.isEmpty(data.institution)){
        errors.institution='institution is required field';
    }

    if(!Validator.isLength(data.description, {min:1, max:75})){
        errors.description='institution can be between 1 to 75 characters';
    }




    if(Validator.isEmpty(data.description)){
        errors.description='description is a required field';
    }


    if(!isEmpty(data.finished)){
        if(!Validator.isDate(data.finished)){
            errors.finished='Date provided is in wrong format';
        }
    }







    return{
        errors,
        isValid: isEmpty(errors)
    };
};