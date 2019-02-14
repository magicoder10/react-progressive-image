import {ImageLoader} from './image.loader';

export class BrowserImageLoader implements ImageLoader {
	loadAsync(imageURL: string): Promise<string> {
		return new Promise((
			resolve: ((imageUrl: string) => void),
			reject: (imageUrl: string) => void
		) => {
			const image = new Image();

			image.addEventListener('load', () => {
				resolve(imageURL);
			});

			image.addEventListener('error', () => {
				reject(imageURL);
			});

			image.src = imageURL;
		});
	}
}
