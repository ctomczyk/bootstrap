/*globals module*/

(function (module) {
    'use strict';

    var config = {
        all: {
            src: [
                'src/**/*.js',
                'Gruntfile.js',
                'build/grunt/**/*.js',
                'test/**/*.js'
            ],
            options: {
                newline: true,
                trailingspaces: true,
                indentation: 'spaces',
                spaces: 4,
                ignores: ['js-comments'],
                showValid: true
            }
        }
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-lintspaces');
        grunt.config('lintspaces', config);
    };
}(module));
