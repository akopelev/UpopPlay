(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("progResource", ["$resource", progResource]);

    function progResource($resource) {
        return $resource("/api/progs/:id",
            { id: '@Id' },
            { 'update': { method: 'PUT' } });
    }

}());
