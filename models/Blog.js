const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const BlogSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    section:[
       {
           heading:{
               type:String,
               required:true
           },
           text:{
               type:String,
               required:true
           }

       }

    ],
    name :{
        type:String
    },
    avatar:{
        type:String
    },
    creationDate:{
        type:Date,
        default:Date.now
    },
    likes:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'users'
            }
        }
    ],
    comment:[
        {
        name:{
            type:String
        },
        avatar:{
            type:String
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'users'
        },
        text:{
            type:String,
            required:true
        },
        commentdate:{
            type:Date,
            default:Date.now
        }

    }        
    ]
})


module.exports=mongoose.model('Blog', BlogSchema);


