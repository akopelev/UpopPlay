(function() {
    "use strict";

    angular
        .module("app")
        .directive("dz", dz);

    dz.$inject = ["$log", "$modal"];

    function dz($log, $modal) {

        // Usage:
        //     <drop_zone></drop_zone>
        // Creates:
        // 
        var directive = {
            scope: {
                indexToOpen: "@?", // pkrs, pek, teo, rpt
                reload: "&",
                type: "@"// pkrs, pek, teo, rpt
            },

            link: link,
            restrict: "EA"
        };
        return directive;

        function link(scope, element, attrs) {
            element.dropzone({
                url: "/upload/" + scope.type,
                maxFilesize: 400,
                paramName: "uploadfile",
                maxThumbnailFilesize: 400,
                autoProcessQueue: true,
                init: function(file) {
                    var dz = this;
                    this.on("complete", function(data) {
                        
                        var res = JSON.parse(data.xhr.responseText);
                        $log.info(scope.upper);
                        scope.$apply(function() {
                            var modalInstance = $modal.open({
                                animation: false,
                                templateUrl: '/app/dlg/fileLoaded.html',
                                controller: 'fileLoadedCtrl as vm',
                                size: 'sm'
    //                            resolve: { items: function () { return $scope.items; } }
                            });

                            modalInstance.result.then(function (selectedItem) {

                                //scope.$parent.vm.reload();
                            }, function () {
                                dz.removeAllFiles();
                                scope.reload(!angular.isUndefined(scope.indexToOpen) ? {indexToOpen: scope.indexToOpen} : undefined);
                            });
                        });


//                                alert(res.Message);

                        //dz.removeFile(file);
                    });
                }
            });
        }
    }

})();