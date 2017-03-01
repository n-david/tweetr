"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    likeTweet: function(likedInfo) {
      if (likedInfo.liked === 'true') {
        db.collection("tweets").update( {"user.name": likedInfo.name}, {$inc: {"user.likes": 1}} );
      } else {
        db.collection("tweets").update( {"user.name": likedInfo.name}, {$inc: {"user.likes": -1}} );
      }
    },

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    }

  };
};
