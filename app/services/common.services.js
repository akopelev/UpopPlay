(function() {
    "use strict";

    angular
        .module("common.services",
        ["ngResource"])
        .service('uiService', [
            '$window', '$location', function ($window, $location) {
                this.askForDelete = function (name) {

                    //return $window.confirm('Удалить ' + name + '?');
                }
                this.askForComment = function (message) {
                    return $window.prompt(message);
                }
                this.urlEnd = function () {
                    return $location.absUrl();
                },
                this.getArrIndex = function (arr, propName, propValue) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i][propName] == propValue) {
                            return i;
                        }
                    }
                    return -1;
                }
            }
        ]);
}());