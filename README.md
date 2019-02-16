# React Progressive Image
Progressive image loading component for React

## Preview
![Progressive Image Loading](screenshots/1.gif)

## Features
- Lazy load image when it's visible in the viewport
- Progressively load image with animation

## Future plan
- Create NPM package for this library.
- Build a website to help people generate thumbnail from the original image.
- Provide hosting service for both image assets.
- Generate React & Angular progressive image loading code based on the hosted URLs.

## Usage

Import `Progressive Image Component`, `BrowserImageLoader`, and `BrowserViewport`:

```typescript
import {
	ProgressiveImage, 
	BrowserImageLoader, 
	BrowserViewport
} from '@time4hacks/react-progressive-image';
```

Initialize Viewport and ImageLoader

```typescript
const imageLoader = new BrowserImageLoader();
const viewport = new BrowserViewport();
```
Add progressive image to your app:

```typescript
<ProgressiveImage
    viewport={this.viewport}
    imageLoader={this.imageLoader}

    alt={'Test'}
    thumbnailSrc={photoThumbnail}
    imageSrc={photo}

    onImageEnterViewport={this.handleImageEnterViewport}
    onImageLeaveViewport={this.handleImageLeaveViewport}
    onImageLoad={this.handleImageLoad}
    onImageLoadingError={this.handleImageLoadingError}
/>
```

Replace `photoThumbnail` with the URL of thumbnail and `photo` with the URL of full resolution image. 
Please remember to update `alt` to improve accessibility.

## Development
Install library dependencies

```
yarn
```

Start library live re-bundle server
```
yarn start
```

Install example dependencies and link library

```
cd example
yarn
```

Start live reload web server
```
yarn start
```

## Testing
### Running unit tests
```
yarn test
```

## Author
- **Harry Liu** - *Initial work* - [byliuyang](https://github.com/byliuyang)

## License
This library is maintained under the MIT License.
