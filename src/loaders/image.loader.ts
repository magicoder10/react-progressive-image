import {Observable} from 'rxjs';

export interface ImageLoader {
	loadAsync(imageUrl: string): Observable<string>
}
