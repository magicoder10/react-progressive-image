import {ImageLoader} from './image.loader';
import {Observable} from 'rxjs';

export type UrlToObservable = {[key: string]: Observable<string>};

export class StubImageLoader implements ImageLoader {
	urlToObservable: UrlToObservable;
	
	constructor(urlToObservable: UrlToObservable) {
		this.urlToObservable = urlToObservable;
	}

	loadAsync(imageUrl: string): Observable<string> {
		return this.urlToObservable[imageUrl];
	}
}
