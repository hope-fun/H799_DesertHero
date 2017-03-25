var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author cai_haotian
     * @by 2016.2.26.
     *
     */
    var FlyBoxLocalService = (function () {
        function FlyBoxLocalService() {
        }
        /**
         * @设置掉落数据
         */
        FlyBoxLocalService.setDropList = function () {
            if (FlyBoxLocalService.dropList) {
                if (Model.WebServiceBase.isDebug) {
                    console.log("cai_haotian 盒子的掉落数据一直是不变的");
                }
            }
            else {
                FlyBoxLocalService.dropList = [];
                FlyBoxLocalService.skillInfo = [];
                FlyBoxLocalService.currencyInfo = [];
                for (var i = 0; i < Model.WebValue.dataStModel.bagdropList.length; i++) {
                    FlyBoxLocalService.dropList.push(Model.WebValue.dataStModel.bagdropList[i]);
                }
                //寒冰心法数据
                var skillInfo1 = new Model.FlyBoxSkillData(Model.PlayerSkillLocalService.PlayerSkillList[1], Main.singleton.mainMenuVM.skillGroup.getChildAt(1));
                FlyBoxLocalService.skillInfo.push(skillInfo1);
                //破空霸拳
                var skillInfo2 = new Model.FlyBoxSkillData(Model.PlayerSkillLocalService.PlayerSkillList[2], Main.singleton.mainMenuVM.skillGroup.getChildAt(2));
                FlyBoxLocalService.skillInfo.push(skillInfo2);
                //寂灭雷诀
                var skillInfo3 = new Model.FlyBoxSkillData(Model.PlayerSkillLocalService.PlayerSkillList[3], Main.singleton.mainMenuVM.skillGroup.getChildAt(3));
                FlyBoxLocalService.skillInfo.push(skillInfo3);
                //寂灭雷诀
                var skillInfo5 = new Model.FlyBoxSkillData(Model.PlayerSkillLocalService.PlayerSkillList[4], Main.singleton.mainMenuVM.skillGroup.getChildAt(4));
                FlyBoxLocalService.skillInfo.push(skillInfo5);
                FlyBoxLocalService.currencyInfo = Enumerable.From(FlyBoxLocalService.dropList).Where(function (x) { return x.goOnTime == 0; }).ToArray();
                if (Model.WebServiceBase.isDebug) {
                    console.log("cai_haotian currency " + JSON.stringify(FlyBoxLocalService.currencyInfo));
                    console.log("cai_haotian skill" + FlyBoxLocalService.skillInfo);
                }
            }
            return FlyBoxLocalService.dropList;
        };
        /**
         * @获得钱币
         */
        FlyBoxLocalService.getCurrency = function (_currencyProbability) {
            if (_currencyProbability >= 0 && _currencyProbability <= FlyBoxLocalService.currencyInfo[0].probability * 0.05 - 1) {
                //灵石
                Model.PlayerLocalService.PlayerData.AddJewel = 1;
                Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_JEWEL, 1);
                return FlyBoxLocalService.currencyInfo[0].dropTypeDescribe;
            }
            else if (_currencyProbability >= FlyBoxLocalService.currencyInfo[0].probability * 0.05 && _currencyProbability <= FlyBoxLocalService.currencyInfo[2].probability * 0.1 - 1) {
                //元宝
                Model.PlayerLocalService.PlayerData.dy.treasure += 2;
                //调用成就 by cai_haotian 2016.4.5
                //                Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_COIN,2);
                return FlyBoxLocalService.currencyInfo[2].dropTypeDescribe;
            }
            else if (_currencyProbability >= FlyBoxLocalService.currencyInfo[2].probability * 0.1 && _currencyProbability <= FlyBoxLocalService.currencyInfo[1].probability * 0.1 - 1) {
                //金币
                var bossHp = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hp;
                var fdsAdd = Model.FriendLocalService.FriendSkillTypeCoin / 100;
                var mWAdd = Model.MagicWeaponService.AddCoin / 100;
                var add = Math.ceil((bossHp / 5) * (1 + fdsAdd + mWAdd));
                Model.PlayerLocalService.PlayerData.AddGold = add;
                var des = FlyBoxLocalService.currencyInfo[1].dropTypeDescribe.replace("{}", Model.MainLocalService.toUnitConversion(add));
                //调用成就 by cai_haotian 2016.4.5
                Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_COIN, add);
                return des;
            }
            Model.PlayerLocalService.initAllData();
        };
        return FlyBoxLocalService;
    }());
    /**
     * @掉落数据
     */
    FlyBoxLocalService.dropList = null;
    /**
     * @技能数据
     */
    FlyBoxLocalService.skillInfo = null;
    /**
     * @掉落货币数据
     */
    FlyBoxLocalService.currencyInfo = null;
    Model.FlyBoxLocalService = FlyBoxLocalService;
    __reflect(FlyBoxLocalService.prototype, "Model.FlyBoxLocalService");
})(Model || (Model = {}));
//# sourceMappingURL=FlyBoxLoaclService.js.map