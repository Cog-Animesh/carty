const express = require('express');
const expressErrHandler = require('express-async-handler')
const userApi = express.Router();
userApi.use(express.json());

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')





const { JsonWebTokenError } = require('jsonwebtoken');
const checkToken = require('./middleware/VerifyToken');
const userAuth = require('./middleware/UserAuth');
const multerObj = require('./middleware/CloudinaryStore')

userApi.post("/login",userAuth,expressErrHandler(async (req, res) => {
    
    console.log("reeeqq - ",req)
    console.log("req  body - ",req.body)
    console.log("ress - ",res.locals.token)
    console.log("ress - ",res.locals.user)

    res.send({ message: "Login Success", token: res.locals.token, status: "success", data: res.locals.user})

    // let databaseObj = req.app.get("userCollectionObj")
    // let creds = req.body;
    // let user = await databaseObj.findOne({ username: creds.username })
    // if (user !== null) {
    //     let hPass = await bcrypt.compare(creds.password, user.password)
    //     if (hPass) {
    //         let token = await jwt.sign({ name: user.name }, 'abcdef', { expiresIn: 120 })
    //         delete user.password;
    //         res.send({ message: "Login Success", token: token,status:"success",data:user})
    //     } else {
    //         res.send({message:"Invalid Credentials",status:"failure"})
    //     }

    // }
    // else {
    //     res.send({message:"User not registered",status:"failure"})
    // }
}))

userApi.post("/create",multerObj.single('photo'),expressErrHandler(async (req, res, next) => {
    let databaseObj = req.app.get("userCollectionObj")
    let newUser = JSON.parse(req.body.user);
    let user = await databaseObj.findOne({ username: newUser.username });
    if (user === null) {
        let hPass = await bcrypt.hash(newUser.password, 7)
        newUser.password = hPass;
        newUser.image=req.file.path
        let us = await databaseObj.insertOne(newUser);
        res.send(us === null ? { message: "some error" } : { message: "User created" })
    }
    else {
        res.send({ message: "User Exist" })
    }
}))

userApi.get("/read",expressErrHandler( async (req, res, next) => {
    let databaseObj = req.app.get("userCollectionObj")
    let userList = await databaseObj.find().toArray();
    res.send(userList)
}))

userApi.get("/read/:uid",expressErrHandler(async (req, res, next) => {
    let databaseObj = req.app.get("userCollectionObj")
    let uid = +req.params.uid
    let user = await databaseObj.findOne({ uid: uid });
    if (user === null) {
        res.send("user not exist")
    } else {
        res.send(user)
    }
}))

userApi.put("/update",expressErrHandler(async (req, res, next) => {
    let databaseObj = req.app.get("userCollectionObj")
    let mUser = req.body;
    let user = databaseObj.updateOne({ uid: mUser.uid }, { $set: { ...mUser } });
    if (user.modifiedCount === 0) {
        res.send({ message: "User not exists" })
    }
    else {
        res.send({ message: "User updated" })
    }
}))

userApi.delete("/delete/:pid",expressErrHandler( async (req, res, next) => {
    let databaseObj = req.app.get("userCollectionObj")
    let uid = +req.params.pid;
    let user = await databaseObj.deleteOne({ uid: uid })
    if (user.deletedCount === 1) {
        res.send({ message: "User Deleted" })
    } else {
        res.send({ message: "Not exist" })
    }

}))

userApi.get("/testt",checkToken,expressErrHandler((req,res)=>{
        res.send({message:"protected data"})
}))



module.exports = userApi;