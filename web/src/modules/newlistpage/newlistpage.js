import LayoutController from "../layout/layout.js";

class Controller extends LayoutController {
    constructor() {
        super();

        this.name = m.prop("");
        this.date = m.prop(new Date().toLocaleDateString());
        this.items = m.prop("");
    }

    getView() {
        return super.getView(
            m("div", [
                m("h1", [
                    m("span.glyphicon.glyphicon-pencil"),
                    "Create a new shopping list",
                ]),
                m("hr"),
                m("div.form-horizontal", [
                    m("div.form-group", [
                        m("label.col-sm-2.control-label", "Name"),
                        m("div.col-sm-10",
                            m("input.form-control", { placeholder: "Enter the name for the shopping list", value: this.name() })
                        )
                    ]),
                    m("div.form-group", [
                        m("label.col-sm-2.control-label", "Date"),
                        m("div.col-sm-10",
                            m("input.form-control", { value: this.date() })
                        )
                    ]),
                    m("div.form-group", [
                        m("label.col-sm-2.control-label", "Items"),
                        m("div.col-sm-10",
                            m("textarea.form-control", { rows: 5, value: this.items() })
                        )
                    ]),
                    m("div.form-group", [
                        m("label.col-sm-2.control-label"),
                        m("div.col-sm-10",
                            m("button.btn.btn-success", "Save")
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
