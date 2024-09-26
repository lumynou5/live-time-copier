dist/live-time-copier.zip: $(wildcard src/**/*) | dist
	cd src/ && zip -FSr ../dist/live-time-copier.zip *

dist:
	mkdir dist

clean:
	rm -fr dist/
