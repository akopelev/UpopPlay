(function () {
    "use strict";

    angular
        .module("app")
        .factory("html", ['$mdDialog', '$http', html]);

    function html($mdDialog, $http) {
        var agGridLocaleText = {
            page: 'Стр.',
            more: 'Еще',
            to: 'До',
            of: 'Из',
            next: 'Вперед',
            last: 'Посл.',
            first: 'Первая',
            previous: 'Назад',
            loadingOoo: 'Загрузка...',
            // for set filter
            selectAll: 'Выбрать все',
            searchOoo: 'Поиск...',
            blanks: 'Пусто',
            // for number filter
            equals: 'Равно',
            lessThan: 'Меньше Чем',
            greaterThan: 'Больше чем',
            applyFilter: 'Применить',
            filterOoo: 'Фильтр...',
            // for text filter
            contains: 'Содержит',
            startsWith: 'Начинается с',
            endsWith: 'Заканчивается на',
            // the header of the default group column
            group: 'Группа',
            // tool panel
            columns: 'Поля',
            rowGroupColumns: 'Групповые столбцы',
            rowGroupColumnsEmptyMessage: 'перетащите столбцы сюда для группировки',
            valueColumns: 'Поля значений',
            valueColumnsEmptyMessage: 'Перетащите поля сюда',
// other
            noRowsToShow: 'нет строк',
            // enterprise menu
            toolPanel: 'Настройка',
            pinColumn: 'Закрепить столбец',
            valueAggregation: 'Числовая агрегация',
            autosizeThiscolumn: 'Авторазмер столбца',
            autosizeAllColumns: 'Авторазмер всех столбцов',
            groupBy: 'Группировать по',
            ungroupBy: 'Снять группировку по',
            resetColumns: 'Сбросить столбцы',
            expandAll: 'Раскрыть всё',
            collapseAll: 'Схлопнуть всё',
            // enterprise menu pinning
            pinLeft: 'Закрепить <<',
            pinRight: 'Закрепить >>',
            noPin: 'Не закреплять <>',
            // enterprise menu aggregation and status panel
            sum: 'Сумма',
            min: 'Мин.',
            max: 'Макс.',
            none: 'Нет',
            count: 'Кол-во',
            average: 'laAverage',
            // standard menu
            copy: 'Копировать',
            ctrlC: 'Ctrl+C',
            paste: 'Вставить',
            ctrlV: 'Ctrl+V'
        };

        return {
            personSearch: personSearch,
            updateRowData: updateRowData,
            getGroupKeys: getGroupKeys,
            setGroupKeys: setGroupKeys,
            setGroupHeader: setGroupHeader,
            gridBtn: gridBtn,
            gridBtns: gridBtns,
            dlg: dlg,
            alert: alert,
            confirm: confirm,
            wrapped: wrapped,
            askForText: askForText,
            askForDoc: askForDoc,
            boolValueGetter: boolValueGetter,
            setPropInRange: setPropInRange,
            sumRenderer: sumRenderer,
            wrappedRenderer: wrappedRenderer,
            headerCellRenderer: headerCellRenderer,
            dateRenderer: dateRenderer,
            linkRenderer: linkRenderer,
            dateTimeRenderer: dateTimeRenderer,
            askForDelete: askForDelete,
            parseCommed: parseCommed,
            formatCommed: formatCommed,
            getTotalsData: getTotalsData,
            docLinkRenderer: docLinkRenderer,
            getCvs: getCvs,
            agGridLocaleText: agGridLocaleText
        }


        function docLinkRenderer(filenameField) {
            return function (params) {
                var title = filenameField ? params.data[filenameField] : "Файл";
                return params.value ? '<a href="/json/GetDoc?id=' + params.value + '">' + title + "</a>" : '';
            }
        }

        function linkRenderer(hrefField) {
            return function (params) {
                var href = params.data[hrefField];
                return href ? "<a href='" + href + "'>" + params.value + "</a>" : '';
            }
        }

        function getTotalsData(rowData, aggFields) {
            if (rowData.length == 0) return null;
            var result = angular.copy(rowData[0]);
            for (var key in result) {
                result[key] = '';
            }
            for (var i = 0; i < aggFields.length; i++) {
                var aggField = aggFields[i];
                result[aggField] = _.sumBy(rowData, function (data) {
                    return data[aggField];
                });
            }
            return [result];
        }
        function getGroupColDefs(gridOptions) {
            return _.map(gridOptions.columnApi.getRowGroupColumns(), 'colDef');
        }

        function getGroupKeys(gridOptions) {
            return _.map(getGroupColDefs(gridOptions), 'field');
        }

        function setGroupKeys(colDefs, groupKeys) {
            if (!groupKeys || groupKeys.length < 0) return;
            //var groupKeys = groupSpaceString.split(" ");
            colDefs.forEach(function (colDef) {
                var rowGroupIndex = _.indexOf(groupKeys, colDef.field);
                if (rowGroupIndex >= 0) colDef.rowGroupIndex = rowGroupIndex;
            });
        }

        function setGroupHeader(gridOptions) {
            var groupColDef = _.find(_.map(gridOptions.columnApi.getAllColumns(),'colDef'), {'cellRenderer' : {'renderer': 'group'}});
            var fieldHeader = /(?:.*\/ |)(.*)/.exec(groupColDef.headerName)[1]; // last word, separator: "/ "
            groupColDef.headerName = _.join( _.map(getGroupColDefs(gridOptions),'headerName'),'/ ') + '/ ' + fieldHeader;
        }

        function parseCommed(str) {
            return parseFloat(str.replace(',', '.'));
        }

        function formatTripleSpaced(nStr) {
            var remainder = nStr.length % 3;
            return (nStr.substr(0, remainder) + nStr.substr(remainder).replace(/(\d{3})/g, ' $1')).trim();
        }

        function formatCommedAndTripleSpaced(number) {
            return formatTripleSpaced(Math.floor(number).toString()) + "," + number.toFixed(2).slice(-2);
        }

        function formatCommed(number) {
            return number.toString().replace('.', ',');
        }

        function boolValueGetter(params) {
            return params.data ? (params.data[params.colDef.field] ? 'да' : 'нет') : '';
        }

        function wrapped(text) {
            return text ? "<span style='white-space: normal;' title='" + text + "'>" + text + "</span>" : "";
        }

        function wrappedRenderer(params) {
            return wrapped(params.value);
        }
        function headerCellRenderer(params) {
            return wrapped(params.colDef.headerName);
        }

        function sumRenderer(params) {
            return formatCommedAndTripleSpaced(params.value); // params.value ? formatCommed(params.value.toFixed(2)):'';
        }

        function personSearch(query) {
            return $http.get('/mgr/getPersons',{params: {lastNameStart: query}}).then(function(response){
                return response.data;
            });
        }

        function zeroPad(num) {
            return (num > 9 ? '' : '0') + num;
        }

        function dateRenderer(params) {
            if (!params.value) return '';
            var date = new Date(params.value);
            return zeroPad(date.getDate()) + '.' + zeroPad(date.getMonth() + 1) + '.' + date.getFullYear();
        }

        function dateTimeRenderer(params) {
            if (!params.value) return '';
            var date = new Date(params.value);
            return zeroPad(date.getDate()) + '.' + zeroPad(date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + zeroPad(date.getHours()) + ':' + zeroPad(date.getMinutes());
        }

        function setPropInRange(arr, defaultValue, propName) {
            if (angular.isUndefined(propName)){
                return arr.indexOf(defaultValue) >= 0 ? defaultValue : arr[0];
            }
            return _.some(arr, [propName, defaultValue]) ? defaultValue : arr[0][propName];
        }

        function gridBtn(name, tooltip) { // name - also as a function name and icon
            return '<md-button class="md-fab md-raised md-mini" style="margin-top: 0px"  aria-label="'
                + tooltip + '" ng-click=\"' + name + '(data, $event)\"><md-tooltip>'
                + tooltip + '</md-tooltip><md-icon class="grid-icon"  md-svg-icon="' + name + '"></md-icon></md-button>';
        }

        function gridBtns(btns, scope, node) { //{show: bs.inProj(buy), name: 'send', tooltip: 'Послать ответственному', func: send},
            var result = "";
            btns.map(function (btn) {
                result += '<md-button class="md-fab md-raised md-mini oper" style="margin-top: 0px"  aria-label="'
                    + btn.tooltip + '" ng-click=\"' + btn.name + '(data, $event, node)\"><md-tooltip>'
                    + btn.tooltip + '</md-tooltip><md-icon class="grid-icon"  md-svg-icon="' + btn.name + '"></md-icon></md-button>';
                scope[btn.name] = btn.func;
                if (node) {
                    scope.node = node;
                }
            })
            return result;
        }

        function dlg(perm, name, ev, params) {
            return $mdDialog.show({
                controller: name + 'Dlg as vm',
                templateUrl: '/app/' + perm + '/dlg/' + name + 'Dlg.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    params: params
                }
            });
        }

        function askForText(ev, label, defaultText, title) {
            return $mdDialog.show({
                controller: 'askForTextDlg as vm',
                templateUrl: '/app/services/askForTextDlg.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    label: label,
                    defaultText: defaultText,
                    title: title
                }
            });
        }

        function askForDoc(ev, action, id) { // some id
            return $mdDialog.show({
                controller: 'docDlg as vm',
                templateUrl: '/app/services/docDlg.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    action: action,
                    id: id
                }
            });
        }

        function askForDelete(text, ev) {
            return confirm("Удаление", "Удалить " + text + "?", ev);
        }

        function confirm(title, body, ev) {
            var confirm = $mdDialog.confirm()
                .title(title)
                .textContent(body)
                .ariaLabel('confirm')
                .targetEvent(ev)
                .ok('ОК')
                .cancel('Отмена');
            return $mdDialog.show(confirm);
        }

        function alert(title, body, ev) {
            var alert = $mdDialog.confirm()
                .title(title)
                .textContent(body)
                .ariaLabel('confirm')
                .targetEvent(ev)
                .ok('ОК')
            return $mdDialog.show(alert);
        }

        function updateRowData(grid, rowData, newRowData) {
            if (!newRowData) return;
            var rows = [];
            newRowData.forEach(function(newData) {
                var row = _.find(rowData, {id: newData.id });
                _.assign(row, newData);
                rows.push(row);
            })
            grid.api.rowDataChanged(rows);
        }

        function getCvs(api) {
            var LINE_SEPARATOR = '\r\n';
            var result = '';
            var columnsToExport = api.columnController.getDisplayedColumns();
            columnsToExport.forEach(function (column, index) {
                var nameForCol = api.columnController.getDisplayNameForCol(column);
                if (nameForCol === null || nameForCol === undefined) {
                    nameForCol = '';
                }
                if (index != 0) {
                    result += ';';
                }
                result += '"' + api.escape(nameForCol) + '"';
            });
            result += LINE_SEPARATOR;
            api.rowController.forEachNodeAfterFilterAndSort(function (node) {
                if (skipGroups && node.group) {
                    return;
                }
                if (skipFooters && node.footer) {
                    return;
                }
                columnsToExport.forEach(function (column, index) {
                    var valueForCell;
                    if (node.group && index === 0) {
                        valueForCell = api.createValueForGroupNode(node);
                    }
                    else {
                        valueForCell = api.valueService.getValue(column.colDef, node.data, node);
                    }
                    if (valueForCell === null || valueForCell === undefined) {
                        valueForCell = '';
                    }
                    if (index != 0) {
                        result += ';';
                    }
                    result += '"' + api.escape(valueForCell) + '"';
                });
                result += LINE_SEPARATOR;
            });
        }

    }
}());
