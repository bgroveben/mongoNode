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


// Query by a top Level Field
// The following operation finds documents whose borough field equals "Manhattan":

// Define a findRestaurants function:
var findRestaurants = function(db, callback) {
  var cursor = db.collection('restaurants').find( { "borough": "Manhattan" } );
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.dir(doc);
    } else {
      callback();
    }
  });
};

// Call the findRestaurants function:
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findRestaurants(db, function() {
    db.close();
  });
});

// Query by a field in an Embedded Document:
// The following operation specifies an equality condition on the zipcode field in the address embedded document:
var findRestaurants = function(db, callback) {
  var cursor = db.collection('restaurants').find( { "address.zipcode": "10075" } );
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.dir(doc);
    } else {
      callback();
    }
  });
};

// Call the findRestaurants function:
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findRestaurants(db, function() {
    db.close();
  });
});


// Query by a Field in an Array
// The following queries for documents whose grades array contains an embedded document with a field grade equal to "B".
var findRestaurants = function(db, callback) {
  var cursor = db.collection('restaurants').find( { "grades.grade": "B" } );
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.dir(doc);
    } else {
      callback();
    }
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findRestaurants(db, function() {
    db.close()
  });
});
