/*global module, require*/

module.exports = function (grunt) {
    'use strict';

    require('jit-grunt')(grunt)({
        customTasksDir: 'build/grunt'
    });

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
                ' * <%= pkg.title || pkg.name %>\n' +
                '<%= (pkg.description ? " * " + pkg.description : "") %>\n *' +
                '<%= (_.has(pkg.author, "name") ? "\\n * @author " + pkg.author.name : "")%>' +
                '<%= (_.has(pkg.author, "url") ? "\\n * @link " + pkg.author.url : "")%>' +
                '<%= (pkg.homepage ? "\\n * @docs " + pkg.homepage : "") %>\n *' +
                '<%= (_.has(pkg.author, "name") ? "\\n * @copyright Copyright (c) " + grunt.template.today("yyyy") + " " + pkg.author.name : "") %>' +
                '<%= (pkg.licenses ? "\\n * @license Released under the " + _.pluck(pkg.licenses, "type").join(", ") : "") %>' +
                '<%= (pkg.version ? "\\n * @version " + pkg.version : "") %>' +
                '\n */\n\n'
    });

    // grunt.loadTasks('build/grunt'); // replaced by jit-grunt, see above

    grunt.registerTask('default', 'Run grunt --help to get options and tasks list', ['help']);
    grunt.registerTask('build:dev', 'Prepare application package for dev, non-minified', ['validate', 'clean:all', 'sass:dev', 'requirejs:dev']);
    grunt.registerTask('build:production', 'Prepare application package for production, minified', ['validate', 'clean:all', 'sass:dist', 'requirejs:production']);
    grunt.registerTask('optimizeimg', 'Optimizing images', ['imagemin']);
    grunt.registerTask('validate', 'Validate all files', ['lintspaces', 'amdcheck', 'eslint', 'lint:client', 'jscs', 'htmlhint', 'jsonlint']);
    grunt.registerTask('tests', 'Run unit tests', ['test:unit']);
    grunt.registerTask('watch', 'Run predefined tasks whenever watched file changes. LiveReload included.', ['esteWatch']);
    // run "grunt manifest" to generate application manifest cache file; see : https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
};
