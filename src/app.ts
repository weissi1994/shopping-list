///<reference path="pages/startpage.ts"/>

(<any>m.route).mode = "hash";

m.route(document.body, "/start", {
    "/start": new Pages.StartPage(),
});
