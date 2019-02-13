import React, {Component} from 'react';
import './App.scss';
import {ProgressiveImage} from "./components/ProgressiveImage";

import photo from './photo.jpg';
import photoThumbnail from './photo-thumbnail.jpg';

class App extends Component {
    handleImageLoadingError = (imageUrl) => {
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

    toTime(date) {
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    log(message) {
        console.log(`${this.toTime(new Date())} ${message}`)
    }

    render() {
        return (
            <div className="App">
                <div className='white-space'>
                </div>
                <div className='progressive-image-wrapper'>

                    <ProgressiveImage
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
