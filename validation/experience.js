const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports = function validateExperienceInput(data){
    let errors={};

    data.title=!isEmpty(data.title)? data.title:'';
    data.company=!isEmpty(data.company)?data.company:'';
    data.from=!isEmpty(data.from)?data.from:'';

  

    if(!Validator.isLength(data.title, {min:2, max:50})){
        errors.title='Title can be between 2 to 50 characters';
    }

    if(Validator.isEmpty(data.title)){
        errors.title='title is a required field';
    }

    if(!Validator.isLength(data.company, {min:2, max:50})){
        errors.title='company can be between 2 to 50 characters';
    }
    if(Validator.isEmpty(data.company)){
        errors.company='company is required field';
    }

    if(Validator.isEmpty(data.from)){
        errors.from='From date is required field'
    }

    if(!isEmpty(data.from)){
        if(!Validator.isDate(data.from)){
            errors.from='Pls provide correct date format';
        }
    }
    

    if(!isEmpty(data.to)){
        if(!Validator.isDate(data.to)){
            errors.to='Pls provide a to date in correct format';
        }
    }


    // if(!(isEmpty(data.from) && isEmpty(data.to))){
    //     if(Validator.isDate(data.from) && (Validator.isDate(data.to))){
    //         let d1= new Date.parse(date.from);
    //         let d2=new Date.parse(date.to);

    //         if(d1> d2){
    //             errors.daye='To date cannot be sooner than from date';
    //         }
    //     }
    // }





    return{
        errors,
        isValid: isEmpty(errors)
    };
};