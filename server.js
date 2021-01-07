
const express=require('express');


const mongoose=require('mongoose');

const bodyParser=require('body-parser');



const users=require('./routes/api/users');



const profile=require('./routes/api/profile');


const blogs=require('./routes/api/blogs');



const app=express();


//body parser middleware

app.use(bodyParser.urlencoded({excluded:false}));
app.use(bodyParser.json());

//DB config


const db=require('./config/keys.js').mongoURI;


//connect to mongodb


mongoose.connect(db)
.then(()=> console.log('MongoDb connected'))
.catch(err=> console.log(err));


app.get('/', (req, res)=>res.send("hello"));


//user routes 









app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/blogs', blogs);


const port=process.env.PORT || 5000;


app.listen(port, ()=> console.log(`Server on ${port}`));

