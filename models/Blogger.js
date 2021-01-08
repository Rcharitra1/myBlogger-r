const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//create a blogger schema
const BloggerSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    handle:{
        type:String,
        required:true,
        max:50
    },
    organization:{
        type:String
    },
    location: {
        type:String,

    },
    socialHandles:{
        youtube:{
            type:String,
        },
        facebook:{
            type:String,
        },
        twitter:{
            type:String
        }
    },
    speciality:{
        type:[String],
        required:true
    },
    bio:{
        type:String
    },
    experience:[
        {
            title:{
                type:String,
                required:true
            },
            company:{
                type:String
            },
            location:{
                type:String
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false

            },
            description:{
                type:String
            }
        }

    ],
    education:[
        {
            institution:{
                type:String,
                required:true
            },
            degree:{
                type:String,
                required:true
            },
            description:{
                type:String,
                required:true
            },
            finished:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false
            }

        }
    ],
    joiningdate:{
        type:Date,
        default:Date.now
    }
    
});


module.exports=mongoose.model('blogger', BloggerSchema);