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


// Greater Than Operator ($gt)
// Query for documents whose grades array contains an embedded document with a field score greater than 30:
var findRestaurants = function(db, callback) {
  var cursor = db.collection('restaurants').find( { "grades.score": { $gt: 30 } } );
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
    db.close();
  });
});


// Less Than Operator($lt)
// Query for documents whose grades array contains an embedded document with a field score less than 10:
var findRestaurants = function(db, callback) {
  var cursor = db.collection('restaurants').find( { "grades.score": { $lt: 10 } } );
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
    db.close();
  });
});


// Combine conditions in logical conjunctions (AND) and logical disjunctions(OR)
// Logical AND -- you can specify a logical conjunction for a list of query conditions by separating the conditions with a comma in the conditions document:
var findRestaurants = function(db, callback) {
  var cursor = db.collection('restaurants').find(
    { "cuisine": "Italian", "address.zipcode": "10075" }
  );
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
    db.close();
  });
});


// Logical OR -- you can specify a logical disjunction (OR) for a list of query conditions by using the $or query operator:
var findRestaurants = function(db, callback) {
  var cursor = db.collection('restaurants').find(
    { $or: [ { "cuisine": "Italian" }, {"address.zipcode": "10075" } ] }
  );
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.dir(doc);
    } else {
      callback();
    }
  });
};


// Sort Query Results
/*
To specify an order for the result set, append the sort() method to the query.
Pass to the sort() method a document which contains the field(s) to sort by and the corresponding
sort type, e.g. 1 for ascending and -1 for descending.
*/
/*
Define a findRestaurants function to retreive all documents in the restaurants collection,
sorted first by the borough field in ascending order, and then, within each borough,
by the "address.zipcode" field in ascendding order.
*/
var findRestaurants = function(db, callback) {
  var cursor = db.collection('restaurants').find().sort( { "borough": 1, "address.zipcode": 1 } );
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
    db.close();
  });
});
