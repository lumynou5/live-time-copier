dist/live-time-copier.xpi: src | dist
	cd src/ && zip -FSr ../dist/live-time-copier.xpi *

dist:
	mkdir dist

clean:
	rm -fr dist
