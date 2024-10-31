const jwt = require('jsonwebtoken');
const connectDB = require('./config/db'); 

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

const verifyAdmin = async(req, res, next)=>{
    const email = req.user.email;
    const query = {email: email};
    const db = await connectDB();
    const user = await db.collection('users').findOne(query);
    if(user?.role === 'admin'){
        next();
    } else {
        return res.status(403).send({message: 'forbidden access'});
    }
}

module.exports = {
    verifyToken,
    verifyAdmin
}