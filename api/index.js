var express = require("express");
var cors = require("cors");
var guid = require("guid");
var mongo = require("./mongodb");

var app = express();
app.use(cors());

var url = 'mongodb://192.168.122.231:27017';

app.post("/api/list/new", function(request, response) {
    var list = {
        "id": guid.raw(),
        "name": request.params.name,
        "date": request.params.date,
        "items": request.params.items
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
        response.json(results);
    });
});

var server = app.listen(3001, function () {
    var address = server.address();

    console.log("express server started");
    console.log("http://localhost:%s", address.port);
});
