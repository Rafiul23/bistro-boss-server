const { ObjectId } = require('mongodb');
const connectDB = require('../config/db');

const getMenuItems = async(req, res)=>{
    try {
        const db = await connectDB();
        const result = await db.collection('menu').find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch menu' });
    }
}

const addToCart = async(req, res)=>{
    try {
        const db = await connectDB();
        const cartItem = req.body;
        const result = await db.collection('carts').insertOne(cartItem);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add to cart' });
    }
}

const getCartItems = async(req, res)=>{
    try {
        const db = await connectDB();
        let query = {};
        if(req?.query?.email){
            query = {
                email: req.query.email
            }
        }
        const result = await db.collection('carts').find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load cart items' });
    }
}

const deletCartItems = async(req, res)=>{
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await db.collection('carts').deleteOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load cart items' });
    }
}

module.exports = {
    getMenuItems,
    addToCart,
    getCartItems,
    deletCartItems
}