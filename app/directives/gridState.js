(function() {
    "use strict";

    angular
        .module("app")
        .directive("gridState", gridState);

    gridState.$inject = ["$log", "$modal", "$http", "logger"];

// usage:     <grid-state name="boffins"></grid-state> in md-toolbar
    function gridState($log, $modal, $http, logger) {

        var directive = {
            scope: false, // not isolated for now
            // requires naming: vm.type, vm.toolPanel, vm.groupHeaders, vm.gridOptions
            // requires vm.getColDefs
            // requires in reload: vm.defaultColState = vm.gridOptions.columnApi.getColumnState();
            templateUrl: '/app/directives/gridState.html',
            link: link,
            restrict: "E"
        };
        return directive;

        function link(scope, element, attrs) { // name - gridStateName
            var gridPrefix = attrs.name;
            function getGridName() { // resp: groupHeaders, colState
                return gridPrefix + ((scope.vm.type) ? '.' + scope.vm.type : '');
            }

            function applyGridState(resp) { // resp: groupHeaders, colState
                scope.vm.groupHeaders = resp.groupHeaders;
                scope.vm.gridOptions.api.setColumnDefs(scope.vm.getColDefs());
                var columnState = JSON.parse(resp.colState);
                scope.vm.gridOptions.columnApi.setColumnState(columnState);
                logger.success("Настройки восстановлены");
                if (scope.vm.toolPanel) scope.vm.toolPanel = false;
            }

            scope.vm.refreshColState = function () {
                scope.vm.groupHeaders = true;
                scope.vm.gridOptions.api.setColumnDefs(scope.vm.getColDefs());
                scope.vm.gridOptions.columnApi.setColumnState(scope.vm.defaultColState);
                if (scope.vm.toolPanel) scope.vm.toolPanel = false;
                $http.post("/json/deactivateGridState", {
                    grid: getGridName()
                }).success(function (resp) {
                    logger.success("Настройки сброшены");
                });
            }

            scope.vm.saveColState = function () {
                var json = JSON.stringify(scope.vm.gridOptions.columnApi.getColumnState());
                $http.post("/json/saveGridState", {
                    grid: getGridName(),
                    state: {groupHeaders: scope.vm.groupHeaders, colState: json}
                }).success(function (resp) {
                    logger.success("Настройки сохранены");
                    if (scope.vm.toolPanel) scope.vm.toolPanel = false;
                });
            }

            scope.vm.restoreColState = function () {
                $http.post("/json/getAndActivateGridState", {grid: getGridName()}).success(function (resp) {
                    if (!resp) {
                        logger.error("Настройки не были ни разу сохранены");
                        return;
                    }
                    applyGridState(resp);
                });
            }

            scope.vm.toggleToolpanel = function () {
                if (!scope.vm.toolPanel && scope.vm.groupHeaders) {
                    scope.vm.groupHeaders = false;
                    scope.vm.gridOptions.api.setColumnDefs(scope.vm.getColDefs());
                }

                scope.vm.toolPanel = !scope.vm.toolPanel;
                scope.vm.gridOptions.api.showToolPanel(scope.vm.toolPanel);
            }

            scope.$watch("vm.defaultColState", function () {
                if (!scope.vm.defaultColState) return;
                $http.get("/json/getActiveGridState", {
                    params: {grid: getGridName()}
                }).success(function (resp) {
                    if (resp) {
                        applyGridState(resp);
                    }
                });

//                logger.info("Загружено " + JSON.stringify(Object.keys(scope.vm.defaultColState || {} ).length) );
            });
        }
    }

})();