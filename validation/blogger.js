const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports = function validateBloggerInput(data){
    let errors={};


    data.handle=!isEmpty(data.handle)?data.handle:'';
    data.speciality=!isEmpty(data.speciality)? data.speciality:'';

    if(!Validator.isLength(data.handle, {min:2, max:40})){
        errors.handle='the handle can have min of 2 characters and maximum of 40 characters';
    }
    if(!Validator.isEmpty(data.handle)){
        errors.handle='the blogger handle is required';
    }

    if(!Validator.isEmpty(data.speciality)){
        errors.speciality='the blogger needs to have a speciality';
    }

    // if(!Validator.isEmpty(data.socialHandles.twitter)){
    //     if(!Validator.isURL(data.socialHandles.twitter)){
    //         errors.socialHandles='Not a valid handle';
    //     }
    // }

    // if(!Validator.isEmpty(data.socialHandles.facebook)){
    //     if(!Validator.isURL(data.socialHandles.facebook)){
    //         errors.socialHandles='Not a valid handle';
    //     }
    // }

    // if(!Validator.isEmpty(data.socialHandles.youtube)){
    //     if(!Validator.isURL(data.socialHandles.youtube)){
    //         errors.socialHandles='Not a valid handle';
    //     }
    // }
    return{
        errors,
        isValid: isEmpty(errors)
    };
};