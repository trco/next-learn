name=learn
image=next/$(name)

build:
	docker build --build-arg VERSION=master --force-rm --no-cache -t $(image) .

local:
	docker run -it --rm \
		--name=$(name)-local \
		-e NODE_ENV=local \
		-p 8080:8080 \
		-v `pwd`:/app \
		$(image) sh
