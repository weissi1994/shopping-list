
///<reference path="../typings/tsd.d.ts"/>
///<reference path="../components/base.ts"/>
///<reference path="../components/menu.ts"/>

namespace Pages {

	export interface ILayoutController extends Components.IBaseController {
		menu: Components.Menu;
	}

	export class LayoutController implements ILayoutController {
		menu: Components.Menu;

		constructor() {
			this.menu = new Components.Menu();
		}

		getView(content?: MithrilVirtualElement) {
			return m("div.root", [
				this.menu,
				content
			]);
		}
	}

}
