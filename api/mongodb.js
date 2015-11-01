var mongo = require("mongodb").MongoClient;

var db = {
    url: "mongodb://localhost:27017/shopping-list",
    insert: function (item, collection, callback) {
        mongo.connect(this.url, function(err, db) {
            db.collection(collection).insertOne(item, function (err2, result) {
                callback(result);
                db.close();
            });
        });
    },
    find: function (query, collection, callback) {
        mongo.connect(this.url, function(err, db) {
            var results = [];
            var searcher = db
                .collection(collection)
                .find(query)
                .each(function (err2, result) {
                    if (result != null) {
                        results.push(result);
                    }
                    else {
                        callback(results);
                        db.close();
                    }
                });
        });
    },
    findAll: function (collection, callback) {
        mongo.connect(this.url, function(err, db) {
            var results = [];
            var searcher = db
                .collection(collection)
                .find()
                .each(function (err2, result) {
                    if (result != null) {
                        results.push(result);
                    }
                    else {
                        callback(results);
                        db.close();
                    }
                });
        });
    },
    delete: function (query , collection, callback) {
        mongo.connect(this.url, function(err, db) {
            db.collection(collection).deleteOne(query, function (err2, result) {
                callback(result);
                db.close();
            });
        });
    }
};

module.exports = db;
