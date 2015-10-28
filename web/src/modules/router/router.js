import ListsPage from "../listspage/listspage.js";
import NewListPage from "../newlistpage/newlistpage.js";
import ViewListPage from "../viewlistpage/viewlistpage.js";

m.route.mode = "hash";

m.route(document.body, "/lists", {
    "/lists": ListsPage,
    "/new": NewListPage,
    "/list/:id": ViewListPage,
});
