import LayoutController from "../layout/layout.js";

class StartPageController extends LayoutController {
    constructor() {
        super();
        this.name = m.prop("hello");
    }

    getView() {
        return super.getView(m("nav", [
            m("h1", this.name())
        ]));
    }
}

var StartPage = {
    controller: StartPageController,
    view: function(ctrl) {
        console.log(ctrl);
        return ctrl.getView();
    }
}

export default StartPage;
