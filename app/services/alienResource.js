(function() {
    "use strict";

    angular
        .module("common.services")
        .factory("alienResource", ["$resource", alienResource ]);

    function alienResource($resource) {
        return $resource("/api/aliens/:id",
            { id: '@id' },
            { 'update': { method: 'PUT' } });
    }

}());