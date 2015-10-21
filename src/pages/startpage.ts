///<reference path="../typings/tsd.d.ts"/>
///<reference path="layout.ts"/>

namespace Pages {

	interface IStartPageController extends ILayoutController {
 	}

	class StartPageController extends LayoutController implements IStartPageController {
		constructor() {
			super();
		}

		getView() {
			return super.getView(
				m("section", [
					m("h1", "Hello world!"),
					m("p", "Welcome"),
				])
			);
		}
	}

	export class StartPage implements MithrilModule {
		controller = StartPageController;
		view = (ctrl: IStartPageController) => ctrl.getView();
	}

}
