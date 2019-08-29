const jwt = require('jsonwebtoken');
const keys = require('./keys');

module.exports = function(req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(200).send('Access Denied');
    try{
        const verified = jwt.verify(token,keys.secretKey);
        req.user = verified;
        next();
    }catch(err){
        return res.status(200).send("Invalid Token");
    }
}
