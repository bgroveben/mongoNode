var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

// Query for all documents in a collection
// To return all documents in a collection, call the find method without a criteria document.

// Define a findDocuments function as follows:
var findRestaurants = function(db, callback) {
  var cursor = db.collection('restaurants').find( );
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.dir(doc);
    } else {
      callback();
    }
  });
};

// Call the findDocuments function:
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findRestaurants(db, function() {
    db.close();
  });
});
// The result set contains all documents in the restaurants collection (all 25,000+ entries, mind you).
