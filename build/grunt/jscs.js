/*globals module*/

(function (module) {
    'use strict';

    var config = {
        options: {
            config: '.jscs.json',
            maxErrors: 1
        },
        source: [
            './src/**/*.js',
            './Gruntfile.js',
            './build/grunt/**/*.js',
            './test/**/*.js'
        ]
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-jscs');
        grunt.config('jscs', config);
    };
}(module));
