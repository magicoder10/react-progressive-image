import React, {createRef, Component} from 'react';
import classNames from 'classnames';

import styles from './ProgressiveImage.module.scss';

export class ProgressiveImage extends Component {
    constructor(props) {
        super(props);

        this._elRef = createRef();

        this.state = {
            isThumbnailLoaded: false,
            isFullImageLoaded: false,
            isLoadingImage: false,
            enterViewport: false,
            fullImageSrc: null
        }
    }

    componentDidMount() {
        this._loadImageAsync(this.props.thumbnailSrc)
            .then((imageURL) => {
                this.setState({
                    isThumbnailLoaded: true,
                    thumbnailSrc: imageURL
                });
                this._tryLoadFullImage();
            });

        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this._adjustViewport();
    };

    handleScroll = () => {
        this._adjustViewport();
    };

    _adjustViewport = () => {
        if (!this._isInViewport()) {

            if (this.enterViewport) {
                this.enterViewport = false;

                if (this.props.onImageLeaveViewport) {
                    this.props.onImageLeaveViewport();
                }
            }
            return;
        }

        if (!this.enterViewport) {
            this.enterViewport = true;

            if (this.props.onImageEnterViewport) {
                this.props.onImageEnterViewport();
            }
        }

        this._tryLoadFullImage();

    };

    _tryLoadFullImage = () => {
        if (this.state.isFullImageLoaded) {
            return;
        }

        if (this.isLoadingImage) {
            return;
        }

        this.isLoadingImage = true;

        this._loadFullImage();
    };

    _loadFullImage = () => {
        this._loadImageAsync(this.props.imageSrc)
            .then((imageURL) => {
                this.setState({
                    isFullImageLoaded: true,
                    fullImageSrc: imageURL
                });

                this.isLoadingImage = false;

                if (this.props.onImageLoad) {
                    this.props.onImageLoad();
                }
            }, (imageURL) => {
                if (this.props.onImageLoadingError) {
                    this.props.onImageLoadingError(imageURL);
                }
            })
    };

    _isInViewport = () => {
        const viewportHeight = window.document.documentElement.clientHeight;

        const elViewportOffset = this._elRef.current.getBoundingClientRect();
        const elViewportY = elViewportOffset.top;

        return elViewportY <= viewportHeight;
    };

    _loadImageAsync(imageURL) {
        return new Promise((resolve, reject) => {
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

    render() {
        const {
            isThumbnailLoaded, thumbnailSrc, isFullImageLoaded, fullImageSrc
        } = this.state;

        if (!isThumbnailLoaded) {
            return <div className={styles['progressive-image']}></div>
        }

        return (
            <div ref={this._elRef} className={styles['progressive-image']}>
                <img
                    className={classNames({
                        [styles['thumbnail']]: true,
                        [styles['hide']]: isFullImageLoaded
                    })}
                    alt={this.props.alt}
                    src={thumbnailSrc}/>
                <img
                    className={classNames({
                        [styles['full-image']]: true
                    })}
                    alt={this.props.alt}
                    src={fullImageSrc}/>
            </div>
        );
    }
}
