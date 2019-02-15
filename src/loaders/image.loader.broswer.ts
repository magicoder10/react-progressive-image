import {ImageLoader} from './image.loader';
import {Observable} from 'rxjs';

export class BrowserImageLoader implements ImageLoader {
	loadAsync(imageUrl: string): Observable<string> {
		return new Observable(observer => {
				const image = new Image();

				image.addEventListener('load', () => {
					observer.next(imageUrl);
				});

				image.addEventListener('error', () => {
					observer.error(imageUrl);
				});

				image.src = imageUrl;
			}
		);
	}
}
