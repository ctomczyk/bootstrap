/*globals module*/

(function (module) {
    'use strict';

    var config = {
        src: [
            'src/**/*.json',
            'build/grunt/**/*.json',
            'test/**/*.json',
            'package.json'
        ]
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-jsonlint');
        grunt.config('jsonlint', config);
    };
}(module));
