/*globals require, console */

require.config({
    paths: {
        baseUrl: './src',
        knockout_lib: '../vendor/scripts/knockout-3.2.0.min',
        knockout: 'common/extensions/knockoutConfig',
        text: '../../vendor/scripts/text',
        cdn: 'empty:'
    },
    shim: {},
    exclude: []
});

require(['appSettings', 'common/utils/loader', 'text!common/l10n/en-us/strings.json!bust'], function (settings, loader, enus) {
    'use strict';

    console.log('[init] started', settings, loader, JSON.parse(enus));
});
