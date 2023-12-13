# AIRModel SDK Documentation

This README.md becomes the index page of the documentation.

JSDoc generates the documentation html files, the `-R` option indicates the README.md to be used to populate the index page and the `-t` flag indicates the template to be used when styling the documentation.

With local installation of jsdoc

```shell
    ./node_modules/.bin/jsdoc src/models/*.js src/db/*.js src/dataHarvesting/*.js -R ./README.md -t ./node_modules/docdash && mv out docs
```

With global installation of jsdoc

```shell
    jsdoc src/models/*.js src/db/*.js src/dataHarvesting/*.js -R ./README.md -t ./node_modules/docdash && mv out docs
```