const connectDB = require('../config/db');

const saveUser = async(req, res)=>{
    try {
        const db = await connectDB();
        const user = req.body;
        const query = {email: user.email};
        const isExist = await db.collection('users').findOne(query);
        if(isExist){
           return res.send({message: 'user already exists', insertedId: null})
        }
        const result = await db.collection('users').insertOne(user);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save a user' });
    }
}

const getUsers = async(req, res)=>{
    try {
        const db = await connectDB();
        const result = await db.collection('users').find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

module.exports = {
    saveUser,
    getUsers
}