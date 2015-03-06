/*globals module*/

(function (module) {
    'use strict';

    var config = {
        options: {
            config: 'build/grunt/eslint.json'
        },
        target: [
            'src/**/*.js',
            'Gruntfile.js',
            'build/grunt/**/*.js',
            'test/**/*.js'
        ]
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-eslint');
        grunt.config('eslint', config);
    };
}(module));
