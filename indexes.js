// Indexes can support the efficient execution of queries.
// MongoDB automatically creates an index on the _id field upon the creation of a collection.
/*
Ue the createIndex method to create an index on a collection.
Indexes can support the efficient execution of queries.
To create an index on a field or fields, pass to the createIndex method an index key specification document that lists the fields to index and the index type for each field: { <field1>: <type1>, ... }
For an ascending index type, specify 1 for <type>.
For a descending index type, specify -1 for <type>.
createIndex only creates an index if the index does not exist.
*/

// Define the following variables to access the required modules and initialize url to the MongoDB uri.
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';


// Create a Single-Field Index
// Create an ascending index on the "cuisine" field of the restaurants collection.
var indexRestaurants = function(db, callback) {
  db.collection('restaurants').createIndex(
    { "cuisine": 1 },
    null,
    function(err, results) {
      console.log(results);
      callback();
    }
  );
};
// Call the indexRestaurants function:
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  indexRestaurants(db, function() {
    db.close();
  });
});
// The method returns the name of the created index cuisine_1.


// Create a compound index.
/*
MongoDB supports compound indexes which are indexes on multiple field.
The order of the fields determine how the index stores its keys.
For example, the following operation creates a compound index on the "cuisine" field and the "address.zipcode" field.
The index orders its entries first by ascending "cuisine" values, and then, within each "cuisine",
by descending "address.zipcode" values.
*/
var indexRestaurants = function(db, callback) {
  db.collection('restaurants').createIndex(
    { "cuisine": 1, "address.zipcode": -1 },
    null,
    function(err, results) {
      console.log(results);
      callback();
    }
  );
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  indexRestaurants(db, function() {
    db.close();
  });
});
