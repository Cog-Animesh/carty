const express = require('express');
const expressErrHandler = require('express-async-handler')
const adminApi = express.Router();
adminApi.use(express.json());

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const checkToken = require('./middleware/VerifyToken');
const userAuth = require('./middleware/UserAuth');

adminApi.post("/login",userAuth,expressErrHandler(async (req, res) => {
    res.send({ message: "Login Success", token: res.locals.token, status: "success", data: res.locals.user})

    // let databaseObj = req.app.get("adminCollectionObj")
    // let creds = req.body;
    // let user = await databaseObj.findOne({ username: creds.username })
    // if (user !== null) {
    //     if (creds.password === user.password) {
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


adminApi.get("/read",expressErrHandler( async (req, res, next) => {
    let databaseObj = req.app.get("userCollectionObj")
    let userList = await databaseObj.find().toArray();
    res.send(userList)
}))

adminApi.get("/read/:uid",expressErrHandler(async (req, res, next) => {
    let databaseObj = req.app.get("userCollectionObj")
    let uid = +req.params.uid
    let user = await databaseObj.findOne({ uid: uid });
    if (user === null) {
        res.send("user not exist")
    } else {
        res.send(user)
    }
}))







module.exports = adminApi;