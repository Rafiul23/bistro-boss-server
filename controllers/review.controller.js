const connectDB = require('../config/db');

const getReviewss = async(req, res)=>{
    try {
        const db = await connectDB();
        const result = await db.collection('reviews').find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
}

module.exports = {
    getReviewss
}