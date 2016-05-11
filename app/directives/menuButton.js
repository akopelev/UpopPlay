(function () {
    "use strict";

    angular
        .module("app")
        .directive("menuButton", menuButton);

    menuButton.$inject = ["cx", "$mdMedia", "$mdSidenav"];

// usage:     <grid-state name="boffins"></grid-state> in md-toolbar
    function menuButton(cx, $mdMedia, $mdSidenav) {

        var directive = {
            scope: false,
            templateUrl: '/app/directives/menuButton.html',
            link: link,
            restrict: "E"
        };
        return directive;

        function link(scope, element, attrs) { // name - gridStateName

            scope.vm.menuOpen = function () {
                $mdSidenav('left').toggle();
            }
            scope.vm.showMenuOpen = function () {
                return !$mdMedia('gt-md') || !cx.isLocked();
            }

        }
    }

})();