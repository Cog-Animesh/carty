const express = require('express');
const app = express();
const port = 8081;
const path = require('path')

const userApi = require("./Apis/UserApi");
const productApi = require("./Apis/ProductApi");
const adminApi = require('./Apis/AdminApi');

app.use(express.static(path.join(__dirname,'./build/')))
app.use('/user',userApi);
app.use('/product',productApi);
app.use('/admin',adminApi);

const mongoClient = require('mongodb').MongoClient;
const dbUrl = "mongodb+srv://ani:ani@Mongo@cluster0.kjvvk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let databaseObj;


mongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
      console.log("error")
  }
  else {
      databaseObj = client.db("cbd03");
      let usercollectionObj = databaseObj.collection('usercollection');
      let productcollectionObj = databaseObj.collection('productcollection');
      let admincollectionObj = databaseObj.collection('admincollection');
      let cartcollectionObj = databaseObj.collection('cartcollection');

      app.set("userCollectionObj",usercollectionObj);
      app.set('productCollectionObj',productcollectionObj);
      app.set("adminCollectionObj",admincollectionObj);
      app.set("cartCollectionObj",cartcollectionObj);

      console.log("Connection created")

  }
})


app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is invalid`})
})

app.use((err,req,res,next)=>{
    console.log(err);
    res.send({message:err.message})
})
//app.use("/product",productApi);


app.listen(port,()=>{console.log("listening on 8081")})