(function() {
    "use strict";

    angular.module("app").controller("AskForDeleteCtrl", ["$modalInstance", "items", AskForDeleteCtrl]);


    function AskForDeleteCtrl($modalInstance, items) {
        var vm = this;

        vm.name = items;

        vm.ok = function () {
            $modalInstance.close();
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
}
());