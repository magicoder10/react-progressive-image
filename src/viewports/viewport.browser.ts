import {Viewport, ViewportEventEmitter} from './viewport';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {RefObject} from 'react';

function isVisible(el: Element): boolean {
	const viewportHeight = window.document.documentElement.clientHeight;

	const elViewportOffset = el.getBoundingClientRect();
	const elViewportY = elViewportOffset.top;

	return elViewportY <= viewportHeight;
}

export class BrowserViewport implements Viewport {
	private _onScrollSubject: Subject<void> = new Subject();

	constructor() {
		window.addEventListener('scroll', () =>
			this._onScrollSubject.next());
	}

	for(el: RefObject<Element>): ViewportEventEmitter {

		const isVisibleObservable = this._onScrollSubject.pipe(
			map(_ => el && el.current ? isVisible(el.current) : false),
			distinctUntilChanged()
		);

		return {
			onEnterViewport(): Observable<void> {
				return isVisibleObservable.pipe(
					filter(isVisible => isVisible),
					map(_ => undefined)
				);
			},
			onLeaveViewport(): Observable<void> {
				return isVisibleObservable.pipe(
					filter(isVisible => !isVisible),
					map(_ => undefined)
				);
			}
		};
	}
}
