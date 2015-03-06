/*globals module*/

(function (module) {
    'use strict';

    var config = {

        options: {

            // base path that will be used to resolve all patterns (eg. files, exclude)
            basePath: './',

            // frameworks to use
            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: [
                'jasmine',
                'requirejs'
            ],

            // list of files to exclude
            exclude: [],

            // preprocess matching files before serving them to the browser
            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
            preprocessors: {
                'src/scripts/**/*.js': ['coverage']
            },

            // test results reporter to use
            // possible values: 'dots', 'progress'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter
            reporters: [
                'progress',
                'coverage',
                'junit'
            ],

            coverageReporter: {
                reporters: [
                    { type: 'html' },
                    { type: 'cobertura' },
                    { type: 'text-summary' }
                ],
                dir: 'reports/coverage/unit'
            },

            junitReporter: {
                outputFile: 'reports/junit/test-results-unit.xml'
            },

            // web server port
            port: 9876,

            // enable / disable colors in the output (reporters and logs)
            colors: true,

            // level of logging
            // possible values: DISABLE || ERROR || WARN || INFO || DEBUG
            logLevel: 'INFO',

            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: false,

            // start these browsers
            // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
            browsers: ['Chrome', 'PhantomJS'],

            // Continuous Integration mode
            // if true, Karma captures browsers, runs the tests and exits
            singleRun: true,

            // report all the tests that are slower than given time limit (in ms)
            reportSlowerThan: 50
        },

        unit: {
            options: {
                // list of files / patterns to load in the browser
                files: [
                    'test/test-main.js', {
                        pattern: 'src/scripts/**/*.js',
                        included: false
                    }, {
                        pattern: 'test/spec/**/*.js',
                        included: false
                    }, {
                        pattern: 'vendor/scripts/**/*.js',
                        included: false
                    }
                ]
            }
        }
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-karma');

        if (grunt.option('watch')) {
            config.options.autoWatch = true;
            config.options.singleRun = false;
        }

        if (grunt.option('debug')) {
            delete (config.unit.options.preprocessors);
            delete (config.unit.options.coverageReporter);
            delete (config.unit.options.junitReporter);
        }

        grunt.renameTask('karma', 'test');
        grunt.config('test', config);
    };
}(module));
