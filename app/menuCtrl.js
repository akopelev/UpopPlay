(function () {
    "use strict";

    angular.module("app").controller("MenuCtrl", [
        "cx", '$scope', 'logger', '$location', '$window', '$state', '$mdSidenav', '$mdMedia', '$q', 'html', 'urlUtil',
        MenuCtrl]);


    function MenuCtrl(cx, $scope, logger, $location, $window, $state, $mdSidenav, $mdMedia, $q, html, urlUtil) {
//        i18nService.setCurrentLang('ru');

        var vm = this;
        //vm.locked = true;

        vm.isSidenavLockedOpen = function () {
            return $mdMedia('gt-md') && cx.isLocked();
        }

        vm.showLock = function () {
            return $mdMedia('gt-md') && !cx.isLocked();
        }
        vm.lock = function () {
            cx.setLocked(true);
        }
        vm.unlock = function () {
            cx.setLocked(false);
            $mdSidenav('left').close();
        }

        vm.showUnlock = function () {
            return $mdMedia('gt-md') && cx.isLocked();
        }
        //vm.menuOpen = function() {
        //    $mdSidenav('left').toggle();
        //}
        //vm.showMenuOpen = function() {
        //    return !$mdMedia('gt-md') || !vm.locked ;
        //}

        vm.isDev = function () {
            return cx.getDev();
        };

        vm.isPp = function () {
            return cx.perm() == 'pp' || cx.perm() == 'adm'
        };
        vm.isKpi = function () {
            return cx.perm() == 'kpi' || cx.perm() == 'chk'
        };
        //vm.title = (vm.isPp() ? 'Управление портфелем ОП' : vm.isKpi() ? 'Показатели' : 'Закупки') + ' ' + cx.title();
        vm.title = function() {
            return vm.isPp() ? 'УПОП' : 'УСРиМ app';
        }

        vm.menus = [
            {perm: 'rector', state: 'repHead', title: 'Контрактация и расходование', area: "bud"},
            {perm: 'rector', state: 'ppk', title: 'Показатели результативности', area: "bud"},

            {perm: 'play', state: 'toys', title: 'Реестр ОП', area: "play"},
            {perm: 'play', state: 'games', title: 'Показатели', area: "play"},
            {perm: 'play', state: 'toys', title: 'Исходные данные', area: "play"},

            //{perm: 'proj', state: 'buy', title:'+Закупка' },
            {perm: 'pdu', state: 'pds', title: 'Подать заявку', params: {status: 'all'}},
            {perm: 'pdu', state: 'pds', title: 'Утвержденные постдоки', params: {status: 'approved'}},

            {perm: 'pda', state: 'pds', title: 'Постдоки'},

            {perm: 'proj', state: 'buys', title: 'Закупки', area: "bud", params: {type: 'onProj'}},
            //{perm: 'proj', state: 'projBuys', title: 'Бюджет проекта'},
            {perm: 'proj', state: 'projRp', title: 'Отчёт'},

            {perm: 'read', state: 'projRp', title: 'Отчёт', area: "bud"},

            //{perm: 'boss', state: 'buy', title:'+Закупка' },
            {perm: 'boss', state: 'buys', title: 'Закупки', area: "bud", params: {type: 'onBoss'}},
            //{perm: 'boss', state: 'bossBuys', title: 'Планирование закупок'},
            {perm: 'boss', state: 'rp', title: 'Отчёты'},

            {perm: 'watch', state: 'rp', title: 'Отчёты', area: "bud"},

            {perm: 'secy', state: 'buys', title: 'У секретаря', area: "bud", params: {type: 'onSecy'}},
            {perm: 'meet', state: 'buys', title: 'Заседания', area: "bud", params: {type: 'onPanel'}},
            {perm: 'secy', state: 'buys', title: 'Планирование заседаний', area: "bud", params: {type: 'onPanel'}},
            {perm: 'secy', state: 'buys', title: 'Формирование протоколов', area: "bud", params: {type: 'onForm'}},
            {perm: 'secy', state: 'buys', title: 'Все закупки', area: "bud", params: {type: 'onAll'}},
            {perm: 'secy', state: 'rp', title: 'Отчёты', area: "bud"},

            {perm: 'secy', state: 'sins', title: 'Из 1С', area: "bud"},
            {perm: 'secy', state: 'souts', title: 'В 1С', area: "bud"},
            {perm: 'secy', state: 'drins', title: 'Из Директум', area: "bud"},
            {perm: 'secy', state: 'drouts', title: 'В Директум', area: "bud"},

            //{perm: 'secy', state: 'secyBuys', title: 'У секретаря', area: "bud"},
            //{perm: 'secy', state: 'meets', title: 'Заседания', area: "bud"},
            //
            //{perm: 'secy', state: 'Plan', title: 'Планирование заседаний', area: "bud"},
            //{perm: 'secy', state: 'prots', title: 'Формирование протокола', area: "bud"},
            //{perm: 'secy', state: 'allBuys', title: 'Все закупки', area: "bud"},
            //{perm: 'secy', state: 'drs', title: 'Обмен с СЭД', area: "bud"},
            //{perm: 'secy', state: 'ss', title: 'Обмен с 1С', area: "bud"},
            //
            //{perm: 'secy', state: 'plVals', title: 'Показатели', area: "pl"},

            ////// {perm: 'watch', state: 'plVals', title: 'Показатели', area: "pl"},
            {perm: 'read', state: 'plVals', title: 'Показатели', area: "pl"},
            {perm: 'watch', state: 'plVals', title: 'Показатели', area: "pl"},
            {perm: 'secy', state: 'plVals', title: 'Показатели', area: "pl"},

            {perm: 'mgr', state: 'users', title: 'Пользователи'},
            {perm: 'mgr', state: 'projUsers', title: 'Права сайтов проектов'},
            {perm: 'mgr', state: 'bossUsers', title: 'Права сайтов ответственных'},
            {perm: 'mgr', state: 'projs', title: 'Сайты проектов'},
            {perm: 'mgr', state: 'bosses', title: 'Сайты проректоров'},
            {perm: 'mgr', state: 'projTypes', title: 'Типы проектов'},
            {perm: 'mgr', state: 'inits', title: 'Инициативы'},
            {perm: 'mgr', state: 'tsks', title: 'Задачи'},
            {perm: 'secy', state: 'subs', title: 'Подзадачи', area: "bud"},
            {perm: 'secy', state: 'buyKpis', title: 'Индикаторы результативности', area: "bud"},
            {perm: 'secy', state: 'rms', title: 'Подзадачи ответственных', area: "bud"},

            {perm: 'kpi', state: 'heads', title: 'Участники команды'},
            {perm: 'kpi', state: 'articles', title: 'Статьи WoS/Scopus'},
            {perm: 'kpi', state: 'boffins', title: 'Российские ученые', params: {origin: 'rus'}},
            {perm: 'kpi', state: 'boffins', title: 'Зарубежные ученые', params: {origin: 'imp'}},
            {perm: 'kpi', state: 'incomes', title: 'Объемы доходов'},
            {perm: 'kpi', state: 'kcpVals', title: 'Показатели КЦП'},

            {perm: 'chk', state: 'heads', title: 'Участники команды'},
            {perm: 'chk', state: 'articles', title: 'Статьи WoS/Scopus'},
            {perm: 'chk', state: 'boffins', title: 'Российские ученые', params: {origin: 'rus'}},
            {perm: 'chk', state: 'boffins', title: 'Зарубежные ученые', params: {origin: 'imp'}},
            {perm: 'chk', state: 'incomes', title: 'Объемы доходов'},
            {perm: 'chk', state: 'kcpVals', title: 'Показатели КЦП'},

            {perm: 'pp', state: 'eps', title: 'Реестр ОП'},
            {perm: 'pp', state: 'kpiVals', title: 'Показатели'},
            {perm: 'pp', state: 'rawVals', title: 'Исходные данные'},
            {perm: 'pp', state: 'pmRawVals', title: 'Ввод исходных данных'},
            //{perm: 'pp', state: 'ppDeputies', title: 'Заместители'},

            {perm: 'adm', state: 'eps', title: 'Реестр ОП'},
            {perm: 'adm', state: 'kpiVals', title: 'Показатели'},
            {perm: 'adm', state: 'rawVals', title: 'Исходные данные'},
//            {perm: 'adm', state: 'admRawVals', title: 'Ввод исходных данных'},
            {perm: 'adm', state: 'pmRawVals', title: 'Согласование исходных данных'},
            {perm: 'adm', state: 'esbVals', title: 'Исходные данные шины'},
            {perm: 'adm', state: 'kpiKinds', title: 'Виды показателей'},
            {perm: 'adm', state: 'kpiDates', title: 'Периоды показателей'},
            {perm: 'adm', state: 'rawKinds', title: 'Виды исходных данных'},
            {perm: 'adm', state: 'rawDates', title: 'Периоды исходных данных'},
            {perm: 'adm', state: 'kpiInputStats', title: 'Статистика ввода показателей'},


            //{perm: 'pp', state: 'over', title: 'Характеристики ОП' },
            //{perm: 'pp', state: 'docs', title: 'Документация' },
            //{perm: 'pp', state: 'head', title: 'Kpi руководителя' },
            //{perm: 'pp', state: 'dev', title: 'Показатели развития ОП' },
            //{perm: 'pp', state: 'aux', title: 'Дополнительные показатели' },

        ];

        //if (vm.isDev) {
        //    vm.menus.push({perm: 'secy', state: 'tstMat', title:'tstMat' });
        //}

        vm.getPermMenus = function () {
            //return _.filter(vm.menus, "perm", $scope.perm);
            return vm.menus.filter(function (x) {
                    if (x.perm !== $scope.perm) return false;
                    if (!x.area) return true;
                    return x.area === $scope.area;
                }
            )
        };

        vm.selectMenu = function (menu) {
            vm.selected = menu;
            $state.go(menu.state, menu.params);
        }
        vm.toggleMenu = function () {
            $q.when(true).then(function () {
                $mdSidenav('left').toggle().then(function () {
                    console.log('toggled');
                });
            });
        }
        vm.isPp = function () {
            return cx.perm() == 'pp' || cx.perm() == 'adm'
        };
        vm.isPlay = function () {
            return cx.isPlay();
        };

        vm.isKpi = function () {
            return cx.perm() == 'kpi' || cx.perm() == 'chk'
        };
        vm.isProj = function () {
            return cx.isProj();
        };
        vm.isBoss = function () {
            return cx.isBoss();
        };
        vm.isMgr = function () {
            return cx.isMgr();
        };
        vm.isRector = function () {
            return cx.isRector();
        };
        vm.isSecy = function () {
            return cx.isSecy();
        };
        vm.isMeet = function () {
            return cx.isMeet();
        };
        vm.isNone = function () {
            return cx.isNone();
        };

        vm.onBuyProjAsWriter = function () {
            return cx.isWriter() && cx.isBuy() && cx.onProj();
        }

        vm.onBuyBossAsWriter = function () {
            return cx.isWriter() && cx.isBuy() && cx.onBoss();
        }

        vm.isManager = function () {
            return cx.isManager();
        }

        vm.onSecyAsWriter = function () {
            return cx.isWriter() && cx.onSecy();
        }

        vm.onSecyAsReader = function () {
            return cx.isReader() && cx.onSecy();
        }

        vm.isNone = function () {
            return cx.isNone();
        }

        //vm.isAdm = function () { return bs.isAdm(); }

        vm.toggleTitle = function (ev) { //todo
            vm.title = "Показатели Кружаева Р.Л.";
        }

        vm.selectCx = function (ev) {
            if (!vm.isDev()) {
                if (vm.isPp()) {
                    html.alert("Управление портфелем образовательных программ", "Для входа под другим пользователем в chrome/firefox перезапустите, пожалуйста, браузер")
                    //$window.location.href = "https://sts.urfu.ru/adfs/ls/?wa=wsignout1.0";
                } else {
                    $window.location.href = vm.isPp() ? '' : urlUtil.getBackPortalUrl(urlUtil.getSPHostUrl()); // urlUtil.getSPHostUrl();
                    //$location.path(urlUtil.getSPHostUrl());
                }
                return;
            }
            if (vm.isPp()) {
                html.dlg('pp', 'selectPp', ev, {a: 1}).then(function (userIdUrlAndPerm) {
                    $window.location.href = '/?startState=bud&SPHostUrl=' + userIdUrlAndPerm.url + '&userId=' + userIdUrlAndPerm.userId + '&perm=' + userIdUrlAndPerm.perm + ($scope.dev ? '&dev=1' : '');
                });
            } else {
                cx.selectCxModal().then(function () {
                    //$location.path('/?startState=bud&SPHostUrl=' + $scope.url + '&perm=' + $scope.perm + ($scope.dev ? '&dev=1' :''));
                    $window.location.href = '/?startState=' + $scope.area + '&SPHostUrl=' + $scope.url + '&perm=' + $scope.perm + ($scope.dev ? '&dev=1' : '');
                    logger.success("Context changed")
                });
            }
        };

//        $scope.$watch('vm.webType', function (value) {
//            if (value) {
//                bs.setWebType(value);
//                console.log('Change webType ' + value);
//            }
//        });

    }
}
());
