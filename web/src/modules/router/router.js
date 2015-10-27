import ListsPage from "../listspage/listspage.js";
import NewListPage from "../newlistpage/newlistpage.js";

m.route.mode = "hash";

m.route(document.body, "/lists", {
    "/lists": ListsPage,
    "/new": NewListPage,
});
