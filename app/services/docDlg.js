(function() {
    "use strict";

    angular
        .module("app")
        .controller("docDlg", [ '$scope', '$mdDialog', '$http', 'cx', 'action', 'id', docDlg]);

    function docDlg($scope, $mdDialog, $http, cx, action, id ) {
        var vm = this;
        vm.action = action;
        vm.id = id;

        $scope.dropzoneConfig = {
           parallelUploads: 3,
            maxFileSize: 30
        };

        vm.reload = reload;
        vm.reload();

        vm.isValid = function() {
            return true;
        };

        function reload() {
        };

        vm.cancel = function() {
            $mdDialog.cancel();
        };

        vm.ok = function() {
            $mdDialog.hide(vm.ent);

        };
    }
})();