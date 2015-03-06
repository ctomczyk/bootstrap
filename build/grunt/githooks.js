/*globals module*/

(function (module) {
    'use strict';

    var config = {
        githooks: {
            all: {
                // Will run the jshint and test:unit tasks at every commit
                'pre-commit': 'validate'
            }
        }
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-githooks');
        grunt.config('githooks', config);
    };
}(module));
