DIST_DIR ?= dist

${DIST_DIR}/live-time-copier.xpi: src | dist
	cd src/ && zip -FSr ../${DIST_DIR}/live-time-copier.xpi *

dist:
	mkdir ${DIST_DIR}

clean:
	rm -fr ${DIST_DIR}
