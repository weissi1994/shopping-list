import LayoutController from "../layout/layout.js";

class Controller extends LayoutController {
    constructor() {
        super();
        this.isLoading = m.prop(true);

        this.lists = m.prop([
            { id: "testid", name: "test", date: "2007-01-01" },
        ]);
    }

    getView() {
        return super.getView(
            m("div", [
                m("h1", [
                    m("span.glyphicon.glyphicon-list-alt"),
                    "Shopping lists",
                ]),
                m("hr"),
                m("table.table", [
                    m("thead", [
                        m("tr", [
                            m("td", "Name"),
                            m("td", "Date"),
                        ])
                    ]),
                    m("tbody", this.lists().map(function(list) {
                        return m("tr", [
                            m("td", m("a", { href: "#/list/" + list.id }, list.name)),
                            m("td", list.date),
                        ])
                    })),
                ]),
            ])
        );
    }
}

export default {
    controller: Controller,
    view: ctrl => ctrl.getView()
};
