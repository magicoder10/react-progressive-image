init: package.json yarn.lock
		yarn
		cd example
		yarn

build-test:
		docker build -t image-loader-test . -f Dockerfile-test

ci-test: build-test
		docker run -e CI=true image-loader-test
