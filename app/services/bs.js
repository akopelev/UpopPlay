(function () {
    "use strict"; // buy  status service

    angular
        .module("app")
        .factory("bs", ['cx', bs]);

    function bs(cx) {

        var projPerm = {
            read: "Чтение",
            proj: "Запись",
            kpi: "Ввод показателей КЦП"
        }

        function projPerms() {
            var result = [];
            for (var key in projPerm) {
                result.push({id:key, name:projPerm[key]});
            }
            return result;
        };
        var listType = {
            onProj: "onProj",
            onBoss: "onBoss",
            onSecy: "onSecy",
            onPanel: "onPanel",
            onForm: "onForm",
            onAll: "onAll"

        }

        var bossPerm = {
            watch: "Чтение закупок (+ согласование АИАС)",
            boss: "Запись",
            chk: "Согласование показателей КЦП"
        }

        function bossPerms() {
            var result = [];
            for (var key in bossPerm) {
                result.push({id:key, name:bossPerm[key]});
            }
            return result;
        };

        var status =
        {
            proj: "Введена руководителем проекта",
            proj2: "На доработке у руководителя проекта",

            boss: "На согласовании у ответственного",
            bossOk: "Одобрено ответственным",
            boss2: "На доработке у ответственного",

            secy: "У секретаря комиссии",
            panel: "На рассмотрении комиссии",
            //prot: "Внесена в новый протокол",
            dr: "Протокол на согласовании",

            ok: "Утверждена",
            bad: "Не утверждена",

            none: "Исключена"
        };

        var oper = {
            create: "Заведение новой закупки",
            change: "Изменение",
            exclude: "Исключение",
        };

        var decision = {
            approveCreate: "Утверждена",
            approveChange: "Утверждена",
            approveExclude: "Исключена",

            rejectCreate: "Не утверждена",
            rejectChange: "Не изменена",
            rejectExclude: "Не исключена",
        };

        function atProj(buy) {
            return buy.status == status.proj || buy.status == status.proj2;
        }

        function atBoss(buy) {
            return buy.status == status.boss || buy.status == status.bossOk || buy.status == status.boss2;
        }

        var protStatus  = {
            unbooked: "Не проведен",
            booked: "Проведен"
        };

        var exec  = {
            corp: "Оборудование/ текущий ремонт/ работы сторонних организаций.",
            individual: "Работы физ. лиц",
            services: "Услуги"
        };

        function isOk(buy) { return (buy.status == status.ok) };

        function inNonExcludingOk(buy) { return buy.status == status.ok && buy.Oper != oper.exclude};

        function isActive(buy) { return !(buy.oper == oper.exclude && buy.status == status.none) };
        function inCreate(buy) { return buy.oper == oper.create };
        function inChange(buy) { return buy.oper == oper.change };
        function inExclude(buy) { return buy.oper == oper.exclude };

        function inProj(buy) { return (buy.status == status.proj || buy.status == status.proj2) };
        function inBoss(buy) { return (buy.status == status.boss || buy.status == status.boss2 || buy.status == status.bossOk) };

        function inProjCreated(buy) { return inCreate(buy) && inProj(buy) };
        function inProjChanged(buy) { return inChange(buy) && inProj(buy) };

        function inBossCreated (buy) { return inCreate(buy) && inBoss(buy) };
        function inBossChanged (buy) { return  inChange(buy) && inBoss(buy) };

        function inSecy(buy) { return (!inProj(buy) && !inBoss(buy))};

        // new can's

        // ---- proj -----

        function canToBoss(buy) {
            return cx.isProj() && inProj(buy);
        }

        // ---  boss ---
        function canToSecy(buy) {
            return cx.isBoss() && (inBoss(buy) || buy.status == status.bad);
        }

        function canToProj2(buy) {
            return cx.isBoss() && (inBoss(buy) || buy.status == status.bad) && buy.operFromProj;
        }

        function canToBossOk(buy) {
            return cx.isBoss() && (buy.status == status.boss);
        }

        // --- secy ------

        // -- oper helpers --
        function atCreate(buy) { return buy.oper == oper.create;  }
        function atChange(buy) { return buy.oper == oper.change;  }
        function atExclude(buy) { return buy.oper == oper.exclude;  }

        // -- listType helpers --
        function onProj() { return cx.type() == listType.onProj;  }
        function onBoss() { return cx.type() == listType.onBoss;  }
        function onSecy() { return cx.type() == listType.onSecy; }
        function onPanel() { return cx.type() == listType.onPanel;  }
        function onForm() { return cx.type() == listType.onForm;  }
        function onSecyPanelForm() { return onSecy() || onPanel() || onForm(); }
        function onAll() { return cx.type() == listType.onAll;  }

        function canAddToSess(buy) {
            return (onAll() || onSecy()) && ((buy.status == status.secy || buy.status == status.panel) && !buy.sessNumber)
        }
        function canRemoveFromSess(buy) {
            return (onAll() || onPanel()) && (buy.status == status.panel && buy.sessNumber)
        }

        function canToBoss2(ent) {
            return (onAll() || onPanel() || onSecy()) && (ent.status == status.secy || ent.status == status.panel) && ent.oper != oper.exclude;
        }

        function canFormProt(ent) {
            return (onAll() || onForm()) && (ent.status == status.panel) && ent.decision && !ent.protNumber
        }

        function canAddToProt(ent) {
            return (onAll() || onForm()) && inSecy(ent) && !ent.protNumber && ent.decision;
        }

        function canRefreshProt(ent) {
            return onAll() && inSecy(ent) && ent.protNumber
        }

        function canRemoveFromProt(ent) {
            return (onAll() || onForm()) && inSecy(ent) && ent.protNumber && ent.status != status.ok;
        }

        function canApprove(ent) {
            return (onAll() || onForm()) && (ent.status == status.panel) && !ent.protNumber
        }
        function canReject(ent) {
            return (onAll() || onForm()) && (ent.status == status.panel) && !ent.protNumber
        }

        function canBook(ent) {
            return (onAll() || (onForm() && ent.sessNumber)) && inSecy(ent) && ent.protNumber && ent.status == status.dr;
        }

        function canUnbook(ent) {
            return (onAll() || (onForm() && ent.sessNumber)) && inSecy(ent) && (ent.status == status.ok || ent.status == status.bad || ent.status == status.none );
        }

        // -- other --
        function canAdd() {
            if (onSecyPanelForm()) return false;
            return !cx.isSecy();
        }

        function canChange(buy) {
            if (onSecyPanelForm()) return false;
            return (isActive(buy) && ((cx.isProj()|| cx.isBoss()) && isOk(buy)));
        }

        function canExclude(buy) {
            if (onSecyPanelForm()) return false;
            return (isActive(buy) && (((cx.isProj() && buy.fromProj) || cx.isBoss()) && isOk(buy)));
        }

        function canEdit(buy) {
            if (buy.status == status.ok) return false;
            return (buy.oper != oper.exclude) && ((cx.isSecy() && !inBoss(buy) && !inProj(buy))
                || (cx.isProj() && buy.fromProj && inProj(buy))
                || (cx.isBoss() && (inBoss(buy) || buy.status == status.bad)));
        }

        function canDelete(buy) {
            if (onSecyPanelForm() || buy.isSealed) return false;
            return (/*cx.isSecy() ||*/ (buy.oper == oper.create && ((cx.isProj() && buy.fromProj && buy.status == status.proj) ||
            (cx.isBoss() && (buy.status == status.boss || buy.status == status.bossOk) && !buy.fromProj))));
        }

        function canCancel(buy) {
            return (onSecy() || onAll()) && buy.status == status.secy && (buy.oper == oper.change || buy.oper == oper.exclude);
        }

        function combineStrings (flagArr, titleArr) {
            var neededTitles = titleArr.filter(function (value, index ) { return flagArr[index]; });
            return _.join(neededTitles, "/");
        }

        function getApproveRejectMsg(nodes, approveFlag) {
             var datas = _.map(nodes,"data");   
             var operFlags = [
                 _.some(datas, {'oper': oper.create}),
                 _.some(datas, {'oper': oper.change}),
                 _.some(datas, {'oper': oper.exclude})
             ];


            return approveFlag
                ? combineStrings(operFlags, ['Утвердить','Изменить','Исключить']) :
                combineStrings(operFlags, ['Не утвердить','Не изменить','Не исключить']);
        }

        return {
            projPerms: projPerms,
            bossPerms: bossPerms,
            inNonExcludingOk : inNonExcludingOk,
            inCreate: inCreate,
            inChange: inChange,
            inExclude: inExclude,
            inProj: inProj,
            inProjCreated: inProjCreated,
            inProjChanged: inProjChanged,
            inBoss: inBoss,
            inBossCreated: inBossCreated,
            inBossChanged: inBossChanged,
            inSecy: inSecy,

            // -- proj --
            canToBoss: canToBoss,

            // -- boss --
            canToSecy: canToSecy,
            canToProj2: canToProj2,
            canToBossOk: canToBossOk,

            // -- secy --
            canAddToSess: canAddToSess,
            canRemoveFromSess: canRemoveFromSess,
            canToBoss2: canToBoss2,

            canFormProt: canFormProt,
            canAddToProt: canAddToProt,
            canRefreshProt: canRefreshProt,
            canRemoveFromProt: canRemoveFromProt,

            canApprove: canApprove,
            canReject: canReject,

            canBook: canBook,
            canUnbook: canUnbook,

            canAdd: canAdd,

            canEdit: canEdit,
            canChange: canChange,

            canDelete: canDelete,
            canCancel: canCancel,
            canExclude: canExclude,

            onProj: onProj,
            onBoss: onBoss,
            onSecy: onSecy,
            onPanel: onPanel,
            onForm: onForm,
            onAll: onAll,

            getApproveRejectMsg: getApproveRejectMsg,

            status: status,
            oper: oper,
            decision: decision,
            exec: exec,
            execs: [exec.corp, exec.individual, exec.services],
            execObjs: [{name: exec.corp}, {name:  exec.individual}, {name: exec.services}],
            getApproveDecisionLabel: function(operValue) {
                return decision['approve' +  _.capitalize(_.findKey(oper, function(value) { return operValue === value;}))];
            },
            getRejectDecisionLabel: function(operValue) {
                return decision['reject' +  _.capitalize(_.findKey(oper, function(value) { return operValue === value;}))];
            }
        };
    };

}());