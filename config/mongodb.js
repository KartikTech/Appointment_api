const mongodb = require('mongodb');
require('dotenv').config();

const url = process.env.DATABASE;

const mongodbClient = mongodb.MongoClient;

var connectedClient;

exports.connect = ()=>{
    mongodbClient.connect(url)
        .then((client)=>{
            connectedClient=client;
            console.log("DB Connected..");
        })
        .catch(err=>{console.log(err)});
}

exports.getCollection = (nameOfCollection)=>{
    return connectedClient.db('restaurantDB').collection(nameOfCollection);
}