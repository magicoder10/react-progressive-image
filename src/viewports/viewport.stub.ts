import {Viewport, ViewportEventEmitter} from './viewport';
import { Subject} from 'rxjs';

export class StubViewport implements Viewport {
	enterViewportSubject: Subject<void>;
	leaveViewportSubject: Subject<void>;
	emitOnLoadCalledCount = 0;

	constructor(enterViewportSubject: Subject<void> = new Subject<void>(), leaveViewportSubject: Subject<void> = new Subject<void>()) {
		this.enterViewportSubject = enterViewportSubject;
		this.leaveViewportSubject = leaveViewportSubject;
	}

	for(_: React.RefObject<Element>): ViewportEventEmitter {

		return {
			emitOnLoad: () => {
				this.emitOnLoadCalledCount++;
			},
			onEnterViewport: () => {
				return this.enterViewportSubject;
			},
			onLeaveViewport: () => {
				return this.leaveViewportSubject;
			}
		};
	}
}
