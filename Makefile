dist/live-time-copier.zip: src | dist
	cd src/ && zip -FSr ../dist/live-time-copier.zip *

dist:
	mkdir dist

clean:
	rm -fr dist/
