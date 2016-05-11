(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("subjResource",
                ["$resource",
                 subjResource]);

    function subjResource($resource) {
        return $resource("/api/subjs/:subjId");
    }

}());
