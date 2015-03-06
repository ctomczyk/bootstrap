/*globals module*/

(function (module) {
    'use strict';

    var config = {
        dev: {
            files: [{
                expand: true,
                cwd: 'src/sass/',
                src: ['*.scss'],
                dest: 'www/css/',
                ext: '.css'
            }]
        },
        dist: {
            options: {
                style: 'compressed'
            },
            files: [{
                expand: true,
                cwd: 'src/sass/',
                src: ['*.scss'],
                dest: 'www/css/',
                ext: '.css'
            }]
        },
        options: {}
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-contrib-sass');
        config.options.banner = grunt.config.get('banner');
        grunt.config('sass', config);
    };

}(module));
