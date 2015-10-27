import StartPage from "../startpage/startpage.js";

m.route.mode = "hash";

m.route(document.body, "/start", {
    "/start": StartPage,
});
