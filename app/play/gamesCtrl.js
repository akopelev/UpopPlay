(function () {
    "use strict";
    angular.module("app").controller("gamesCtrl", [
        '$timeout', 'toyData', gamesCtrl]);

    function gamesCtrl($timeout, toyData) {
        var vm = this;
        vm.rowData = toyData;
        vm.rowHeight = '46';
        vm.gridOptions = {
            angularCompileRows: true,
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            showToolPanel: false,
            groupUseEntireRow: true,
            rowSelection: 'multiple',
            rowHeight: vm.rowHeight
        };
        vm.getColDefs = function () {
            return [
                { headerName: "id", field: "id"},
                { headerName: "gender", field: "gender"},
                { headerName: "first_name", field: "first_name"},
                { headerName: "last_name", field: "last_name"},
                { headerName: "email", field: "email"},
                { headerName: "ip_address", field: "ip_address"}
            ];
        }

        vm.queryGame = function(query) {
            return _.filter(vm.rowData, function(game) {
                return (game.first_name && game.first_name.indexOf(query)) > -1;
            });
        }

        vm.reload = reload;
        vm.reload();
        function reload() {
            $timeout(function() {
                vm.gridOptions.api.setColumnDefs(vm.getColDefs());
                vm.gridOptions.api.setRowData(vm.rowData);
            })
            

        };
    }
}());