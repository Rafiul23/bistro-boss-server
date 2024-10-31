const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(401).send({message: 'unauthorized access'});
    }
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).send({message: 'unauthorized access'});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).send({message: 'unauthorized access'});
        } else {
            req.user = decoded;
            next();
        }
    })
    
}

module.exports = {
    verifyToken
}