build: components index.js
	@component build --dev

%.html: %.jade
	jade $<

template.js: template.html
	@component convert $<

components: component.json
	@component install --dev

test: build example/example.html

clean:
	rm -fr build components example/example.html

.PHONY: clean
