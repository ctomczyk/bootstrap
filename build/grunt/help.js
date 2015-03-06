/*globals module*/

(function (module) {
    'use strict';

    module.exports = function (grunt) {
        grunt.registerTask('help', 'help task description', function () {
            grunt.log.writeln('Help me! Run grunt --help');
        });
    };

}(module));
