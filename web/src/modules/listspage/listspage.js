import LayoutController from "../layout/layout.js";

class Controller extends LayoutController {
    constructor() {
        super();
    }

    getView() {
        return super.getView(
            m("nav", [
                m("h1", "Lists")
            ])
        );
    }
}

export default {
    controller: Controller,
    view: ctrl => ctrl.getView()
};
