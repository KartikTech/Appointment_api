const express = require('express');
const parser = require('body-parser');
const mongodb = require('./config/mongodb');
const routes = require('./routes/api_doctors')
const cors = require('cors');
require('dotenv').config();

mongodb.connect();

const server = express();
server.use(cors());
server.listen(process.env.PORT || 3200);

server.use(parser.json());

server.use("/api/doctor",routes)

server.get("/",(req,res)=>{
    res.send("Hello from Express server.");
});

console.log("server is running on port 3200");