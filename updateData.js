// Update Data with Node.js
/*
You can use the updateOne method, updateMany method, and replaceOne method to update documents of a collection.
The methods accept the following parameters:
-- a filter document to match the documents to update,
-- an update document to specify the modifications to perform, and
-- an (optional, of course) options parameter.
###! You cannot update the _id field !###
*/

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';


// Update Specific Fields
