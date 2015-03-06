/*globals module*/

(function (module) {
    'use strict';

    var config = {
        files: {
            src: [
                './src/**/*.js',
                './test/**/*.js'
            ],
            dest: './out/'
        }
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-amdcheck');
        grunt.config('amdcheck', config);
    };
}(module));
