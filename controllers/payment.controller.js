const connectDB = require('../config/db');
const { ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_PAYMENT_SECRET_KEY);

const postPayment = async(req, res)=>{
    const {price} = req.body;
    const amount = parseInt(price * 100);
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card']
    })
    res.send({
        clientSecret: paymentIntent.client_secret
    })
};

const savePayment = async(req, res)=>{
    try {
        const db = await connectDB();
        const payment = req.body;
        const paymentResult = await db.collection('payments').insertOne(payment);
        const query = {_id: {
            $in: payment.cartId.map(id => new ObjectId(id))
        }};
        console.log(query);
        console.log(payment);
        const deleteResult = await db.collection('carts').deleteMany(query);
        res.send({paymentResult, deleteResult});
    } catch (error) {
        res.status(500).json({ error: 'Failed to save payment info' });
    }
}

const getPaymentHistory = async(req, res)=>{
    try {
        const db = await connectDB();
        const email = req.params.email;
        if(email !== req.user.email){
          return res.status(403).send({message: 'Forbidden Access'});
        }
        const query = {email: email};
        const result = await db.collection('payments').find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch payment info' }); 
    }
}

module.exports = {
    postPayment,
    savePayment,
    getPaymentHistory
}