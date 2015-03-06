/*globals console, define */

define(function () {

    'use strict';

    function HomeViewModel() {
        console.log('[HomeViewModel] called');
    }

    HomeViewModel.prototype.dispose = function () {
        console.log('[HomeViewModel] dispose called');
    };

    return HomeViewModel;
});
