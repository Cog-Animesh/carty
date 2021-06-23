const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userAuth = async (req, res, next) => {
    console.log(req.body)
    let creds = req.body;
    let databaseObj = isUser(creds.role) ? req.app.get("userCollectionObj") : req.app.get("adminCollectionObj")
    let user = await databaseObj.findOne({ username: creds.username })
    if (user !== null) {
        let hPass = await bcrypt.compare(creds.password, user.password)
        if (hPass) {
            let token = await jwt.sign({ username: user.username }, 'abcdef', { expiresIn: 120 })
            delete user.password;
            res.locals.token = token;
            res.locals.user = user;
        } else {
            res.send({ message: "Invalid Credentials", status: "failure" })
        }

    }
    else {
        res.send({ message: "User not registered", status: "failure" })
    }
    next();
}

function isUser(role) {
    return role === 'user';
}

module.exports = userAuth;