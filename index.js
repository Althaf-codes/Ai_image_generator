const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT||8080;
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));


app.use('/openai',require('./routes/openai_routes'));

app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})