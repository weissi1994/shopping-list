///<reference path="../typings/tsd.d.ts"/>
///<reference path="base.ts"/>

namespace Components {

	interface IMenuController extends IBaseController  {
		menuItems: Array<string>;
	}

	class MenuController implements IMenuController {
		menuItems: Array<string>;

		getView() {
			return m("nav", [
				m("h1", "Menu components"),
				m("ul", [
					m("li", m("a", { href: "#start", onclick: (e) => m.route("/start") }, "startpage")),
					m("li", m("a", { href: "#stats", onclick: (e) => m.route("/stats") }, "view stats")),
				]),
			]);
		}
	}

	export class Menu implements MithrilModule {
		controller = MenuController;
		view = (ctrl: IMenuController) => ctrl.getView();
	}
}
