// Data Aggregation with Node.js
/*
MongoDB can perform aggregation operations, such as grouping by a specified key and evaluating a total or
a count for each distinct group.
Use the aggregate method to perform a stage-based aggregation.
The aggregate method accepts as it argument an array of stages where each stage, processed sequentially,
describes a data processing step.
*/

// Define the following variables to access the required modules as well as to initialize url to the MongoBD uri:
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
