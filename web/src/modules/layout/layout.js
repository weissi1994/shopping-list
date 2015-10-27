import Menu from "../menu/menu.js";

export default class LayoutController {
    getView(content) {
        return m("div.container",
            m("div.row", [
                m("div.col-sm-3", Menu),
                m("div.col-sm-9", content)
            ])
        );
    }
}
