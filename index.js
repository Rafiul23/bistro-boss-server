const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;



app.get('/', (req, res)=>{
    res.send('Boss is running');
})

app.listen(port, ()=>{
    console.log(`app is running on port: ${port}`);
})
