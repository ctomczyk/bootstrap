/*globals require, window */
/*jslint nomen: true*/

(function () {
    'use strict';

    var allTestFiles = [],
        TEST_REGEXP = /spec\.js$/i;

    Object.keys(window.__karma__.files).forEach(function (file) {
        if (TEST_REGEXP.test(file)) {
            // Normalize paths to RequireJS module names.
            allTestFiles.push(file);
        }
    });

    require.config({
        // Karma serves files under /base, which is the basePath from your config file
        baseUrl: '/base/src/scripts/',

        // dynamically load all test files
        deps: allTestFiles,

        // we have to kickoff jasmine, as it is asynchronous
        callback: window.__karma__.start
    });

}());
