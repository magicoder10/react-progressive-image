init: package.json yarn.lock
		yarn

dev: init
		docker build -t image-loader-dev . -f Dockerfile-dev
		docker run -it -v ${CURDIR}/src:/usr/src/app/src -p 3000:3000 image-loader-dev

build-test:
		docker build -t image-loader-test . -f Dockerfile-test

tdd: build-test
		docker run -it -v ${CURDIR}/src:/usr/src/app/src image-loader-test

ci-test: build-test
		docker run -e CI=true image-loader-test
