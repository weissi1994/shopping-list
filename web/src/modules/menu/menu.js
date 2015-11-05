class Controller {
    constructor() {
        this.logoText = m.prop("shopping-list");
    }

    getView(content) {
        var route = m.route();
        return m("div", [
            m("h1.logo.hidden-xs", [
                m("span.glyphicon.glyphicon-leaf")
            ]),
            m("ul.nav.nav-pills.nav-stacked", [
                m("li" + (route == "/new" ? ".active" : ""), { role: "presentation" }, m("a", { href: "#/new" }, "New")),
                m("li" + (route == "/lists" ? ".active" : ""), { role: "presentation" }, m("a", { href: "#/lists" }, "Lists")),
            ]),
        ]);
    }
}

export default {
    controller: Controller,
    view: ctrl => ctrl.getView()
};
