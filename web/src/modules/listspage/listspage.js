var settings = require("../../../build/settings");
import LayoutController from "../layout/layout.js";

class Controller extends LayoutController {
    constructor() {
        super();
        this.isLoading = m.prop(false);
        this.lists = m.prop([]);
        this.filter = m.prop("");

        this.loadLists();
    }

    loadLists() {
        this.isLoading(true);
        m.request({
            background : true,
            method: "GET",
            url: settings.api.address + "lists"
        }).then(result => {
            this.isLoading(false);
            if (result) {
                this.lists(result.filter(list => list.id && list.name));
            }
        }, error => {
            this.isLoading(false);
        }).then(m.redraw);
    }

    getView() {
        return super.getView(
            m("div", [
                m("h1", [
                    m("span.glyphicon.glyphicon-list-alt"),
                    "Lists",
                ]),
                m("input[type=text].form-control", { oninput: m.withAttr("value", this.filter), value: this.filter(), placeholder: "Search" }),
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
                            m("tbody", this.lists().filter(item => {
                                    var filter = this.filter().toLowerCase();
                                    return filter == "" || item.name.toLowerCase().indexOf(filter) > -1;
                                }).sort((a, b) => b.date.localeCompare(a.date)).map(list =>
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
