const connectDB = require('../config/db');

const getMenuItems = async(req, res)=>{
    try {
        const db = await connectDB();
        const result = await db.collection('menu').find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
}

module.exports = {
    getMenuItems
}