(function () {
    "use strict";
    agGrid.initialiseAgGridWithAngular1(angular);
    var app = angular.module("app",
        [
            "common.services",
            "ui.router",
            'ngAnimate',
//            'ngTouch',
//        "breeze.angular",
            "agGrid",
            "ui.bootstrap",
            'ngMaterial',
            'ngMessages',
            'textAngular'
//        "ui.grid",
//        "ui.grid.expandable",
//        'ui.grid.autoResize',
//        'ui.grid.resizeColumns',
//        'ui.grid.edit',
//        'ui.grid.grouping',
//        'ui.grid.exporter',
//        'ui.grid.selection',
//        'ui.grid.pinning'
//        'ngDropzone',
        ]).run(function ($templateCache) {
        //angular.forEach(assetMap, function (value, key) {
        //    $templateCache.put(key, value);
        //});
    });

    app.config([
            "$stateProvider",
            "$urlRouterProvider",
            "$mdIconProvider",
            "$mdThemingProvider",
            "$mdDateLocaleProvider",
            "$provide",
            "$httpProvider",
            function ($stateProvider, $urlRouterProvider, $mdIconProvider, $mdThemingProvider, $mdDateLocaleProvider, $provide,
                $httpProvider) {

                $provide.factory('ErrorInterceptor', ['$q', 'logger', function ($q, logger) {
                    return {
                        responseError: function(rejection) {
                            console.log(rejection);
                            if (rejection.statusText) {
                                logger.error("Ошибка сервера " + rejection.statusText, "Обновите, пожалуйста, кэш и попробуйте еще раз" );
                            }
                            return $q.reject(rejection);
                        }
                    };
                }]);

                $httpProvider.interceptors.push('ErrorInterceptor');

                $mdDateLocaleProvider.months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
                $mdDateLocaleProvider.shortMonths = ['янв', 'фев', 'мрт', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
                $mdDateLocaleProvider.days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
                $mdDateLocaleProvider.shortDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
                $mdDateLocaleProvider.firstDayOfWeek = 1;
                $mdDateLocaleProvider.formatDate = function (date) {
                    return moment(date).format('DD.MM.YYYY');
                };
                $mdDateLocaleProvider.parseDate = function(dateString) {
                    var m = moment(dateString, 'DD.MM.YYYY', true);
                    return m.isValid() ? m.toDate() : new Date(NaN);
                };
                //$mdThemingProvider.theme('docs-dark', 'default')
                //    .primaryPalette('yellow')
                //    .backgroundPalette('blue')
                //    .accentPalette('orange')
                //    .primaryPalette('teal')
                //    .dark();
                $mdThemingProvider.definePalette('amazingPaletteName', {
                    '50': 'ffebee',
                    '100': 'ffcdd2',
                    '200': 'ef9a9a',
                    '300': 'e57373',
                    '400': 'ef5350',
                    '500': 'f44336',
                    '600': 'e53935',
                    '700': 'd32f2f',
                    '800': 'c62828',
                    '900': 'b71c1c',
                    'A100': 'ff8a80',
                    'A200': 'ff5252',
                    'A400': 'ff1744',
                    'A700': 'd50000',
                    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                        // on this palette should be dark or light
                    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                        '200', '300', '400', 'A100'],
                    'contrastLightColors': undefined    // could also specify this if default was 'dark'
                });
                $mdThemingProvider.theme('default')
                    .primaryPalette('green')
                    //     ,{
                    //     'default': '900', // by default use shade 400 from the pink palette for primary intentions
                    //     'hue-1': '700', // use shade 100 for the <code>md-hue-1</code> class
                    //     'hue-2': '500',
                    //     'hue-3': 'A100' }
                    // )
                    .accentPalette('orange');
                $mdIconProvider
                    .iconSet('communication', '/Content/svg/communication.svg', 24)
                    .icon('edit', '/Content/svg/ic_mode_edit_black_18px.svg')
                    .icon('attach', '/Content/svg/ic_attach_file_black_18px.svg')
                    .icon('menu', '/Content/svg/ic_menu_black_18px.svg')
                    .icon('approve', '/Content/svg/ic_thumb_up_black_18px.svg')
                    .icon('reject', '/Content/svg/ic_thumb_down_black_18px.svg')
                    .icon('input', '/Content/svg/ic_input_black_18px.svg')

                    .icon('warning', '/Content/svg/ic_warning_black_18px.svg')
                    .icon('dragHandle', '/Content/svg/ic_drag_handle_black_18px.svg')

                    .icon('time', '/Content/svg/ic_access_time_black_18px.svg')

                    .icon('addCircle', '/Content/svg/ic_add_circle_outline_black_18px.svg')
                    .icon('editDecision', '/Content/svg/ic_description_black_18px.svg')
                    .icon('removeOutline', '/Content/svg/ic_remove_circle_outline_black_18px.svg')
                    .icon('settings', '/Content/svg/ic_settings_black_18px.svg')
                    .icon('refresh', '/Content/svg/ic_refresh_black_18px.svg')
                    .icon('add', '/Content/svg/ic_add_black_18px.svg')
                    .icon('remove', '/Content/svg/ic_remove_black_18px.svg')
                    .icon('attachment', '/Content/svg/ic_attachment_black_18px.svg')
                    .icon('protocol', '/Content/svg/ic_description_black_18px.svg')
                    .icon('commment', '/Content/svg/ic_comment_black_18px.svg')
                    .icon('panel', '/Content/svg/ic_supervisor_account_black_18px.svg')
                    .icon('people', '/Content/svg/ic_people_black_18px.svg')
                    .icon('addToSess', '/Content/svg/ic_playlist_add_black_18px.svg')
                    .icon('return', '/Content/svg/ic_keyboard_return_black_18px.svg')
                    .icon('back', '/Content/svg/ic_arrow_back_black_18px.svg')
                    .icon('delete', '/Content/svg/ic_delete_black_18px.svg')
                    .icon('deleteSweep', '/Content/svg/ic_delete_sweep_black_18px.svg')
                    .icon('change', '/Content/svg/ic_border_color_black_18px.svg')
                    .icon('email', '/Content/svg/ic_email_black_18px.svg')

                    .icon('addBlack', '/Content/svg/ic_add_circle_black_18px.svg')
                    .icon('swapBlack', '/Content/svg/ic_swap_vertical_circle_black_18px.svg')
                    .icon('checkBlack', '/Content/svg/ic_check_circle_black_18px.svg')
                    .icon('removeBlack', '/Content/svg/ic_remove_circle_black_18px.svg')

                    .icon('exec', '/Content/svg/ic_payment_black_18px.svg')
                    .icon('name', '/Content/svg/ic_text_format_black_18px.svg')
                    .icon('sum', '/Content/svg/ic_attach_money_black_18px.svg')
                    .icon('cancel', '/Content/svg/ic_cancel_black_18px.svg')
                    .icon('selectAll', '/Content/svg/ic_select_all_black_18px.svg')

                    .icon('cols', '/Content/svg/ic_view_column_black_18px.svg')
                    .icon('restore', '/Content/svg/ic_settings_backup_restore_black_18px.svg')
                    .icon('save', '/Content/svg/ic_save_black_18px.svg')

                    .icon('clone', '/Content/svg/ic_content_copy_black_18px.svg')
                    .icon('shift', '/Content/svg/ic_compare_arrows_black_18px.svg')
                    .icon('lock', '/Content/svg/ic_lock_outline_black_18px.svg')
                    .icon('unlock', '/Content/svg/ic_lock_open_black_18px.svg')
                    .icon('lockBlack', '/Content/svg/ic_lock_black_18px.svg')

                    .icon('send', '/Content/svg/ic_send_black_18px.svg')
                    .icon('doneAll', '/Content/svg/ic_done_all_black_18px.svg')
                    .icon('done', '/Content/svg/ic_done_black_18px.svg')
                    .icon('history', '/Content/svg/ic_history_black_18px.svg')
                    .icon('numbered', '/Content/svg/ic_format_list_numbered_black_18px.svg')
                    .icon('libraryAdd', '/Content/svg/ic_library_add_black_18px.svg')
                    .icon('addBox', '/Content/svg/ic_add_box_black_18px.svg')
                    .icon('expand', '/Content/svg/ic_expand_more_black_18px.svg')
                    .icon('collapse', '/Content/svg/ic_expand_less_black_18px.svg')
                    .icon('filter', '/Content/svg/ic_filter_list_black_18px.svg')
                    .icon('notInterested', '/Content/svg/ic_not_interested_black_18px.svg')
                    .icon('gridOn', '/Content/svg/ic_grid_on_black_18px.svg')
                    .icon('close', '/Content/svg/ic_close_black_18px.svg')
                    .icon('importExport', '/Content/svg/ic_import_export_black_18px.svg')
                    .icon('undo', '/Content/svg/ic_undo_black_18px.svg')
                    .icon('description', '/Content/svg/ic_description_black_18px.svg');


                $urlRouterProvider.otherwise(function ($injector, $location) {
                    if ($location.absUrl().indexOf("startState") < 0) return "/";
                    var urlEnd = $location.absUrl().substring($location.absUrl().indexOf("startState") + 11);
                    return "/" + urlEnd.substring(0, urlEnd.indexOf("&"));
                });

                $stateProvider
                    .state("repHead", {
                        url: "/repHead",
                        templateUrl: "/app/ppk/repHeadView.html",
                        controller: "repHeadListCtrl as vm"
                    })
                    .state("ppk", {
                        url: "/ppk",
                        templateUrl: "/app/ppk/ppkListView.html",
                        controller: "ppkListCtrl as vm"
                    })
                    .state("toys", {
                        url: "/toys",
                        templateUrl: "/app/play/toys.html",
                        controller: "toysCtrl as vm"
                    })
                    .state("games", {
                        url: "/games",
                        templateUrl: "/app/play/games.html",
                        controller: "gamesCtrl as vm"
                    })
                    .state("sins", {
                        url: "/sins",
                        templateUrl: "/app/buy/sins.html",
                        controller: "sinsCtrl as vm"
                    })
                    .state("souts", {
                        url: "/sout",
                        templateUrl: "/app/buy/souts.html",
                        controller: "soutsCtrl as vm"
                    })
                    .state("drins", {
                        url: "/drins",
                        templateUrl: "/app/buy/drins.html",
                        controller: "drinsCtrl as vm"
                    })
                    .state("drouts", {
                        url: "/drouts",
                        templateUrl: "/app/buy/drouts.html",
                        controller: "droutsCtrl as vm"
                    })
                    .state("buys", {
                        url: "/buys/:type/:meetId",
                        templateUrl: "/app/buy/buys.html",
                        controller: "buysCtrl as vm"
                    })
                    .state("meets", {
                        url: "/meets",
                        templateUrl: "/app/buy/meets.html",
                        controller: "meetsCtrl as vm"
                    })
                    .state("ppDeputies", {
                        url: "/ppDeputies",
                        templateUrl: "/app/pp/ppDeputiesView.html",
                        controller: "ppDeputiesCtrl as vm"
                    })
                    .state("plVals", {
                        url: "/plVals",
                        templateUrl: "/app/pl/plValsView.html",
                        controller: "plValsCtrl as vm"
                    })
                    .state("kpiInputStats", {
                        url: "/kpiInputStats",
                        templateUrl: "/app/pp/kpiInputStats.html",
                        controller: "kpiInputStatsCtrl as vm"
                    })
                    .state("esbVals", {
                        url: "/esbVals",
                        templateUrl: "/app/pp/esbValsView.html",
                        controller: "esbValsCtrl as vm"
                    })
                    .state("rawDates", {
                        url: "/rawDates",
                        templateUrl: "/app/pp/rawDatesView.html",
                        controller: "rawDatesCtrl as vm"
                    })
                    .state("kpiDates", {
                        url: "/kpiDates/:kindId",
                        templateUrl: "/app/pp/kpiDatesView.html",
                        controller: "kpiDatesCtrl as vm"
                    })
                    .state("pds", {
                        url: "/pds/:status",
                        templateUrl: "/app/pd/pdsView.html",
                        controller: "pdsCtrl as vm"
                    })
                    .state("kcpVals", {
                        url: "/kcpVals",
                        templateUrl: "/app/kpi/kcpValsView.html",
                        controller: "kcpValsCtrl as vm"
                    })
                    .state("heads", {
                        url: "/heads/:rowHeight",
                        templateUrl: "/app/kpi/headsView.html",
                        controller: "headsCtrl as vm"
                    })
                    .state("articles", {
                        url: "/articles/:rowHeight",
                        templateUrl: "/app/kpi/articlesView.html",
                        controller: "articlesCtrl as vm"
                    })
                    .state("boffins", {
                        url: "/boffins/:origin/:rowHeight",
                        templateUrl: "/app/kpi/boffinsView.html",
                        controller: "boffinsCtrl as vm"
                    })
                    .state("incomes", {
                        url: "/incomes/:rowHeight",
                        templateUrl: "/app/kpi/incomesView.html",
                        controller: "incomesCtrl as vm"
                    })
                    .state("head", {
                        url: "/head/:id",
                        templateUrl: "/app/kpi/forms/headView.html",
                        controller: "headCtrl as vm"
                    })
                    .state("article", {
                        url: "/article/:id",
                        templateUrl: "/app/kpi/forms/articleView.html",
                        controller: "articleCtrl as vm"
                    })
                    .state("boffin", {
                        url: "/boffin/:id?origin",
                        templateUrl: "/app/kpi/forms/boffinView.html",
                        controller: "boffinCtrl as vm"
                    })
                    .state("income", {
                        url: "/income/:id",
                        templateUrl: "/app/kpi/forms/incomeView.html",
                        controller: "incomeCtrl as vm"
                    })
                    .state("eps", {
                        url: "/eps/:id",
                        templateUrl: "/app/pp/epsView.html",
                        controller: "epsCtrl as vm"
                    })
                    //.state("ep", {
                    //    url: "/ep/:id",
                    //    templateUrl: "/app/pp/epView.html",
                    //    controller: "epCtrl as vm"
                    //})
                    .state("over", {
                        url: "/over/:id",
                        templateUrl: "/app/pp/overView.html",
                        controller: "overCtrl as vm"
                    })
                    .state("kpiVals", {
                        url: "/kpiVals/:id",
                        templateUrl: "/app/pp/kpiValsView.html",
                        controller: "kpiValsCtrl as vm"
                    })
                    .state("kpiKinds", {
                        url: "/kpiKinds/:id",
                        templateUrl: "/app/pp/kpiKindsView.html",
                        controller: "kpiKindsCtrl as vm"
                    })
                    .state("rawKinds", {
                        url: "/rawKinds/:id",
                        templateUrl: "/app/pp/rawKindsView.html",
                        controller: "rawKindsCtrl as vm"
                    })
                    .state("rawVals", {
                        url: "/rawVals/:id",
                        templateUrl: "/app/pp/rawValsView.html",
                        controller: "rawValsCtrl as vm"
                    })
                    .state("admRawVals", {
                        url: "/admRawVals/:id",
                        templateUrl: "/app/pp/admRawValsView.html",
                        controller: "admRawValsCtrl as vm"
                    })
                    .state("pmRawVals", {
                        url: "/pmRawVals",
                        templateUrl: "/app/pp/pmRawValsView.html",
                        controller: "pmRawValsCtrl as vm"
                    })
                    .state("sentRawVals", {
                        url: "/sentRawVals",
                        templateUrl: "/app/pp/sentRawValsView.html",
                        controller: "sentRawValsCtrl as vm"
                    })
                    .state("kpiFullHists", {
                        url: "/kpiFullHists",
                        templateUrl: "/app/pp/kpiFullHistsView.html",
                        controller: "kpiFullHistsCtrl as vm"
                    })
                    .state("kpiVal", {
                        url: "/kpiVal/:id",
                        templateUrl: "/app/pp/kpiValsView.html",
                        controller: "kpiValsCtrl as vm"
                    })
                    .state("home", {
                        url: "/",
                        templateUrl: "/app/welcomeView.html"
                    })
                    .state("changeBuy", {
                        url: "/changeBuy/:id",
                        templateUrl: "/app/proj/changeBuyView.html",
                        controller: "changeBuyCtrl as vm"
                    })
                    .state("buy", {
                        url: "/buy/:id",
                        templateUrl: "/app/proj/buyView.html",
                        controller: "buyCtrl as vm"
                    })
                    .state("projUsers", {
                        url: "/projUsers",
                        templateUrl: "/app/mgr/projUsersView.html",
                        controller: "projUsersCtrl as vm"
                    })
                    .state("projTypes", {
                        url: "/projTypes",
                        templateUrl: "/app/mgr/projTypesView.html",
                        controller: "projTypesCtrl as vm"
                    })
                    .state("projs", {
                        url: "/projs",
                        templateUrl: "/app/mgr/projsView.html",
                        controller: "projsCtrl as vm"
                    })
                    .state("inits", {
                        url: "/inits",
                        templateUrl: "/app/mgr/initsView.html",
                        controller: "initsCtrl as vm"
                    })
                    .state("tsks", {
                        url: "/tsks",
                        templateUrl: "/app/mgr/tsksView.html",
                        controller: "tsksCtrl as vm"
                    })
                    .state("subs", {
                        url: "/subs",
                        templateUrl: "/app/mgr/subsView.html",
                        controller: "subsCtrl as vm"
                    })
                    .state("buyKpis", {
                        url: "/buyKpis",
                        templateUrl: "/app/mgr/buyKpisView.html",
                        controller: "buyKpisCtrl as vm"
                    })
                    .state("rms", {
                        url: "/rms",
                        templateUrl: "/app/mgr/rmsView.html",
                        controller: "rmsCtrl as vm"
                    })
                    .state("bosses", {
                        url: "/bosses",
                        templateUrl: "/app/mgr/bossesView.html",
                        controller: "bossesCtrl as vm"
                    })
                    .state("bossUsers", {
                        url: "/bossUsers",
                        templateUrl: "/app/mgr/bossUsersView.html",
                        controller: "bossUsersCtrl as vm"
                    })
                    .state("drs", {
                        url: "/drs",
                        templateUrl: "/app/secy/drsView.html",
                        controller: "drsCtrl as vm"
                    })
                    .state("ss", {
                        url: "/ss",
                        templateUrl: "/app/secy/ssView.html",
                        controller: "ssCtrl as vm"
                    })
                    .state("users", {
                        url: "/users",
                        templateUrl: "/app/mgr/usersView.html",
                        controller: "usersCtrl as vm"
                    })
                    //.state("bossBuy", {
                    //    url: "/bossBuy",
                    //    templateUrl: "/app/proj/bossBuyView.html",
                    //    controller: "bossBuyCtrl as vm",
                    //    resolve: {
                    //        buy: function($http, $stateParams) {
                    //            var id = $stateParams.id;
                    //            if (id == 0) return null;
                    //            return $http.get("");
                    //        }
                    //    }
                    //})
                    .state("tstMat", {
                        url: "/tstMat",
                        templateUrl: "/app/tst/tstMat.html",
                        controller: "tstMat as vm"

                    })
                    .state("tstMatTab", {
                        url: "/tstMatTab",
                        templateUrl: "/app/tst/tstMatTab.html",
                        controller: "tstMatTab"
                    })
                    .state("tstAGAng", {
                        url: "/tstAGAng",
                        templateUrl: "/app/tst/tstAGAng.html",
                        controller: "tstAGAng"

                    })
                    .state("tst", {
                        url: "/tst",
                        templateUrl: "/app/tst/tstView.html",
                        controller: "tstCtrl"

                    })
                    .state("meetList", {
                        url: "/meetList",
                        templateUrl: "/app/buys/meetListView.html",
                        controller: "meetListCtrl as vm"
                    })
                    .state("projBuys", {
                        url: "/projBuys",
                        templateUrl: "/app/proj/projBuysView.html",
                        controller: "projBuysCtrl as vm"
                    })
                    .state("bossBuys", {
                        url: "/bossBuys",
                        templateUrl: "/app/boss/bossBuysView.html",
                        controller: "bossBuysCtrl as vm"
                    })
                    .state("protList", {
                        url: "/protList",
                        templateUrl: "/app/buys/protListView.html",
                        controller: "protListCtrl as vm"
                    })
                    // --------- secy --------
                    .state("secyBuys", {
                        url: "/secyBuys",
                        templateUrl: "/app/secy/secyBuysView.html",
                        controller: "secyBuysCtrl as vm"
                    })
                    .state("Plan", {
                        url: "/Plan",
                        templateUrl: "/app/secy/planView.html",
                        controller: "planCtrl as vm"
                    })
                    .state("prots", {
                        url: "/prots",
                        templateUrl: "/app/secy/protsView.html",
                        controller: "protsCtrl as vm"
                    })
                    .state("allBuys", {
                        url: "/allBuys",
                        templateUrl: "/app/secy/allBuysView.html",
                        controller: "allBuysCtrl as vm"
                    })
                    .state("rp", {
                        url: "/rp",
                        templateUrl: "/app/secy/rpView.html",
                        controller: "rpCtrl as vm"
                    })
                    .state("projRp", {
                        url: "/projRp",
                        templateUrl: "/app/proj/projRpView.html",
                        controller: "projRpCtrl as vm"
                    })
                    //                    .state("rep", {
                    //                        url: "/rep",
                    //                        templateUrl: "/app/secy/repView.html",
                    //                        controller: "repCtrl as vm",
                    //                        resolve: { group: function () { return "pa" } }
                    //                    })
                    //                    .state("repProj", {
                    //                        url: "/repProj",
                    //                        templateUrl: "/app/secy/repView.html",
                    //                        controller: "repCtrl as vm",
                    //                        resolve: { group: function () { return "proj" } }
                    //                    })
                    //                    .state("repProj", {
                    //                        url: "/repProj",
                    //                        templateUrl: "/app/secy/repProjView.html",
                    //                        controller: "repProjCtrl as vm"
                    //                    })
                    .state("reptSingleProj", {
                        url: "/reptSingleProj",
                        templateUrl: "/app/buys/reptSingleProjView.html",
                        controller: "reptSingleProjCtrl as vm"
                    })
                    //                    .state("buyPivot", {
                    //                        url: "/buyPivot",
                    //                        templateUrl: "/app/buys/buyPivotView.html",
                    //                        controller: "buyPivotCtrl as vm"
                    //                    })
                    //                    .state("kpiPivot", {
                    //                        url: "/kpiPivot",
                    //                        templateUrl: "/app/buys/kpiPivotView.html",
                    //                        controller: "kpiPivotCtrl as vm"
                    //                    })
                    .state("badm", {
                        url: "/badm",
                        templateUrl: "/app/badm/badmView.html",
                        controller: "BadmCtrl as vm"
                    });
            }
        ]
    );
}());