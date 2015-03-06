/*globals module*/

(function (module) {
    'use strict';

    var config = {
        images: {
            files: [{
                cwd: './www/images',
                dest: './www/images2/',
                expand: true,
                flatten: true,
                src: ['**/*.{png,jpg,gif}'],
                timestamp: true,
                nonull: true
            }]
        }
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.config('copy', config);
    };
}(module));
