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

app.post("/api/list/new", (request, response) => {
    var list = {
        "id": guid.raw(),
        "name": request.body.name,
        "date": request.body.date,
        "items": request.body.items
    };
    mongo.connect(connectionString).then(db =>
        db.collection("lists").then(collection =>
            collection.insert(list).then(result =>
                db.close().then(() => {
                    response.json(list);
                })
            )
        )
    ).fail(error => {
        response.sendStatus(500);
    });
});

app.get("/api/lists", (request, response) => {
    mongo.connect(connectionString).then(db =>
        db.collection("lists").then(collection =>
            collection.find().toArray().then(result =>
                db.close().then(() => {
                    response.json(result);
                })
            )
        )
    ).fail(error => {
        response.sendStatus(500);
    });
});

app.get("/api/list/:id", (request, response) => {
    mongo.connect(connectionString).then(db =>
        db.collection("lists").then(collection =>
            collection.findOne({ id: request.params.id}).then(result =>
                db.close().then(() => {
                    response.json(result);
                })
            )
        )
    ).fail(error => {
        response.sendStatus(500);
    });
});

app.delete("/api/list", (request, response) => {
    mongo.connect(connectionString).then(db =>
        db.collection("lists").then(collection =>
            collection.remove({ id: request.body.id}).then(result =>
                db.close().then(() => {
                    response.json({message: "deleted"});
                })
            )
        )
    ).fail(error => {
        response.sendStatus(500);
    });
});

app.put("/api/list", (request, response) => {
    var id = { id: request.body.id };
    var changes = { $set: { date: new Date().toLocaleString(), items: request.body.items } };
    mongo.connect(connectionString).then(db =>
        db.collection("lists").then(collection =>
            collection.update(id, changes).then(result =>
                db.close().then(() => {
                    response.json(result);
                })
            )
        )
    ).fail(error => {
        response.sendStatus(500);
    });
});

var server = app.listen(3001, () => {
    var address = server.address();

    console.log("api server started at:");
    console.log("http://localhost:%s", address.port);
});
