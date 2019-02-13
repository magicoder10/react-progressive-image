# React Progressive Image
Progressive image loading component for React

## Preview
![Progressive Image Loading](screenshots/1.gif)

## Features
- Lazy load image when it's visible in the viewport
- Progressively load image with animation

## Future plan
- Build a website to help people generate thumbnail image from the original one.
- Provide hosting service for both images.
- Generate React & Angular progressive image loading code based on the hosted URLs.
- Provide REST & GraphQl API for thumbnail generation.

## Usage

1) Import `Progressive Image Component`:

```javascript
import {ProgressiveImage} from './components/ProgressiveImage';
```

2) Add progressive image to your app:

```javascript
 <ProgressiveImage
   thumbnailSrc={photoThumbnail}
   imageSrc={photo}
   
   onImageEnterViewport={this.handleImageEnterViewport}
   onImageLeaveViewport={this.handleImageLeaveViewport}
   onImageLoad={this.handleImageLoad}
   onImageLoadingError={this.handleImageLoadingError}
 />
```

3) Replace `photoThumbnail` with the URL of thumbnail and `photo` with the URL of full resolution image.

## Author
- **Harry Liu** - *Initial work* - [byliuyang](https://github.com/byliuyang)

## License
This library is maintained under the MIT License.
