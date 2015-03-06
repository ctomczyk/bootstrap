/*globals module*/

(function (module) {
    'use strict';

    module.exports = function (grunt) {

        var config = {
            options: {
                dirs: ['src/**', 'build/grunt/**'],
                livereload: {
                    enabled: true,
                    port: 35729,
                    extensions: ['sass', 'js']
                }
            },
            '*': function (filepath) {

                var tasks = [];

                // Only run tasks for files located in /src/ folder

                if (!/\/src\//.test(filepath)) {

                    if (grunt.file.isMatch(['**/*.scss'], filepath)) {
                        tasks.push('sass:dev');
                    }

                    if (grunt.file.isMatch(['**/*.js'], filepath)) {
                        tasks.push('validate');
                    }
                }

                return tasks;
            }
        };

        grunt.loadNpmTasks('grunt-este-watch');
        grunt.config('esteWatch', config);
    };

}(module));
