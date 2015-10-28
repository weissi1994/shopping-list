import LayoutController from "../layout/layout.js";

class Controller extends LayoutController {
    constructor() {
        super();
        this.list = m.prop(null);
        this.isLoading = m.prop(true);

        this.loadList(m.route.param("id"));

    }

    loadList(id) {
        var url = "http://localhost:3001/api/list/" + id;
        m.request({method: "GET", url: url}).then(function(result) {
            if (result) {
                this.list(result);
            }
            this.isLoading(false);
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
                            m("a.btn.btn-link.pull-right", [
                                m("span.glyphicon.glyphicon-remove"),
                                "delete",
                            ]),
                        ]),
                        m("hr"),
                        m("p.text-muted", this.list().date),
                        m("p", this.list().items)
                    ])
        );
    }
}

export default {
    controller: Controller,
    view: ctrl => ctrl.getView()
};
