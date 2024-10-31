const { ObjectId } = require("mongodb");
const connectDB = require("../config/db");
const jwt = require("jsonwebtoken");

const saveUser = async (req, res) => {
  try {
    const db = await connectDB();
    const user = req.body;
    const query = { email: user.email };
    const isExist = await db.collection("users").findOne(query);
    if (isExist) {
      return res.send({ message: "user already exists", insertedId: null });
    }
    const result = await db.collection("users").insertOne(user);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to save a user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection("users").find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const db = await connectDB();
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await db.collection("users").deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

const makeAdmin = async (req, res) => {
  try {
    const db = await connectDB();
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updatedRole = {
      $set: {
        role: "admin",
      },
    };
    const result = await db
      .collection("users")
      .updateOne(filter, updatedRole, options);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

const postJWT = async (req, res) => {
  try {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "6h",
    });
    res.send({token});
  } catch (error) {
    res.status(500).json({ error: "Failed to post jwt" });
  }
};

const isAdmin = async(req, res)=>{
    try {
        const db = await connectDB();
        const email = req.params.email;
        if(email !== req.user.email){
            return res.status(403).send({message: 'forbidden access'});
        } 
        const query = {email: email};
        const user = await db.collection('users').findOne(query);
        let admin = false;
        if(user){
            admin = user?.role === 'admin';
            res.send({admin});
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to load admin" });
    }
}

module.exports = {
  saveUser,
  getUsers,
  deleteUser,
  makeAdmin,
  postJWT,
  isAdmin
};
