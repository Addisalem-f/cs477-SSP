const User = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = 'cs477-bookStore'

exports.login = (req, res, next) => {
    const user = new User(req.body.username, req.body.password, null).login()
    if (user) {
        //generate token,send back
        const jwtToken = jwt.sign({ username: user.username, role: user.role }, secret)

        res.json({ jwtToken })

    } else {
        res.json({ 'error': 'Invalid username or password' })
    }
}

exports.authorize = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const jwtToken = authHeader.split(' ')[1]
        console.log(jwtToken)
        console.log(authHeader)
        jwt.verify(jwtToken, secret, (error, user) => {

            if (error) {
                return res.status(403).json({ "errror": "Forbidden" })
            }
            req.user = user
            // console.log(user)
            next()
        });
    } else {
        res.status(401).json({ error: "unauthorized" })
    }
}

exports.AuthorizationAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next()
    }
    res.status(403).json({ error: "Forbidden" })
}