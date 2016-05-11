(function() {
    "use strict";

    angular
        .module("app")
        .filter("perc", [
            "$filter", function($filter) {
                return function(input, decimals) {
                    return $filter("number")(input * 100, decimals) + "%";
                };
            }
        ])
        .filter("estnet", [
            "$filter", function($filter) {
                return function(input) {
                    return input ? "Есть" : "Нет";
                };
            }
        ])
        .filter("NAforMinusOne", [
            "$filter", function($filter) {
                return function(input) {
                    return input === -1 ? "(Н/Д)" : input;
                };
            }
        ])
        .directive("resize2", [ '$window', function($window) {
            return {
//                controller: function() {},
//                controllerAs: 'vm',
                priority: -10,
                bindToController: true,
                link: function(scope, element, attrs) {
                    var w = angular.element($window);
                    scope.getWindowDimensions = function() {
                        return { 'h': w.height(), 'w': w.width() };
                    };
                    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                        scope.windowHeight = newValue.h;
                        scope.windowWidth = newValue.w;

                        scope.style = function () {
                            return {
                                'height': (newValue.h - 525) + "px"
                                //                        'width': (newValue.w - 100) + 'px'
                            };
                        };

                    }, true);

                    w.bind("resize", function() {
                        scope.$apply();
                    });
                }};
        }])
.directive("replaceComma", function() {

    return {
        restrict: "A",
        link: function(scope, element) {
            var filter = function(str) {
                return parseFloat('1,1111'.replace(',', '.')).toFixed(3).replace('.', ',');
            };
            element.on("keyup", function (e) {
                this.value = filter(value);
//                var s = scope;
//                var e = element;
//                console.log(e.keyCode);
//                console.log(e.char);
//                if(e.keyCode === 188) {
//                    this.value += ".";
//                    e.preventDefault();
//                }
            });
        }
    };
})
    .directive("resize", [ '$window', function($window) {
            return {
//                controller: function() {},
//                controllerAs: 'vm',
                priority: -10,
                bindToController: true,
                link: function(scope, element, attrs) {
                    var w = angular.element($window);
                    scope.getWindowDimensions = function() {
                        return { 'h': w.height(), 'w': w.width() };
                    };
                    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                        scope.windowHeight = newValue.h;
                        scope.windowWidth = newValue.w;

                        scope.style = function (totalsNeeded) {
                            return {
                                'height': (newValue.h - (totalsNeeded ? 155 : 125)) + "px"
    //                        'width': (newValue.w - 100) + 'px'
                            };
                        };

                    }, true);

                    w.bind("resize", function() {
                        scope.$apply();
                    });
                }};
            }]);
//        .directive("dropZone", ['util', function (util) {
//            return {
//                scope: {
//                    contId: "=", // 0 - no container
//                    type: "=", // pkrs, pek, teo, rpt
//                    name: "="
//                },
//                link: function(scope, element, attrs) {
////                    var contId = attrs["dropZoneCont"];
//                    //console.log(scope.group ? scope.group.title : "none");
//                    element.dropzone({
//                        url: "/upload/pek",
//                        maxFilesize: 100,
//                        paramName: "uploadfile",
//                        maxThumbnailFilesize: 5,
//                        autoProcessQueue: true,
//                        init: function (file) {
//                            var dz = this;
//                            this.on("complete", function (data) {
//                                var res = JSON.parse(data.xhr.responseText);
//                                util.askForDelete('File Uploaded').then(function () {
//                                    dz.removeAllFiles();
//                                });
////                                alert(res.Message);
//                                
//                                //dz.removeFile(file);
//                            });
//                        }
//                    });
//                }
//            };
//        }]);


}());