// NodeJS Driver
// Declare MongoClient variable and other variables

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

//  Connect using the MongoClient to a running mongod instance by specifying the MongoDB uri.
//  The following code connects to a MongoDB instance that runs on the localhost interface
//  on port 27017 and switches to the test database.

var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});
