(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("headResource",
                ["$resource",
                 headResource]);

    function headResource($resource) {
        return $resource("/api/heads/:headId");
    }

}());
