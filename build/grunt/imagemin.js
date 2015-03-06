/*globals module*/

(function (module) {
    'use strict';

    var config = {
        dist: {
            options: {
                optimizationLevel: 7
            },
            files: [{
                cwd: './src/',
                dest: './www/images/',
                expand: true,
                flatten: true,
                src: ['**/*.{png,jpg,gif}']
            }]
        }
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.config('imagemin', config);
    };
}(module));
