/*globals module*/

(function (module) {
    'use strict';

    var config = {
        dist: ['www']
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.registerTask('clean:all', ['clean:dist']);
        grunt.config('clean', config);
    };
}(module));
