/*globals define, describe, it, expect*/
/*jslint browser: true*/

define(['common/utils/console'], function (console) {
    'use strict';

    describe('Console', function () {

        it('checks, if custom method are applied (replaced native method)', function () {
            Object.keys(console.config).forEach(function (key) {
                expect(typeof console[key]).toBe('function');
                expect(console[key].toString().indexOf('[native code]')).toBeLessThan(0);
            });
        });
    });
});
