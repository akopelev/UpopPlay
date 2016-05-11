(function () {
    "use strict";

    angular.module("app").factory("urlUtil", ['$location', urlUtil]);

    function urlUtil($location) {
        var absUrl = decodeURIComponent($location.absUrl());
        return {
            //isRat: isRat,
            //url: url,
            //absUrl: absUrl,
            //params: params,
            getObjectByUrlProperty : getObjectByUrlProperty,
            //getStartState: getStartState,


            getQueryStringParameter: getQueryStringParameter,
            getSPHostUrl: getSPHostUrl,
            getBackPortalUrl: getBackPortalUrl,
            getRelativeUrl: getRelativeUrl,
            getUrl: getLastPartOfUrl,
            getDev: getDev,
            getUserId: getUserId,
            getPermByUrl: getPermByUrl,
            getStartState: getStartState,
            //getReferrerParam: getReferrerQueryStringParameter

        };
        //function getStartState() {
        //    var startState = params().StartState;
        //    if (startState) return startState;
        //    var spHostUrl = params().SPHostUrl;
        //    return spHostUrl.indexOf('rating') >=0  ? "rat" : "bud";
        //}

        //function isRat() {
        //    var fullUrl = params().SPHostUrl;
        //    if (!fullUrl) throw "no SPHostUrl param in URL";
        //    return fullUrl.search('rating') >= 0;
        //}

        function getObjectByUrlProperty(items, url) {
            var found = $.grep(items, function (val) { return val.url === url });
            return found.length > 0 ? found[0] : null;
        }

        //function absUrl() {
        //    return absUrl;
        //}

        //function url() {
        //    var fullUrl = params().SPHostUrl;
        //    if (!fullUrl) throw "no SPHostUrl param in URL";
        //    return fullUrl.substr(absUrl.indexOf("/", absUrl.indexOf("//") + 1));
        //}

        function params() { // return hash of urlParams
            var result = {};
            var pairs = absUrl.substr(absUrl.indexOf('?') + 1).split('&');
            angular.forEach(pairs, function(pair) {
                var keyValue = pair.split('=');
                result[keyValue[0]] = keyValue[1];
            });
            return result;
        }

        function getReferrerQueryStringParameter(urlParameterKey) {
            var qs = document.referrer.split('?')[1] || '';
            if (!qs) return null;
            var params = qs.split('&');
            var strParams = '';
            for (var i = 0; i < params.length; i = i + 1) {
                var singleParam = params[i].split('=');
                if (singleParam[0] == urlParameterKey)
                    return singleParam[1];
            }
            return null;
        }

        

        function getQueryStringParameter(urlParameterKey) {
            if (document.URL.indexOf('?') < 0) return null;          
            var params = document.URL.split('?')[1].replace(/#.*/, "").split('&');
            //var strParams = '';
            for (var i = 0; i < params.length; i = i + 1) {
                var singleParam = params[i].split('=');
                if (singleParam[0] == urlParameterKey)
                    return singleParam[1];
            }
            return null;
        }

        function getStartState() {
            return getQueryStringParameter('startState') || 'pp';

            //return decodeURIComponent(getQueryStringParameter('startState'));
            //var startState =
            //if (startState) return startState;
            //startState = getReferrerQueryStringParameter('startState')
            //if (startState) {
            //    Console.log('found on referrer: ' + startState)
            //}
            //return startState;
        }

        function getSPHostUrl() {
            var url = getQueryStringParameter('SPHostUrl') || ''; //todo maybe redundant
            return decodeURIComponent(url);
        }

        function getBackPortalUrl(relUrl) {
            var host = $location.host();
            var portalHost = (host.indexOf("tst") > 0) ? "tstpro.urfu.ru" : "pro.urfu.ru";
            return "https://" + portalHost + relUrl;
        }

        function getPermByUrl() {
            var encodedPerm = getQueryStringParameter('perm');
            return encodedPerm && decodeURIComponent(encodedPerm);
        }

        function getDev() {
            var encodedPerm = getQueryStringParameter('dev');
            return encodedPerm && decodeURIComponent(encodedPerm);
        }

        function getUserId() {
            var encoded = getQueryStringParameter('userId');
            return encoded && decodeURIComponent(encoded);
        }

        function getRelativeUrl(absUrl) {
            return absUrl.replace(/^(?:\/\/|[^\/]+)*\//, "");
        }

        function getLastPartOfUrl() {
            return getSPHostUrl().replace(/#.*/, "").replace(/.*\//, "");
        }

    }
}());
