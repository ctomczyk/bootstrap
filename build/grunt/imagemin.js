/*globals module*/

(function (module) {
    'use strict';

    var config = {
        dist: {
            options: {
                optimizationLevel: 7
            },
            files: [{
                cwd: './src/images/',
                dest: './www/',
                expand: true,
                flatten: false,
                src: ['**/*.{png,jpg,gif,svg}']
            }]
        }
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.config('imagemin', config);
    };
}(module));
