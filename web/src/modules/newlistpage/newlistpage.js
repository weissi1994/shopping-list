var settings = require("../../../build/settings");
import LayoutController from "../layout/layout.js";

class Controller extends LayoutController {
    constructor() {
        super();

        this.error = m.prop("");

        this.name = m.prop("");
        this.items = m.prop("");
        this.isSaveing = m.prop(false);
    }

    save() {
        if (this.name() == "") {
            this.error("Name must be specified.");
            return;
        }
        if (this.items() == "") {
            this.error("Items must be specified.");
            return;
        }

        this.isSaveing(true);
        m.request({
            background : true,
            method: "POST",
            url: settings.api.address + "list/new",
            data: {
                name: this.name(),
                items: this.items()
            }
        }).then(result => {
            this.isSaveing(false);
            m.route("/list/" + result.id);
        }, error => {
            this.isSaveing(false);
            this.error("Could not save the new list, please try again later.");
        }).then(m.redraw);
    }

    getView() {
        return super.getView(
            m("div", [
                m("h1", [
                    m("span.glyphicon.glyphicon-pencil"),
                    "Create a new list",
                ]),
                m("hr"),
                this.error() ? m("div.alert.alert-info", { role: "alert" }, [
                    m("span.glyphicon.glyphicon-fire"),
                    this.error()
                ]) : "",
                m("div.form-horizontal", [
                    m("div.form-group", [
                        m("label.col-sm-2.control-label", "Name"),
                        m("div.col-sm-10",
                            m("input.form-control", { placeholder: "Enter the name for the list", onchange: m.withAttr("value", this.name), value: this.name() })
                        )
                    ]),
                    m("div.form-group", [
                        m("label.col-sm-2.control-label", "Items"),
                        m("div.col-sm-10",
                            m("textarea.form-control", { rows: 5, onchange: m.withAttr("value", this.items), value: this.items() })
                        )
                    ]),
                    m("div.form-group", [
                        m("label.col-sm-2.control-label"),
                        this.isSaveing()
                            ? m("d.col-sm-10", [
                                m("div.spinner-loader"),
                                m("span", "Saveing")
                            ])
                            : m("div.col-sm-10",
                                m("button.btn.btn-success", {onclick: this.save.bind(this)}, "Save")
                            )
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
