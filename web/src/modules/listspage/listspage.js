var settings = require("../../../build/settings");
import LayoutController from "../layout/layout.js";

class Controller extends LayoutController {
    constructor() {
        super();
        this.isLoading = m.prop(false);
        this.lists = m.prop([]);

        this.loadLists();
    }

    loadLists() {
        m.request({
            method: "GET",
            url: settings.api.address + "lists"
        }).then(result => {
            if (result) {
                this.lists(result);
            }
            this.isLoading(false);
        });
    }

    getView() {
        return super.getView(
            m("div", [
                m("h1", [
                    m("span.glyphicon.glyphicon-list-alt"),
                    "Shopping lists",
                ]),
                this.isLoading()
                    ? m("div.text-center", m("div.spinner-loader"))
                    : !this.lists()
                        ? m("div.alert.alert-info", { role: "alert" }, [
                            m("span.glyphicon.glyphicon-fire"),
                            "Error loading lists, please try again later."
                        ])
                        : m("table.table", [
                            m("thead", [
                                m("tr", [
                                    m("td", "Name"),
                                    m("td", "Date"),
                                ])
                            ]),
                            m("tbody", this.lists().map(list =>
                                m("tr", [
                                    m("td", m("a.btn-s.btn-link", { href: "#/list/" + list.id }, list.name)),
                                    m("td", list.date),
                                ])
                            )),
                        ]),
            ])
        );
    }
}

export default {
    controller: Controller,
    view: ctrl => ctrl.getView()
};
