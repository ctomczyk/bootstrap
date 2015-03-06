/*jslint browser:true */
/*globals define */

(function (global) {
    'use strict';

    define(function () {

        // if console object does not exist, create it and fill it with "empty" functions (IE specific)
        // in IE 9 the console object is not actually defined unless developer tools are open at the time the window loads
        // In IE 10 the console doesn't seem to work when the Document Mode is set to Standards

        var i,
            consoleCountData = {},
            console = global.console,
            methods = [
                'assert', 'clear', 'count', 'countReset', 'debug', 'dir', 'dirxml', 'error', 'exception',
                'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
                'memoryProfile', 'memoryProfileEnd', 'profile', 'profileEnd',
                'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'
            ];

        if (!console) {
            global.console = console = {};
        }

        if (!console.count) {
            console.count = function countCalls() {
                var args = Array.prototype.slice.call(arguments),
                    str = String(args[0]);

                if (!consoleCountData[str]) {
                    consoleCountData[str] = 1;
                } else {
                    consoleCountData[str] += 1;
                }

                args.shift();
                args.unshift(str + ': ' + consoleCountData[str]);
                console.log.apply(console, args);
            };
        }

        if (!console.countReset) {
            console.countReset = function countReset(str) {
                str = String(str);
                if (consoleCountData[str]) {
                    consoleCountData[str] = 0;
                }
            };
        }

        for (i = 0; i < methods.length; i += 1) {
            if (!console[methods[i]]) {
                console[methods[i]] = Number; // noop
            }
        }

        // Put here console method name which you want to make configurable (including default status)
        console.config = {
            // trace: true
        };

        /**
         * Wrap original console method
         * @param {object} consoleMethod - console method
         * @param {string} methodName - console method name
         */

        function wrapper(methodName) {
            var originalMethod = console[methodName];
            console[methodName] = function consoleFn() {
                if (console.config[methodName]) {
                    originalMethod.apply(console, arguments);
                }
            };
        }

        // Processing config settings:
        // get default config for console and check what kind of properties must be wrapped in original console
        Object.keys(console.config).forEach(function (key) {
            wrapper(key);
        });

        return console;
    });

}(this));
