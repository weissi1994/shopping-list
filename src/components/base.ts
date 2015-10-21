///<reference path="../typings/tsd.d.ts"/>

namespace Components {

	export interface IBaseController {
		getView(content?: MithrilVirtualElement): MithrilVirtualElement;
	}

}
