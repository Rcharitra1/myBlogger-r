const { mongo } = require("mongoose")

module.exports={
    mongoURI:"mongodb+srv://rcharitra1:1234@cluster0.t0wcg.mongodb.net/mBlogger?retryWrites=true&w=majority",
    secretOrKey:'secret'
    
}



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://<username>:<password>@cluster0.t0wcg.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
