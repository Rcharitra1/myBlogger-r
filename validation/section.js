const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports = function validateSectionInput(data){
    let errors={};

    data.subHeading=!isEmpty(data.subHeading)? data.subHeading:'';

    data.text= !isEmpty(data.text)? data.text:'';

    if(!Validator.isLength(data.text, {min:1, max:2000})){
        errors.text='text needs to be min of 1 words';
    }


    if(Validator.isEmpty(data.subHeading)){
        errors.subHeading='SubHeading is a required field';
    }

    if(Validator.isEmpty(data.text)){
        errors.text='text is required field';
    }
   

   





    return{
        errors,
        isValid: isEmpty(errors)
    };
};