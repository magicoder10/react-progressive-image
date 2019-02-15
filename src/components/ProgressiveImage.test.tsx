import {configure, shallow} from 'enzyme';
import React from 'react';
import {Subject} from 'rxjs';


import {ProgressiveImage} from './ProgressiveImage';
import {StubViewport} from '../viewports/viewport.stub';
import {StubImageLoader} from '../loaders/image.loader.stub';

import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<ProgressiveImage />', () => {
	it('should render thumbnail.jpg', () => {
		const stubViewport = new StubViewport();

		const thumbnailUrl = 'thumbnail.jpg';

		const thumbnailLoadSubject = new Subject<string>();

		const urlToObservable = {
			[thumbnailUrl]: thumbnailLoadSubject
		};

		const stubImageLoader = new StubImageLoader(urlToObservable);

		const wrapper = shallow(<ProgressiveImage
			viewport={stubViewport}
			imageLoader={stubImageLoader}

			alt={'Test'}
			thumbnailSrc={thumbnailUrl}
			imageSrc={''}
		/>);

		expect(wrapper.find(`img[src="${thumbnailUrl}"]`).length).toBeFalsy();
		expect(stubViewport.emitOnLoadCalledCount).toEqual(0);
		thumbnailLoadSubject.next(thumbnailUrl);

		expect(wrapper.find(`img[src="${thumbnailUrl}"]`).length).toBeTruthy();
		expect(stubViewport.emitOnLoadCalledCount).toEqual(1);
	});

	it('should not render full-image.jpg before it enters viewport', () => {
		const stubViewport = new StubViewport();

		const thumbnailUrl = 'thumbnail.jpg';
		const fullImageUrl = 'full-image.jpg';

		const thumbnailLoadSubject = new Subject<string>();

		const urlToObservable = {
			[thumbnailUrl]: thumbnailLoadSubject
		};

		const stubImageLoader = new StubImageLoader(urlToObservable);

		const wrapper = shallow(<ProgressiveImage
			viewport={stubViewport}
			imageLoader={stubImageLoader}

			alt={'Test'}
			thumbnailSrc={thumbnailUrl}
			imageSrc={fullImageUrl}
		/>);

		expect(wrapper.find(`img[src="${fullImageUrl}"]`).length).toBeFalsy();
		thumbnailLoadSubject.next(thumbnailUrl);
		expect(wrapper.find(`img[src="${fullImageUrl}"]`).length).toBeFalsy();

	});

	it('should render full-image.jpg after it enters viewport', () => {

		const enterSubject = new Subject<void>();
		const stubViewport = new StubViewport(enterSubject);

		const thumbnailUrl = 'thumbnail.jpg';
		const fullImageUrl = 'full-image.jpg';

		const thumbnailLoadSubject = new Subject<string>();
		const fullImageLoadSubject = new Subject<string>();

		const urlToObservable = {
			[thumbnailUrl]: thumbnailLoadSubject,
			[fullImageUrl]: fullImageLoadSubject,
		};

		const stubImageLoader = new StubImageLoader(urlToObservable);

		const wrapper = shallow(<ProgressiveImage
			viewport={stubViewport}
			imageLoader={stubImageLoader}

			alt={'Test'}
			thumbnailSrc={thumbnailUrl}
			imageSrc={fullImageUrl}
		/>);

		expect(wrapper.find(`img[src="${fullImageUrl}"]`).length).toBeFalsy();
		thumbnailLoadSubject.next(thumbnailUrl);
		expect(wrapper.find(`img[src="${fullImageUrl}"]`).length).toBeFalsy();

		enterSubject.next();
		expect(wrapper.find(`img[src="${fullImageUrl}"]`).length).toBeFalsy();

		fullImageLoadSubject.next(fullImageUrl);
		expect(wrapper.find(`img[src="${fullImageUrl}"]`).length).toBeTruthy();
	});
});
