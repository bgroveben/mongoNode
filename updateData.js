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
/*
To change a field value, MongoDB provides update operators, such as $set to modify values.
Some update operators, such as $set, will create the field if the field does not already exist.
*/
// Update Top-Level Fields
/*
The following operation updates the first document with name equal to "Juni", using the $set operator
to update the cuisine field and the $currentDate operator to update the lastModified field with
the current date.
Define an updateRestaurants function as follows:
*/
var updateRestaurants = function(db, callback) {
  db.collection('restaurants').updateOne(
    { "name" : "Juni" },
    {
      $set: { "cuisine" : "American (New)" },
      $currentDate: { "lastModified" : true }
    }, function(err, results) {
      console.log(results);
      callback();
    });
};
// Then call the updateRestaurants function:
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  updateRestaurants(db, function() {
    db.close();
  });
});


// Update an Embedded Field
// The following updates the street field in the embedded address document:
var updateRestaurants = function(db, callback) {
  db.collection('restaurants').updateOne(
    { "restaurant_id" : "41156888" },
    { $set: { "address.street" : "East 31st Street" } },
    function(err, results) {
      console.log(results);
      callback();
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  updateRestaurants(db, function() {
    db.close();
  });
});
