# bootstrap

A bootstrap for the front end application. It contains serveral Grunt tasks which can help you to start faster develop application.

# What is here?

## Grunt tasks

- **build:dev** - Prepare application package for dev, non-minified version. What the task do?
    - **grunt-lintspaces** - checking spaces in files. See: [https://www.npmjs.com/package/grunt-lintspaces]()
    - **grunt-amdcheck** - uses AST to find and remove unused dependencies in AMD modules. See: [https://www.npmjs.com/package/grunt-amdcheck]()
    - **grunt-eslint** - validate files with ESLint. See: [https://www.npmjs.com/package/grunt-eslint]()
    - ** *grunt-jslint** - validates JavaScript files with JSLint as a grunt task. See: [https://github.com/stephenmathieson/grunt-jslint]()
    - **grunt-contrib-jscs** - a grunt task for running js-codesniffer validator. See: [https://www.npmjs.com/package/grunt-contrib-jscs]()
    - **grunt-htmlhint** - lint html files with htmlhint. See: [https://github.com/yaniswang/grunt-htmlhint]()
    - **grunt-jsonlint** - validate specified JSON files.
    - **cleaning folder www** - that's the place where processed web content will be.
    - **grunt-contrib-sass** - compile Sass to CSS. See: [https://github.com/gruntjs/grunt-contrib-sass]()
    - **grunt-contrib-requirejs** - optimize RequireJS projects using r.js. See: [https://github.com/gruntjs/grunt-contrib-requirejs]()
- **build:production** - Prepare application package for dev, minified version. What the task do? Basically the same as build:dev, but at the end there is minified version of package.
- **optimizeimg** - Minify images: gif, jpeg, png and svg. See: [https://github.com/gruntjs/grunt-contrib-imagemin]()
- **validate** - Validate all files using amdcheck, eslint, jslint, htmlhint, jsonlint.
- **tests** - run Jasmine tests using Karma. A simple tool that allows you to execute JavaScript code in multiple real browsers. Also, this will generate 2 reports: coverage and junit. See: [https://github.com/karma-runner/karma]()
- **manifest** - generate application manifest cache file; see : [https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache](). See: [https://github.com/gunta/grunt-manifest]()
- **watch** - using [https://github.com/steida/grunt-este-watch]() to run predefined tasks whenever watched file changes. LiveReload included. Here sass files are observed and whenever they change the new CSS package is build. Also, script files are observed and whenever they change the validation task is run.

## Banner

Every generated CSS and JavaScript file contains at the top the banner. It's defined in Gruntfile.js based on settings from package.json. See *grunt.initConfig* and property *banner*. Default banner:


	/**
	 * Application
	 * Description of application
	 *
	 * @author Cezary Tomczyk
	 * @docs http://www.example.com/
     *
	 * @copyright Copyright (c) 2015 Cezary Tomczyk
	 * @license Released under the MIT
	 * @version 0.0.1
	 */

# Before anything

Before you start using it you must get npm modules.

## npm modules

Go to your bootstrap / project directory and run from command line *npm install* to get all npm modules.

# FAQ

## How to fix SSL problem when using Ruby "gem install"?

Replace the ssl gem source with non-ssl as a temp solution:

	gem sources -r [https://rubygems.org/]()

	gem sources -a [http://rubygems.org/]()

## I see errors like: Object.keys called on non-object

Try update npm itself: *npm install -g npm@next*