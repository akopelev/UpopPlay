(function () {
    "use strict";
    angular.module("app").controller("toysCtrl", [
        '$timeout', 'toyData', 'html', toysCtrl]);

    function toysCtrl($timeout, toyData, html) {
        var vm = this;
        vm.rowHeight = '46';
        vm.gridOptions = {
            angularCompileRows: true,
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            showToolPanel: false,
            groupUseEntireRow: true,
            //groupHidePivotColumns: true,
            rowHeight: parseInt(vm.rowHeight)
        };
        function opersRenderer(params) {
            var ent = params.data;
            var btns = [
                {show: true, name: 'edit', tooltip: 'Редактировать', func: edit},
            ]
            return html.gridBtns(_.filter(btns, "show"), params.$scope, params.node);
        }

        vm.getColDefs = function () {
            return [
                {headerName: "id", field: "id", width: 60},
                {headerName: "gender", field: "gender", width: 100},
                {headerName: "Операции", field: "opers", cellRenderer: opersRenderer, width: 111},
                {headerName: "first_name", field: "first_name"},
                {headerName: "last_name", field: "last_name"},
                {headerName: "email", field: "email"},
                {headerName: "ip_address", field: "ip_address"}

            ];
        }

        function edit(ent, ev, node) {
            html.dlg('play', 'toy', ev, ent).then(function (ent) {
                console.log("edited");
            });
        }


        vm.reload = reload;
        vm.reload();
        function reload() {
            $timeout(function () {
                vm.gridOptions.api.setColumnDefs(vm.getColDefs());
                vm.gridOptions.api.setRowData(toyData);
            })


        };
    }
}());