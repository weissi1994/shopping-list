var mongo = require("mongodb").MongoClient;

var db = {
    url: "mongodb://192.168.122.231:27017/shopping-list",
    insert: function (item, collection, callback) {
        mongo.connect(this.url, function(err, db) {
            if (err) throw err;
            db.collection(collection).insertOne(item, function (err2, result) {
                if (err2) throw err2;
                callback(result);
                db.close();
            });
        });
    },
    find: function (search, collection, callback) {
        mongo.connect(this.url, function(err, db) {
            if (err) throw err;
            var results = [];
            var searcher = db
                .collection(collection)
                .find(search)
                .each(function (err2, result) {
                    if (err2) throw err2;
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
            if (err) throw err;
            var results = [];
            var searcher = db
                .collection(collection)
                .find()
                .each(function (err2, result) {
                    if (err2) throw err2;
                    if (result != null) {
                        results.push(result);
                    }
                    else {
                        callback(results);
                        db.close();
                    }
                });
        });
    }
};

module.exports = db;
