const express = require('express');
const expressErrHandler = require('express-async-handler')
const productApi = express.Router();
productApi.use(express.json());

const checkToken = require('./middleware/VerifyToken');
const multerObj = require('./middleware/CloudinaryStore')

productApi.post("/create",multerObj.single('photo'),expressErrHandler(async (req, res, next) => {
    let databaseObj = req.app.get("productCollectionObj")
    let newProduct = JSON.parse(req.body.product);
    let product = await databaseObj.findOne({ name: newProduct.name });
    if (product === null) {
        newProduct.image=req.file.path
        let us = await databaseObj.insertOne(newProduct);
        res.send(us === null ? { message: "some error" } : { message: "Product created" })
    }
    else {
        res.send({ message: "Product Exist" })
    }
}))

productApi.get("/read",expressErrHandler( async (req, res, next) => {
    let databaseObj = req.app.get("productCollectionObj")
    let productList = await databaseObj.find().toArray();
    res.send(productList)
}))

productApi.get("/read/:uid",expressErrHandler(async (req, res, next) => {
    let databaseObj = req.app.get("productCollectionObj")
    let uid = +req.params.uid
    let user = await databaseObj.findOne({ uid: uid });
    if (user === null) {
        res.send("user not exist")
    } else {
        res.send(user)
    }
}))

productApi.put("/update",expressErrHandler(async (req, res, next) => {
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


productApi.delete("/delete/:pid",expressErrHandler(async (req,res)=>{
    let databaseObj = req.app.get("productCollectionObj")
    let pid = +req.params.pid;
    let product = await databaseObj.collection("productcollection").deleteOne({ pid: pid })
    if (product.deletedCount === 1) {
        res.send({ message: "Product Deleted" })
    } else {
        res.send({ message: "Not exist" })
    }
}))


module.exports = productApi;