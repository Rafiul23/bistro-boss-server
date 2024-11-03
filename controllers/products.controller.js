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

const postRecipe = async(req, res)=>{
    try {
        const db = await connectDB();
        const recipe = req.body;
        const result = await db.collection('menu').insertOne(recipe);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to post a recipe' });
    }
};

const deleteRecipe = async(req, res)=>{
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await db.collection('menu').deleteOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to post a recipe' });
    }
};

const getSingleMenuItem = async(req, res)=>{
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await db.collection('menu').findOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch a recipe' });
    }
}

const updateMenuItem = async(req, res)=>{
    try {
        const db = await connectDB();
        const id = req.params.id;
        const updatedMenu = req.body;
        const filter = {_id: new ObjectId(id)};
        const updatedDoc = {
            $set: {
                name: updatedMenu.name,
                category: updatedMenu.category,
                price: updatedMenu.price,
                recipe: updatedMenu.recipe,
                image: updatedMenu.image
            }
        };
        const result = await db.collection('menu').updateOne(filter, updatedDoc);
        res.send(result);

    } catch (error) {
        res.status(500).json({ error: 'Failed to update a recipe' });
    }
};

const getStatsInfo = async(req, res)=>{
    try {
        const db = await connectDB();
        const users = await db.collection('users').estimatedDocumentCount();
        const menuItems = await db.collection('menu').estimatedDocumentCount();
        const orders = await db.collection('payments').estimatedDocumentCount();
        // const payments = await db.collection('payments').find().toArray();
        // const revenue = payments.reduce((sum, item)=> sum + item.price, 0);

        const result = await db.collection('payments').aggregate([
            {
                $group: {
                    _id: null,
                    revenue: { $sum: '$price'}
                }
            }
        ]).toArray();

        const revenue = result.length > 0 ? result[0].revenue : 0;

        res.send({users, menuItems, orders, revenue})
    } catch (error) {
        res.status(500).json({ error: 'Failed to get stats data' });
    }
}

module.exports = {
    getMenuItems,
    addToCart,
    getCartItems,
    deletCartItems,
    postRecipe,
    deleteRecipe,
    getSingleMenuItem,
    updateMenuItem,
    getStatsInfo
}