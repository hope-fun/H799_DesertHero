var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author cai_haotian
     * @date 2016.4.14.
     *
     */
    var ChallengeLoaclService = (function () {
        function ChallengeLoaclService() {
        }
        Object.defineProperty(ChallengeLoaclService, "ChallengeDataList", {
            /**
             * @获取每日挑战数据
             */
            get: function () {
                return ChallengeLoaclService.challengeDataList;
            },
            enumerable: true,
            configurable: true
        });
        ChallengeLoaclService.setChallengeData = function () {
            if (ChallengeLoaclService.challengeDataList) {
                for (var _i = 0, _a = ChallengeLoaclService.challengeDataList; _i < _a.length; _i++) {
                    var infoData = _a[_i];
                    ChallengeLoaclService.setBossHp(infoData);
                }
            }
            else {
                ChallengeLoaclService.challengeDataList = [];
                for (var _b = 0, _c = Model.WebValue.dataStModel.challengeList; _b < _c.length; _b++) {
                    var info = _c[_b];
                    var data = new Model.ChallengeData(info);
                    ChallengeLoaclService.setBossHp(data);
                    ChallengeLoaclService.challengeDataList.push(data);
                }
            }
        };
        /**
         * @设置挑战boss血量
         */
        ChallengeLoaclService.setBossHp = function (_data) {
            _data.hpMax = Math.round(Math.pow(Number(Model.WebValue.dataStModel.sysConfigModel.monsterHpRatio), Model.WebValue.dataDyModel.playerModel.sceneId) * 5 * _data.st.difficultNum *
                (1 - Model.MagicWeaponService.CutBossHp / 100));
            _data.hp = _data.hpMax;
        };
        /**
         * @设置挑战cd时间
         */
        ChallengeLoaclService.setChallengeCD = function (_CDTime) {
            Model.PlayerLocalService.PlayerData.dy.chanllengeTime = _CDTime;
        };
        /**
         * @挑战成功后的回调
         */
        ChallengeLoaclService.successBack = function (_data) {
            if (Model.WebServiceBase.isDebug) {
                console.log("cai_haotian   _data " + JSON.stringify(_data));
            }
            switch (_data.Type) {
                case Model.DailyChallengeType.MONEY_TYPE_YB:
                    Model.PlayerLocalService.PlayerData.dy.treasure += _data.st.rewardCount;
                    break;
                case Model.DailyChallengeType.MONEY_TYPE_JEWEL:
                    Model.PlayerLocalService.PlayerData.AddJewel = _data.st.rewardCount;
                    break;
                case Model.DailyChallengeType.REWARD_TYPE_CUT_BAGDROP_TIME:
                    var myDate = new Date();
                    var now = myDate.getTime() / 1000;
                    Model.PlayerLocalService.PlayerData.dy.doubleProbabilityTime = now;
                    break;
                case Model.DailyChallengeType.REWARD_TYPE_USE_SKILL_DSTQ:
                    var myDate = new Date();
                    var now = myDate.getTime() / 1000;
                    Model.PlayerLocalService.PlayerData.dy.freeSkillTime = now;
                    Model.PlayerLocalService.PlayerData.st.bagAppearTimeInterval /= 2;
                    break;
                default: alert("每日挑战奖励出错！c");
            }
            Model.WebService.commitData(Model.WebValue.dataDyModel, function () {
                if (Model.WebServiceBase.isDebug) {
                    console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                }
            }, function () {
                if (Model.WebValue.isTraditional) {
                    alert("數據提交失敗請聯繫管理員！！！！");
                }
                else {
                    alert("数据提交失败请联系管理员！！！！");
                }
            });
        };
        return ChallengeLoaclService;
    }());
    /**
     * @每日挑战数据
     */
    ChallengeLoaclService.challengeDataList = null;
    Model.ChallengeLoaclService = ChallengeLoaclService;
    __reflect(ChallengeLoaclService.prototype, "Model.ChallengeLoaclService");
})(Model || (Model = {}));
//# sourceMappingURL=ChallengeLoaclService.js.map