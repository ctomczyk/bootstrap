/*globals module*/

(function (module) {
    'use strict';

    var config = {
        options: {
            'tag-pair': true,
            'tagname-lowercase': true,
            'attr-lowercase': true,
            'attr-value-double-quotes': true,
            'doctype-first': true,
            'spec-char-escape': true,
            'id-unique': true,
            'head-script-disabled': true,
            'style-disabled': false
        },
        src: ['./src/index.html']
    };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-htmlhint');
        grunt.config('htmlhint', config);
    };
}(module));
