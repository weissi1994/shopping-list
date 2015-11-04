var express = require("express");
var bodyParser = require('body-parser')
var cors = require("cors");
var guid = require("guid");
var mongo = require("mongodb-promise").MongoClient;

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var connectionString = "mongodb://db:27017/shopping-list";

app.post("/api/list/new", function(request, response) {
    var list = {
        "id": guid.raw(),
        "name": request.body.name,
        "date": request.body.date,
        "items": request.body.items
    };
    mongo.connect(connectionString)
        .then(db => db.collection("lists")
            .then(collection => collection.insertOne(list)
                .then(result => db.close()
                    .then(() => {
                        response.json(list);
                    })
                )
            )
        )
        .fail(error => {
            console.log(error);
            response.sendStatus(500).send(error);
        });
});

app.get("/api/lists", function(request, response) {
    mongo.connect(connectionString)
        .then(db => db.collection("lists")
            .then(collection => collection.find().toArray()
                .then(result => db.close()
                    .then(() => {
                        response.json(result);
                    })
                )
            )
        )
        .fail(error => {
            console.log(error);
            response.sendStatus(500).send(error);
        });
});

app.get("/api/list/:id", function(request, response) {
    mongo.connect(connectionString)
        .then(db => db.collection("lists")
            .then(collection => collection.findOne({ id: request.params.id})
                .then(result => db.close()
                    .then(() => {
                        response.json(result);
                    })
                )
            )
        )
        .fail(error => {
            console.log(error);
            response.sendStatus(500).send(error);
        });
});

app.delete("/api/list", function(request, response) {
    mongo.connect(connectionString)
        .then(db => db.collection("lists")
            .then(collection => collection.deleteOne({ id: request.body.id})
                .then(result => db.close()
                    .then(() => {
                        response.sendStatus(200).send({message: "deleted"});
                    })
                )
            )
        )
        .fail(error => {
            console.log(error);
            response.sendStatus(500).send(error);
        });
});

var server = app.listen(3001, function () {
    var address = server.address();

    console.log("api server started at:");
    console.log("http://localhost:%s", address.port);
});
