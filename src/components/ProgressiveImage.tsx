import React, {createRef, Component, RefObject} from 'react';
import classNames from 'classnames';

import styles from './ProgressiveImage.module.scss';
import {ImageLoader} from "../loaders/image.loader";
import {Viewport} from "../viewports/viewport";
import {filter, tap} from "rxjs/operators";
import {Subscription} from "rxjs";

interface Props {
    viewport: Viewport,
    imageLoader: ImageLoader
    thumbnailSrc?: string
    alt: string
    imageSrc: string
    onImageLeaveViewport?: () => void
    onImageEnterViewport?: () => void
    onImageLoad?: () => void
    onImageLoadingError?: (imageUrl: string) => void
}

interface State {
    isThumbnailLoaded?: boolean
    isFullImageLoaded?: boolean
    isLoadingImage?: boolean
    fullImageSrc?: string
    thumbnailSrc?: string
}

export class ProgressiveImage extends Component<Props, State> {
    readonly _elRef: RefObject<HTMLDivElement>;
    onEnterViewportSubscription: Subscription;
    onLeaveViewportSubscription: Subscription;

    constructor(props: Props) {
        super(props);

        this._elRef = createRef();

        this.state = {
            isThumbnailLoaded: false,
            isFullImageLoaded: false,
            isLoadingImage: false,
            fullImageSrc: '',
            thumbnailSrc: ''
        };

        const eventEmitter = this.props.viewport.for(this._elRef);

        this.onEnterViewportSubscription = eventEmitter
            .onEnterViewport()
            .pipe(
                tap(this.props.onImageEnterViewport),
                filter(() => !this.state.isFullImageLoaded && !this.state.isLoadingImage)
            )
            .subscribe(this._loadFullImage);

        this.onLeaveViewportSubscription = eventEmitter
            .onLeaveViewport()
            .subscribe(this.props.onImageLeaveViewport);
    }

    componentDidMount() {
        this.tryLoadThumbnail();
    }

    componentWillUnmount() {
        this.onEnterViewportSubscription.unsubscribe();
        this.onLeaveViewportSubscription.unsubscribe();
    }

    tryLoadThumbnail() {
        if (this.props.thumbnailSrc) {
            this.props.imageLoader.loadAsync(this.props.thumbnailSrc)
                .then((imageURL: string) => {
                    this.setState({
                        isThumbnailLoaded: true,
                        thumbnailSrc: imageURL
                    });
                })
        }
    }

    _loadFullImage = () => {
        this.setState({
            isLoadingImage: true
        });

        this.props.imageLoader.loadAsync(this.props.imageSrc)
            .then((imageURL) => {
                this.setState({
                    isFullImageLoaded: true,
                    fullImageSrc: imageURL
                });

                this.setState({
                    isLoadingImage: false
                });

                if (this.props.onImageLoad) {
                    this.props.onImageLoad();
                }
            }, (imageURL) => {
                if (this.props.onImageLoadingError) {
                    this.props.onImageLoadingError(imageURL);
                }
            });
    };

    render() {
        const {
            isThumbnailLoaded, thumbnailSrc, isFullImageLoaded, fullImageSrc
        } = this.state;

        if (!isThumbnailLoaded) {
            return <div className={styles['progressive-image']}></div>
        }

        return (
            <div
                ref={this._elRef}
                className={styles['progressive-image']}>
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
