const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")
const asyncHandler = require("express-async-handler");


const verifyUser = asyncHandler( async (req , res , next) => {
    let token ;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded =  jwt.verify(token , process.env.JWT_SECRET )
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }catch (error) {
            res.status(401);
            throw new Error('User not authenticated. token failed');
        }
        if (!token) {
            res.status(401);
            throw new Error('User not authenticated, no token');
        }
    }
});

module.exports = { verifyUser };