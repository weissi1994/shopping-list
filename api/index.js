var express = require("express");
var bodyParser = require('body-parser')
var cors = require("cors");
var guid = require("guid");
var mongo = require("./mongodb");

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var url = 'mongodb://192.168.122.231:27017';

app.post("/api/list/new", function(request, response) {
    var list = {
        "id": guid.raw(),
        "name": request.body.name,
        "date": request.body.date,
        "items": request.body.items
    };
    mongo.insert(list, "lists", function(result) {
        response.json(list);
    });
});

app.get("/api/lists", function(request, response) {
    mongo.findAll("lists", function(results) {
        response.json(results);
    });
});

app.get("/api/list/:id", function(request, response) {
    mongo.find({ "id": request.params.id }, "lists", function(results) {
        response.json(results[0]);
    });
});

app.delete("/api/list/delete", function(request, response) {
    console.log(request.body);
    mongo.delete({ "id": request.body.id }, "lists", function(results) {
        response.send(200);
    });
});

var server = app.listen(3001, function () {
    var address = server.address();

    console.log("express server started");
    console.log("http://localhost:%s", address.port);
});
