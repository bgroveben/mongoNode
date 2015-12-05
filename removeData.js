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


// Remove all documents that match a condition:
// The following operation removes all documents that match the specified condition -- GOT IT?
var removeRestaurants = function(db, callback) {
  db.collection('restaurants').deleteMany(
    { "borough": "Manhattan" },
    function(err, results) {
      console.log(results);
      callback();
    }
  );
};
// Call the removeRestaurants function:
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  removeRestaurants(db, function() {
    db.close();
  });
});


// Remove just one document.
/*
By default, the deleteOne method removes all documents that match the remove condition.
Use the justOne option to limit the remove operation to only one of the matching documents.
The above statements are kind of confusing -- there is no justOne option in the docs or in the code below,
and when the code runs, it removes only one element...WTF?
*/
var removeRestaurants = function(db, callback) {
  db.collection('restaurants').deleteOne(
    { "borough": "Queens" },
    function(err, results) {
      console.log(results);
      callback();
    }
  );
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  removeRestaurants(db, function() {
    db.close();
  });
});


// Remove All Documents
// To remove all of the documents from a collection, pass an empty conditions document {} to the deleteMany method:
var removeRestaurants = function(db, callback) {
   db.collection('restaurants').deleteMany( {}, function(err, results) {
      console.log(results);
      callback();
   });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  removeRestaurants(db, function() {
    db.close();
  });
});
