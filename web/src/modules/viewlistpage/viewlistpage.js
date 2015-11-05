var settings = require("../../../build/settings");
import LayoutController from "../layout/layout.js";

class Controller extends LayoutController {
    constructor() {
        super();
        this.list = m.prop(null);
        this.items = m.prop([]);
        this.newItems = m.prop("");
        this.isLoading = m.prop(false);
        this.isEditing = m.prop(false);

        this.loadList(m.route.param("id"));
    }

    parseListItems(items) {
        this.items(items
            .split("\n")
            .filter(item => item) // only allow truthy objects, not empty strings and such
            .map(item => {
                return {"checked": false, "text": item }
            }));
    }

    loadList(id) {
        this.isLoading(true);
        m.request({
            background : true,
            method: "GET",
            url: settings.api.address + "list/" + id
        }).then(result => {
            this.isLoading(false);
            if (result) {
                this.list(result);
                this.newItems(result.items);
                this.parseListItems(result.items);
            }
        }, error => {
            this.isLoading(false);
        }).then(m.redraw);
    }

    delete() {
        this.isLoading(true);
        m.request({
            background : true,
            method: "DELETE",
            url: settings.api.address + "list",
            data: {
                id: this.list().id
            }
        }).then(result => {
            this.isLoading(false);
            m.route("/lists");
        }, error => {
            this.isLoading(false);
        }).then(m.redraw);
    }

    edit() {
        this.isEditing(true);
    }

    save() {
        this.parseListItems(this.newItems());
        this.isEditing(false);

        this.isLoading(true);
        m.request({
            background : true,
            method: "PUT",
            url: settings.api.address + "list",
            data: {
                id: this.list().id,
                items: this.newItems()
            }
        }).then(result => {
            this.isLoading(false);
            // m.route("/lists");
        }, error => {
            this.isLoading(false);
        }).then(m.redraw);
    }

    getView() {
        return super.getView(
            this.isLoading()
                ? m("div.text-center", m("div.spinner-loader"))
                : !this.list()
                    ? m("div.alert.alert-info", { role: "alert" }, [
                        m("span.glyphicon.glyphicon-fire"),
                        "Error loading list, please try again later."
                    ])
                    : m("div", [
                        m("h1", [
                            m("span.glyphicon.glyphicon-folder-open"),
                            this.list().name,
                        ]),
                        m("hr"),
                        this.isEditing()
                            ? m("textarea.form-control.mtb", { rows: 5, onchange: m.withAttr("value", this.newItems), value: this.newItems() })
                            : m("div.listitems", this.items().sort(item => item.checked).map(item =>
                                m("div.listitem.clearfix" + (item.checked ? ".success" : ""), { onclick: function () { item.checked = true } } ,[
                                    m("span" + (item.checked ? ".glyphicon.glyphicon-ok" : ".glyphicon.glyphicon-unchecked")),
                                    item.text
                                ])
                            )),
                        m("div.ftr", [
                            m("span.text-muted.mr", "Created"),
                            this.list().date,
                        ]),
                        m("div", [
                            this.isEditing()
                                ? m("a.btn.btn-link", { onclick: this.save.bind(this) }, [
                                    m("span.glyphicon.glyphicon-save"),
                                    "save",
                                ])
                                : m("a.btn.btn-link", { onclick: this.edit.bind(this) }, [
                                    m("span.glyphicon.glyphicon-pencil"),
                                    "edit",
                                ]),
                            m("a.btn.btn-link.pull-right", { onclick: this.delete.bind(this) }, [
                                m("span.glyphicon.glyphicon-remove"),
                                "delete",
                            ]),
                        ])
                    ])
        );
    }
}

export default {
    controller: Controller,
    view: ctrl => ctrl.getView()
};
