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

1) Import `Progressive Image Component`, `BrowserImageLoader`, and `BrowserViewport`:

```typescript
import {ProgressiveImage} from './components/ProgressiveImage';
import {BrowserImageLoader} from './loaders/image.loader.broswer';
import {BrowserViewport} from './viewports/viewport.browser';
```

2) Initialize Viewport and ImageLoader

```typescript
const imageLoader = new BrowserImageLoader();
const viewport = new BrowserViewport();
```

2) Add progressive image to your app:

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

3) Replace `photoThumbnail` with the URL of thumbnail and `photo` with the URL of full resolution image. 
Please remember to update `alt` to improve accessibility.

## Author
- **Harry Liu** - *Initial work* - [byliuyang](https://github.com/byliuyang)

## License
This library is maintained under the MIT License.
