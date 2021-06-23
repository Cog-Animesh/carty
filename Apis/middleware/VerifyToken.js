const jwt = require('jsonwebtoken')
const checkToken=(req,res,next)=>{
    try{
    let token = req.headers.authorization.split(" ")[1];
    console.log(jwt.verify(token,'abcdef'))
    next()
    }
    catch(err){
        res.send({message:err})
    }
}

module.exports = checkToken;