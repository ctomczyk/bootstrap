/*globals module*/

(function (module) {
    'use strict';

    var config = {
        generate: {
            options: {
                basePath: './www/',
                exclude: [],
                preferOnline: false,
                verbose: false,
                timestamp: true,
                master: []
            },
            src: [
                '**/*.js',
                '**/*.json',
                '**/*.jpg',
                '**/*.png',
                '**/*.css'
            ],
            dest: './www/manifest.appcache'
        }
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-manifest');
        grunt.config('manifest', config);
    };
}(module));
