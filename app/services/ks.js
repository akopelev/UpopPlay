(function () {
    "use strict"; // buy  status service

    angular
        .module("app")
        .factory("ks", ['cx', ks]);

    function ks(cx) {
        var incomeType =
        {
            Hd: "х/д",
            Grants: "Гранты",
            Fcp: "ФЦП",
            StateTask: "Госзадание",
            InnoProduct: "Инновационная продукция"
        };

        var articleStatus =
        {
            print: "Передана в печать",
            press: "Печатается",
            published: "Опубликована (нет в БД)",
            pb: "Опубликована (есть в БД)"
        }

        var articleCommonStatus =
        {
            created: "Новая",
            onApproval: "На согласовании",
            approved: "Принята",
            notApproved: "Не согласована",
            conditionallyApproved: "Условно принята"
        }

        var kcpStatus =
        {
            new: "Введен",
            sent: "Отправлен",
            resent : "Отправлен после доработки",
            ok: "Согласован",
            bad: "Возвращен на доработку",
        }

        var headStatus =
        {
            created : "Новый",
            onApproval : "На согласовании",
            approved : "Принят",
            notApproved : "Не согласован",
            toEdit : "Запрос на изменение",
            toExclude : "Запрос на исключение",
            excluded : "Участник исключен"
        }

        var status =
        {
            created: "Новая",
            onApproval: "На согласовании",
            approved: "Принята",
            notApproved: "Не согласована"
        };

        function isRus(ent) {
            return ent.origin == 'rus'
        }

        function isNewOrRejected(ent) {
            return cx.isKpi() && (ent.status === status.created || ent.status === status.notApproved)
        };

        function isOnApproval(ent) {
            return (cx.isChk() && ent.status === status.onApproval)
        };

        function isArticleNewOrRejected(ent) {
            return cx.isKpi() && (ent.status === articleCommonStatus.created || ent.status === articleCommonStatus.notApproved)
        };
        function isArticleOnApproval(ent) {
            return (cx.isChk() && ent.status === status.onApproval)
        };

        function isHeadNewOrRejected(ent) {
            return cx.isKpi() && (ent.status === articleCommonStatus.created || ent.status === articleCommonStatus.notApproved)
        };
        function isHeadOnApproval(ent) {
            return (cx.isChk() && ent.status === status.onApproval)
        };

        return {
            kcpStatus: kcpStatus,
            incomeType: incomeType,
            incomeTypes: [incomeType.Hd, incomeType.Grants,incomeType.Fcp, incomeType.StateTask,incomeType.InnoProduct],
            articleStatus: articleStatus,
            articleStatuses: [articleStatus.print, articleStatus.press, articleStatus.published, articleStatus.pb],
            isRus: isRus,
            status: status,
            articleCommonStatus: articleCommonStatus,
            headStatus: headStatus,

            isOnApproval: isOnApproval,
            isNewOrRejected: isNewOrRejected,
            isHeadOnApproval: isHeadOnApproval,
            isHeadNewOrRejected: isHeadNewOrRejected,
            isArticleOnApproval: isArticleOnApproval,
            isArticleNewOrRejected: isArticleNewOrRejected
            //isNew: isNew,

        };

    };

}());