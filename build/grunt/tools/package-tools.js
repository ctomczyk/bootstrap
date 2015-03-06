/*globals module*/

(function (module) {
    'use strict';

    function getPropertyFromPackageJson(grunt, prop) {
        var packageJson = grunt.file.readJSON('package.json');
        return packageJson[prop];
    }

    function getVersionFromPackageJson(grunt) {
        var version = getPropertyFromPackageJson(grunt, 'version');
        return version.replace('-', '.');
    }

    module.exports = {
        getPropertyFromPackageJson: getPropertyFromPackageJson,
        getVersionFromPackageJson: getVersionFromPackageJson
    };
}(module));
