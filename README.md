# bootstrap

A bootstrap for the front end application.

# What is here?

A Grunt tasks:

* *build:dev* - Prepare application package for dev, non-minified
version. What the task do?

*grunt-lintspaces* - checking spaces in files.
https://www.npmjs.com/package/grunt-lintspaces
*grunt-amdcheck* - uses AST to find and remove unused dependencies in
AMD modules. https://www.npmjs.com/package/grunt-amdcheck
*grunt-eslint* - validate files with ESLint.
https://www.npmjs.com/package/grunt-eslint
*grunt-jslint* - validates JavaScript files with JSLint as a grunt task.
https://github.com/stephenmathieson/grunt-jslint
*grunt-contrib-jscs* - a grunt task for running js-codesniffer validator.
https://www.npmjs.com/package/grunt-contrib-jscs
*grunt-htmlhint* - lint html files with htmlhint.
https://github.com/yaniswang/grunt-htmlhint
*grunt-jsonlint* - validate JSON files from grunt.
*cleaning folder www* - that's the place where processed web content
will be.
*grunt-contrib-sass* - compile Sass to CSS.
https://github.com/gruntjs/grunt-contrib-sass
*grunt-contrib-requirejs* - optimize RequireJS projects using r.js.
https://github.com/gruntjs/grunt-contrib-requirejs

* *build:production* - Prepare application package for dev, minified
version. What the task do? Basically the same as build:dev, but at the
end there is minified version of package.

* *optimizeimg* - Minify images: gif, jpeg, png and svg.
https://github.com/gruntjs/grunt-contrib-imagemin

* *validate* - Validate all files using amdcheck, eslint, jslint,
htmlhint, jsonlint.

* *tests* - run Jasmine tests using Karma. A simple tool that allows you
to execute JavaScript code in multiple real browsers. Also, this will
generate 2 reports: coverage and junit.
https://github.com/karma-runner/karma

* *manifest* - generate application manifest cache file; see :
https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache.
grunt-manifest https://github.com/gunta/grunt-manifest

* *watch* - using https://github.com/steida/grunt-este-watch to run
predefined tasks whenever watched file changes. LiveReload included.
Here sass files are observed and whenever they change the new CSS
package is build. Also, script files are observed and whenever they
change the validation task is run.

# FAQ

1. How to fix SSL problem when using Ruby "gem install"?

Replace the ssl gem source with non-ssl as a temp solution:

gem sources -r https://rubygems.org/
gem sources -a http://rubygems.org/
