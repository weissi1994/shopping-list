var settings = require("../../../build/settings");
import LayoutController from "../layout/layout.js";

class Controller extends LayoutController {
    constructor() {
        super();
        this.list = m.prop(null);
        this.isLoading = m.prop(true);

        this.loadList(m.route.param("id"));
    }

    loadList(id) {
        m.request({
            method: "GET",
            url: settings.api.address + "list/" + id
        }).then(function(result) {
            if (result) {
                this.list(result);
            }
            this.isLoading(false);
        }.bind(this));
    }

    delete() {
        m.request({
            method: "DELETE",
            url: settings.api.address + "list",
            data: {
                id: this.list().id
            }
        }).then(function(result) {
            m.route("/lists");
        }.bind(this));
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
                            m("a.btn.btn-link.pull-right", { onclick: this.delete.bind(this) }, [
                                m("span.glyphicon.glyphicon-remove"),
                                "delete",
                            ]),
                        ]),
                        m("hr"),
                        m("p.text-muted", this.list().date),
                        m("p.linebreak", this.list().items)
                    ])
        );
    }
}

export default {
    controller: Controller,
    view: ctrl => ctrl.getView()
};
