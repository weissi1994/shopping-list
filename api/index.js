var express = require("express");
var cors = require("cors");

var app = express();
app.use(cors());

app.get("/api/lists", function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.json([{
        "id": "testid2",
        "name": "test2",
        "date": "2008-01-01",
        "items": "test"
    }]);
});

app.get("/api/list/:id", function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.json({
        "id": "testid2",
        "name": "test2",
        "date": "2008-01-01",
        "items": "test"
    });
});

var server = app.listen(3001, function () {
    var address = server.address();

    console.log("express server started");
    console.log("http://localhost:%s", address.port);
});
