/*globals module, console*/
/*jslint unparam: true, regexp: true */

(function (module) {
    'use strict';

    var buildJsConfig = {
            production: {
                options: {
                    out: 'www/js/app.js',
                    optimize: 'uglify2',
                    wrap: true,
                    almond: true,
                    include: ['appInit']
                    /*
                    replaceRequireScript: [{
                        files: ['src/index.html']
                    }]
                    */
                }
            },
            dev: {
                options: {
                    out: 'www/js/app.js',
                    optimize: 'none',
                    almond: true,
                    include: ['appInit']
                }
            },
            options: {
                mainConfigFile: './src/scripts/appInit.js',
                baseUrl: './src/scripts',
                name: '../../vendor/scripts/almond',
                stripBanners: true,
                inlineText: true,
                stubModules: ['text'],
                //inlineJSON: true,
                optimizeCss: 'none',
                findNestedDependencies: true,
                preserveLicenseComments: true,
                keepBuildDir: true,
                optimizeAllPluginResources: true,
                removeCombined: true,
                onModuleBundleComplete: function (bundle) {
                    console.log('\nBundle complete'.green, bundle.path, '\n');
                },
                // onBuildWrite: function (moduleName, path) {
                //     console.log(moduleName, path);
                // },
                logLevel: 0,
                useStrict: true,
                // banner
                wrap: {
                    end: '' // start defined in exports
                }
            }
        };

    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-contrib-requirejs');
        buildJsConfig.options.wrap.start = grunt.config.get('banner');
        grunt.config('requirejs', buildJsConfig);
    };

}(module));
