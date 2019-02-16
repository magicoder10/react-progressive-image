import * as React from 'react';
import classNames from 'classnames';

import styles from './ProgressiveImage.module.scss';
import {ImageLoader} from '../loaders/image.loader';
import {Viewport, ViewportEventEmitter} from '../viewports/viewport';
import {filter, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

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

export class ProgressiveImage extends React.Component<Props, State> {
	readonly _elRef: React.RefObject<HTMLDivElement>;
	readonly _eventEmitter: ViewportEventEmitter;

	onEnterViewportSubscription: Subscription;
	onLeaveViewportSubscription: Subscription;

	constructor(props: Props) {
		super(props);

		this._elRef = React.createRef();

		this.state = {
			isThumbnailLoaded: false,
			isFullImageLoaded: false,
			isLoadingImage: false,
			fullImageSrc: '',
			thumbnailSrc: ''
		};

		this._eventEmitter = this.props.viewport.for(this._elRef);

		this.onEnterViewportSubscription = this._eventEmitter
			.onEnterViewport()
			.pipe(
				tap(this.props.onImageEnterViewport),
				filter(() => !this.state.isFullImageLoaded && !this.state.isLoadingImage)
			)
			.subscribe(this._loadFullImage);

		this.onLeaveViewportSubscription = this._eventEmitter
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
			const subscription = this.props.imageLoader.loadAsync(this.props.thumbnailSrc)
				.subscribe((imageUrl: string) => {
					this.setState({
						isThumbnailLoaded: true,
						thumbnailSrc: imageUrl
					});

					this._eventEmitter.emitOnLoad();
					subscription.unsubscribe();
				});
		}
	}

	_loadFullImage = () => {
		this.setState({
			isLoadingImage: true
		});

		const subscription = this.props.imageLoader.loadAsync(this.props.imageSrc)
			.subscribe((imageUrl: string) => {
					this.setState({
						isFullImageLoaded: true,
						fullImageSrc: imageUrl
					});

					this.setState({
						isLoadingImage: false
					});

					if (this.props.onImageLoad) {
						this.props.onImageLoad();
					}

					subscription.unsubscribe();
				},
				(imageURL: string) => {
					if (this.props.onImageLoadingError) {
						this.props.onImageLoadingError(imageURL);
					}

					subscription.unsubscribe()
				})
	};

	render() {

		const {
			isThumbnailLoaded, thumbnailSrc, isFullImageLoaded, fullImageSrc
		} = this.state;

		if (!isThumbnailLoaded) {
			return (<div className={styles['progressive-image']}></div>);
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
