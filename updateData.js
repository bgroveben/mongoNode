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


// Update Multiple Documents
/* The following operation updates all documents that have the address.zipcode field equal to "10016" and the cuisine field equal to "Other", setting the cuisine field to "Category To Be Determined" and the lastModified field to the current date:
*/
var updateRestaurants = function(db, callback) {
  db.collection('restaurants').updateMany(
    { "address.zipcode": "10016", cuisine: "Other" },
    {
      $set: { cuisine: "Category To Be Determined"},
      $currentDate: { "lastModified": true }
    }
    ,
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


// Replace a Document
/* To replace the entire document except for the _id field, pass an entirely new document as the second argument to the replaceOne method.
The replacement document can have different fields from the original document.
In the replacement document, you can omit the _id field since the _id field is immutable.
If you do include the _id field, it must be the same value as the existing value.
*/
/****** After the update, the document only contains the field or fields in the replacement document. ******/
// After the following update, the modified document will only contain the _id filed, name field, and the address field.
// The document will NOT contain the restaurant_id, cuisine, grades, and the borough fields.
var updateRestaurants = function(db, callback) {
  db.collection('restaurants').replaceOne(
    { "restaurant_id" : "41704620" },
    {
      "name": "Vella 2",
      "address": {
        "coord" : [ -73.9557413, 40.7720266 ],
        "building" : "1480",
        "street" : "2 Avenue",
        "zipcode": "10075"
      }
    },
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
// If no document matches the update condition, the default behavior of the update method is to do nothing.
// By specifying the upsert option to true, the update operation either updates matching document(s) of inserts a new document if no matching document exists.
