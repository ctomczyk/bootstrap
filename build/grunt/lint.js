/*globals module*/

(function (module) {
    'use strict';

    var config = {
        client: {
            src: [
                'src/**/*.js',
                'Gruntfile.js',
                'build/grunt/**/*.js',
                'test/**/*.js'
            ],
            exclude: [
                'src/scripts/appRequireConfig.js' // typeof problem
            ]
        }
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-jslint');
        grunt.renameTask('jslint', 'lint');
        grunt.config('lint', config);
    };
}(module));
