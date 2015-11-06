var settings = require("./build/settings");
var webserver = require("./build/webserver");

webserver.start(settings.output.path, settings.web.port);
