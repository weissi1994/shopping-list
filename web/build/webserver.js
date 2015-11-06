module.exports = {
    start: (path, port) => {
        var express = require("express");

        var app = express();
        app.use(express.static(path));

        var server = app.listen(port, () => {
        	var address = server.address();

        	console.log("express server started at");
        	console.log('http://localhost:%s', address.port);
        });
    }
};
