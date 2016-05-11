(function() {
    "use strict";

    angular.module("app").controller("AskForCommentsCtrl", ["$modalInstance", "message", "startText", AskForCommentsCtrl]);


    function AskForCommentsCtrl($modalInstance, message, startText) {
        var vm = this;

        vm.comments = startText;

        vm.message = message;

        vm.ok = function () {
            if (vm.comments.length == 0) {
                $modalInstance.dismiss('cancel');
            } else {
                $modalInstance.close(vm.comments);
            }
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }
}
());