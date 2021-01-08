
const express=require('express');

const mongoose=require('mongoose');

const bodyParser=require('body-parser');


const passport=require('passport');

const users=require('./routes/api/users');



const blogger=require('./routes/api/blogger');


const blogs=require('./routes/api/blogs');



const app=express();


//body parser middleware

app.use(bodyParser.urlencoded({excluded:false}));
app.use(bodyParser.json());




//DB config


const db=require('./config/keys.js').mongoURI;
const { param } = require('./routes/api/users');


//connect to mongodb


mongoose.connect(db)
.then(()=> console.log('MongoDb connected'))
.catch(err=> console.log(err));


//passport middleware

app.use(passport.initialize());

//passport config 
require('./config/passport')(passport);

//user routes 

app.use('/api/users', users);
app.use('/api/blogger', blogger);
app.use('/api/blogs', blogs);



const port=process.env.PORT || 5000;


app.listen(port, ()=> console.log(`Server on ${port}`));

