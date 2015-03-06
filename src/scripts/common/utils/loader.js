/*globals define, document*/

define(function () {
    'use strict';

    function loadStyle(url) {
        var style = document.createElement('link');
        style.href = url;
        style.type = 'text/css';
        style.rel = 'stylesheet';
        document.head.appendChild(style);
    }

    function loadScript(url, onLoaded, onFailed) {
        var script = document.createElement('script');

        script.src = url;
        script.type = 'text/javascript';
        script.async = true;

        if (onLoaded) {
            script.onload = onLoaded;
        }
        if (onFailed) {
            script.onerror = onFailed;
        }

        document.head.appendChild(script);
    }

    return {
        loadStyle: loadStyle,
        loadScript: loadScript
    };
});
