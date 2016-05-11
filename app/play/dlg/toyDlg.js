(function () {
    "use strict";

    angular
        .module("app")
        .controller("toyDlg", ['$mdDialog', toyDlg]);

    function toyDlg($mdDialog) {
        var vm = this;
        vm.years = [{value : 2015},{value : 2016}];
        vm.title = "Dialog title";
        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.ok = function () {
            $mdDialog.hide({});
        };
    }
})();