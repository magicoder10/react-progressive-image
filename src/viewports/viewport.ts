import {Observable} from "rxjs";
import {RefObject} from "react";

export interface ViewportEventEmitter {
    onEnterViewport(): Observable<void>

    onLeaveViewport(): Observable<void>
}

export interface Viewport {
    for(el: RefObject<Element>): ViewportEventEmitter
}
