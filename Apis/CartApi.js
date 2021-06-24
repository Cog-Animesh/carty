const express = require('express');
const expressErrHandler = require('express-async-handler')
const cartApi = express.Router();
cartApi.use(express.json());

const checkToken = require('./middleware/VerifyToken');

cartApi.post("/add",expressErrHandler(async (req, res, next) => {
    let databaseObj = req.app.get("cartCollectionObj")
    console.log(req.body)
    console.log(req.body.products)
    let newProduct = req.body.products;
    let uName = await databaseObj.findOne({ username: req.body.username});
    if (uName === null) {
        let pr = await databaseObj.insertOne(req.body);
        res.send(pr === null ? { message: "some error" } : { message: "Item added to Cart",status:'success',data:req.body })
    }
    else {
       let prs = await databaseObj.updateOne({username:uName},{$set:{products:newProduct}});
        res.send({ message: "cart item updated" })
    }
}))

cartApi.get("/read",expressErrHandler( async (req, res, next) => {
    let databaseObj = req.app.get("productCollectionObj")
    let productList = await databaseObj.find().toArray();
    res.send(productList)
}))

cartApi.get("/read/:uid",expressErrHandler(async (req, res, next) => {
    let databaseObj = req.app.get("productCollectionObj")
    let uid = +req.params.uid
    let user = await databaseObj.findOne({ uid: uid });
    if (user === null) {
        res.send("user not exist")
    } else {
        res.send(user)
    }
}))

cartApi.put("/update",expressErrHandler(async (req, res, next) => {
    let databaseObj = req.app.get("productCollectionObj")
    let mUser = req.body;
    let user = databaseObj.updateOne({ uid: mUser.uid }, { $set: { ...mUser } });
    if (user.modifiedCount === 0) {
        res.send({ message: "User not exists" })
    }
    else {
        res.send({ message: "User updated" })
    }
}))


cartApi.delete("/delete/:pid",expressErrHandler(async (req,res)=>{
    let databaseObj = req.app.get("productCollectionObj")
    let pid = +req.params.pid;
    let product = await databaseObj.collection("productcollection").deleteOne({ pid: pid })
    if (product.deletedCount === 1) {
        res.send({ message: "Product Deleted" })
    } else {
        res.send({ message: "Not exist" })
    }
}))


module.exports = cartApi;