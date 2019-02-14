import React, {Component} from 'react';
import './App.scss';

import photo from './photo.jpg';
import photoThumbnail from './photo-thumbnail.jpg';

import {ProgressiveImage} from './components/ProgressiveImage';
import {BrowserImageLoader} from './loaders/image.loader.broswer';
import {BrowserViewport} from './viewports/viewport.browser';

class App extends Component {
	imageLoader = new BrowserImageLoader();
	viewport = new BrowserViewport();

	handleImageLoadingError = (imageUrl: string) => {
		this.log(`Fail to load ${imageUrl}`);
	};

	handleImageEnterViewport = () => {
		this.log('Image enters viewport');
	};

	handleImageLeaveViewport = () => {
		this.log('Image leaves viewport');
	};

	handleImageLoad = () => {
		this.log('Image is loaded');
	};

	toTime(date: Date) {
		return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	}

	log(message: string) {
		console.log(`${this.toTime(new Date())} ${message}`)
	}

	render() {
		return (
			<div className="App">
				<div className='white-space'>
				</div>
				<div className='progressive-image-wrapper'>

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

				</div>
			</div>
		);
	}
}

export default App;
