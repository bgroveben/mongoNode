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


// Group documents by a Field and Calculate Count
/*
Use the $group stage to group by a specified key.
In the $group stage, specify the group by key in the _id field.
$group accesses fileds by the field path, which is the field name prefixed by a dollar sign $.
The $group stage can use accumulators to perform calculations for each group.
*/
// The following example groups the documents in the restaurant collection by the borough field and uses the $sum accumulator to count the documents for each group.
var aggregateRestaurants = function(db, callback) {
  db.collection('restaurants').aggregate(
    [
      { $group: { "_id": "$borough", "count": { $sum: 1 } } }
    ]
  ).toArray(function(err, result) {
    assert.equal(err, null);
    console.log(result);
    callback(result);
  });
};
// Call the aggregateRestaurants function:
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  aggregateRestaurants(db, function() {
    db.close();
  });
});
