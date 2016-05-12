(function() {
    "use strict"; // context service

    angular
        .module("app")
        .factory("cx", [
            "$modal", "$rootScope", "urlUtil", "$http", "$q", cx
        ]);

    function cx($modal, $rootScope, urlUtil, $http, $q ) {
        return {
            showLoading: function() { 
                $rootScope.progressMode = "indeterminate"; 
            },
            hideLoading: function() { $rootScope.progressMode = ""; },

            testProd: function() { return $rootScope.testProd },
            setTestProd: function(testProd) { $rootScope.testProd = testProd},

            // list type
            type: function() { return $rootScope.type },
            setType : function(type) { $rootScope.type = type},

            area: function() { return $rootScope.area },
            perm: function() { return $rootScope.perm },
            url: function() { return $rootScope.url },
            title: function() { return $rootScope.title },
            userId: function() { return $rootScope.userId },

            isPdu: function() { return $rootScope.perm === "pdu" },
            isPda: function() { return $rootScope.perm === "pda" },

            isMe: function (userId) { return $rootScope.userId == userId },
            isKpi: function () { return $rootScope.perm === "kpi" },
            isChk: function () { return $rootScope.perm === "chk" },

            isAdm: function() { return $rootScope.perm === "adm" },
            isPp: function() { return $rootScope.perm === "pp" },
            isPlay: function() { return $rootScope.perm === "play" },
            isProj: function() { return $rootScope.perm === "proj" },
            isBoss: function () { return $rootScope.perm === "boss" },
            isWatch: function () { return $rootScope.perm === "watch" },
            isRead: function () { return $rootScope.perm === "read" },
            isMgr: function () { return $rootScope.perm === "mgr" },
            isRector: function () { return $rootScope.perm === "rector" },
            isSecy: function () { return $rootScope.perm === "secy" },
            isMeet: function () { return $rootScope.perm === "meet" },
            isNone: function () { return $rootScope.perm === "none" },
            isLocked: function () { return $rootScope.locked },
            setLocked: function (locked) { $rootScope.locked = locked },

            //fromPr: function () { return urlUtil.getSPHostUrl().indexOf('Program')>=0},
            //fromPpk: function () { return urlUtil.getSPHostUrl().indexOf('competitiveness_programme')>=0},
            hostUrl: function () { return urlUtil.getSPHostUrl()},

            setNone: function () { setPermTitleUrl("none","Нет доступа", "") },
            setMgr: function () { setPermTitleUrl("mgr","Администрирование", "") },
            setSecy: function () { setPermTitleUrl("secy","Закупки секретаря", "secy") },
            setMeet: function () { setPermTitleUrl("meet","Закупки для комиссии", "competitiveness_programme") },
            setRector: function () { setPermTitleUrl("rector","Отчёты ректора", "koksharov") },
            setRat: function () { setPermTitleUrl("watch","Рейтинги", "rat") },

            setPermTitleUrl: setPermTitleUrl,

            getProjs: getProjs,
            getSites: getSites,

            testProdTitle: function() { return $rootScope.testProd == "prod" ? '' : ($rootScope.testProd == "test" ? " (тест)" : " (+тест)")},
            getDev: function () {
                return $rootScope.dev;
            },
            selectCxModal: function () {
                return $modal.open({
                    animation: false,
                    templateUrl: '/app/badm/selectCxView.html',
                    controller: 'SelectCxCtrl as vm',
                    //resolve: {
                    //    projs: getProjs(),
                    //    bosses: getBosses(),
                    //}
                }).result;
            }
        };
        function getProjs() {
            return $http.get("json/getProjs");
        };
        function getSites() {
            return $http.get("json/getSites");
        };
        function setPermTitleUrl(perm, urlTitle, url, userTitle) {
            $rootScope.perm = perm;
            $rootScope.urlTitle = urlTitle;
            if (!angular.isUndefined (userTitle))
                $rootScope.userTitle = userTitle;
            if (!angular.isUndefined (url))
                $rootScope.url = url;

            $rootScope.testProd = "prod";
        };

    };

    angular.module("app").run(["cx", "urlUtil", "logger", "$http", "$rootScope", "$q", cxRun]);

    function cxRun(cx, urlUtil, logger, $http, $rootScope) {
        cx.setLocked(true);
        var userId = urlUtil.getUserId(); // for dev
        if (!userId) userId = 0;
        var dev = urlUtil.getDev(); // for dev
        var area = urlUtil.getStartState();
        var url = urlUtil.getUrl();
        var perm = urlUtil.getPermByUrl(); // read, write, manage

        $rootScope.dev = dev;
        $rootScope.area = area;
        $rootScope.url = url;
        $rootScope.perm = perm;
        $rootScope.userId = userId;

        $rootScope.testProd = window.location.hostname.indexOf("localhost") ? "all" : "test";

        if (!perm) {
            $http.get("/json/getCx", { params: { url: url, area: area } }).success(function(serverCx) {
                var perm = serverCx.perm;
                cx.setPermTitleUrl(perm, serverCx.urlTitle, url, serverCx.userTitle);
            });
        } else {
            $rootScope.urlTitle = cx.isPlay() ? "Управление проектами образовательных программ" : url;
            $rootScope.userTitle = cx.isPlay() ? "Иванищенко Мустафа Сидорович" : "user" + userId;
        }
    };

}());