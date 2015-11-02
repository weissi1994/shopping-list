var settings = require("../../../build/settings");
import LayoutController from "../layout/layout.js";

class Controller extends LayoutController {
    constructor() {
        super();

        this.error = m.prop("");

        this.name = m.prop("");
        this.date = m.prop(new Date().toLocaleDateString());
        this.items = m.prop("");
    }

    save() {
        if (this.name() == "") {
            this.error("Name must be specified.");
            return;
        }
        if (this.date() == "") {
            this.error("Date must be specified.");
            return;
        }
        if (this.items() == "") {
            this.error("Items must be specified.");
            return;
        }

        m.request({
            method: "POST",
            url: settings.api.address + "list/new",
            data: {
                name: this.name(),
                date: this.date(),
                items: this.items()
            }
        }).then(function(result) {
            m.route("/list/" + result.id);
        }.bind(this), function(error) {
            this.error("Could not save the new shopping list, please try again later.");
        }.bind(this));
    }

    getView() {
        return super.getView(
            m("div", [
                m("h1", [
                    m("span.glyphicon.glyphicon-pencil"),
                    "Create a new shopping list",
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
                            m("input.form-control", { placeholder: "Enter the name for the shopping list", onchange: m.withAttr("value", this.name), value: this.name() })
                        )
                    ]),
                    m("div.form-group", [
                        m("label.col-sm-2.control-label", "Date"),
                        m("div.col-sm-10",
                            m("input.form-control", { onchange: m.withAttr("value", this.date), value: this.date() })
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
                        m("div.col-sm-10",
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
