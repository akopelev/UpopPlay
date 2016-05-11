(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("statusService",
                 statusService);

    function statusService() {
        var New = "Новая";
        var Approved = "Принята";
        var NotApproved = "Не согласована";
        var Excluded = "Исключена";

        var ReqToApprove = "На согласовании";
        var ReqToExclude = "Запрос на исключение";
        var ReqToEdit = "Запрос на изменение";

        function approve(entity) {
            entity.status = Approved;
        }

        function exclude(entity) {
            entity.status = Excluded;
        }

        function isOnApproval(entity) {
            return entity.status === ReqToApprove || entity.status === ReqToExclude || entity.status === ReqToEdit;
        }

        function isReqToEdit(entity) {
            return entity.status === ReqToEdit;
        }

        function isExcluded(entity) {
            return entity.status === Excluded;
        }

        function isReqToExclude(entity) {
            return entity.status === ReqToExclude;
        }

        function isApproved(entity) {
            return entity.status === Approved;
        }

        function askToApprove(entity) {
            entity.status = ReqToApprove;
        }

        function askToDelete(entity) {
            entity.status = ReqToExclude;
        }

        function askToEdit(entity) {
            entity.status = ReqToEdit;
        }

        function rejectApprovalWithComments(entity, comments) {
            entity.comments = comments;
            entity.status = NotApproved;
        }

        function rejectEditOrDeleteWithComments(entity, comments) {
            entity.comments = comments;
            entity.status = Approved;
        }

        function reqToDelete(entity, comments) {
            entity.comments = comments;
            entity.status = ReqToExclude;
        }

        function reqToEdit(entity, comments) {
            entity.comments = comments;
            entity.status = ReqToEdit;
        }

        function setNew(entity) {
            entity.status = New;
        }

        return {
            approve: approve,
            exclude: exclude,
            askToApprove: askToApprove,
            askToDelete: askToDelete,
            askToEdit: askToEdit,
            reqToDelete: reqToDelete,
            reqToEdit: reqToEdit,
            rejectApprovalWithComments: rejectApprovalWithComments,
            rejectEditOrDeleteWithComments: rejectEditOrDeleteWithComments,
            isApproved: isApproved,
            isOnApproval: isOnApproval,
            isReqToEdit: isReqToEdit,
            isReqToExclude: isReqToExclude,
            setNew: setNew,
            isExcluded: isExcluded
        }

    }


}());
