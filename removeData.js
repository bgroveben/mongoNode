// Remove Data with Node.js
/*
You can use the deleteOne method and the deleteMany method to remove documents from a collection.
The method takes a conditions document that determines the documents to remove.
To specify a remove condition, use the same structure and syntax as the query conditions.
*/
// Define the following variable to access the required modules as well as to initialize url to the MongoDB uri:
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
