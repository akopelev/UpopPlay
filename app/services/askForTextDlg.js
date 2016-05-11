(function() {
    "use strict";

    angular
        .module("app")
        .controller("askForTextDlg", [ '$scope', '$mdDialog', '$http', 'cx', 'label', 'defaultText', 'title', askForTextDlg]);

    function askForTextDlg($scope, $mdDialog, $http, cx, label, defaultText, title ) {
        var vm = this;
        vm.label = label;
        vm.title = title ? title : "Введите " + label;
        vm.text = angular.isUndefined(defaultText) ? "" : defaultText;
        vm.cancel = function() {
            $mdDialog.cancel();
        };

        vm.ok = function() {
            $mdDialog.hide(vm.text);
        };
    }
})();