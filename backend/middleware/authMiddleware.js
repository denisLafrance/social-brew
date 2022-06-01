import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

const authUser = asyncHandler(async(req, res, next) => {

    let token = req.header('isAuthenticated');

    if(!token) {
        res.status(400)
        throw new Error("Authentication failed, user is not authorized")
    }

    //verify the token
    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user
        next()

    } catch(err) {
        res.status(401).send({msg: "token is not validated"})
    }
})

const adminAuthenticated = asyncHandler(async(req, res, next) => {
    if(req.user.isAdmin === true) {
        next()
    } else {
        res.status(401)
        throw new Error("Authentication Failed!! You do not have admin privilidges")
    }
})

export {
    authUser,
    adminAuthenticated
}