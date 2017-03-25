var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author cai_haotian
     * @date 2016.4.1
     *
     */
    var AchievementLocalService = (function () {
        function AchievementLocalService() {
        }
        Object.defineProperty(AchievementLocalService, "AchievementList", {
            /**
             * @获取成就数据
             */
            get: function () {
                return AchievementLocalService.achievementList;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @设置成就数据
         */
        AchievementLocalService.setAchievementList = function () {
            if (AchievementLocalService.achievementList) {
                for (var _i = 0, _a = AchievementLocalService.achievementList; _i < _a.length; _i++) {
                    var info = _a[_i];
                    AchievementLocalService.setCurrentState(info);
                    AchievementLocalService.setGetState(info);
                }
                AchievementLocalService.achievementList = Enumerable.From(AchievementLocalService.achievementList).OrderByDescending(function (x) { return x.getState; }).ThenBy(function (x) { return x.dy.stage; }).ToArray();
            }
            else {
                AchievementLocalService.achievementList = [];
                for (var _b = 0, _c = Model.WebValue.dataStModel.achievementList; _b < _c.length; _b++) {
                    var stData = _c[_b];
                    var dy = Enumerable.From(Model.WebValue.dataDyModel.achievementModelList).Where(function (x) { return x.achievementId == stData.id; }).FirstOrDefault(null);
                    var data = new Model.AchievementData(stData, dy);
                    AchievementLocalService.setStageInfo(data);
                    AchievementLocalService.setCurrentState(data);
                    AchievementLocalService.achievementList.push(data);
                }
            }
            return AchievementLocalService.achievementList;
        };
        /**
         * @设置等级需求数据
         */
        AchievementLocalService.setStageInfo = function (_data) {
            _data.firstValue = Model.MainLocalService.toTenConversion(_data.st.firstValue, _data.st.firstMagnitude);
            _data.secondValue = Model.MainLocalService.toTenConversion(_data.st.secondValue, _data.st.secondMagnitude);
            _data.thirdValue = Model.MainLocalService.toTenConversion(_data.st.thirdValue, _data.st.thirdMagnitude);
            _data.fourthValue = Model.MainLocalService.toTenConversion(_data.st.fourthValue, _data.st.fourthMagnitude);
            _data.fifthValue = Model.MainLocalService.toTenConversion(_data.st.fifthValue, _data.st.fifthMagnitude);
        };
        /**
         * @设置目前成就达成数量
         */
        AchievementLocalService.setCurrentGet = function (_type, _count) {
            switch (_type) {
                case Model.AchievementType.ACHIEVEMENT_TYPE_KILL_ENEMY:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_KILL_ENEMY; }).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_GET_COIN:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_GET_COIN; }).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_ARRIVE_SCENE:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_ARRIVE_SCENE; }).FirstOrDefault(null);
                    data.dy.count = _count;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_GET_JEWEL:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_GET_JEWEL; }).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_GET_MAGIC_WEAPON:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_GET_MAGIC_WEAPON; }).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_FRIEND_DAMAGE:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_FRIEND_DAMAGE; }).FirstOrDefault(null);
                    data.dy.count = _count ? _count : 0;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_GET_FRIEND:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_GET_FRIEND; }).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_GET_GIFT:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_GET_GIFT; }).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_GET_BOX:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_GET_BOX; }).FirstOrDefault(null);
                    console.log("cai_haotian baoxiang shu ju " + JSON.stringify(data));
                    data.dy.count += _count;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_KILL_BOSS:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_KILL_BOSS; }).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL1:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL1; }).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL2:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL2; }).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL3:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL3; }).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL4:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL4; }).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL5:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL5; }).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                case Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL6:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(function (x) { return x.Type == Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL6; }).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                default: alert("成就信息出现错误！请联系管理员！！");
            }
            AchievementLocalService.setCurrentState(data); //一旦变动立刻设置状态
            //            AchievementLocalService.beAchieved();//设置是否达到数量更新ui界面
        };
        /**
         * @设置当前奖励状态
         */
        AchievementLocalService.setCurrentState = function (_data) {
            if (_data.dy.count >= 0 && _data.dy.stage < 1) {
                _data.RewardType = Model.RewardType[_data.st.firstRewardType];
                _data.RewardCount = _data.st.firstRewardValue;
                _data.matchStage = 1;
                return;
            }
            else if (_data.dy.count >= _data.firstValue && _data.dy.stage < 2) {
                _data.RewardType = Model.RewardType[_data.st.secondRewardType];
                _data.RewardCount = _data.st.secondRewardValue;
                _data.matchStage = 2;
                return;
            }
            else if (_data.dy.count >= _data.secondValue && _data.dy.stage < 3) {
                _data.RewardType = Model.RewardType[_data.st.thirdRewardType];
                _data.RewardCount = _data.st.thirdRewardValue;
                _data.matchStage = 3;
                return;
            }
            else if (_data.dy.count >= _data.thirdValue && _data.dy.stage < 4) {
                _data.RewardType = Model.RewardType[_data.st.fourthRewardType];
                _data.RewardCount = _data.st.fourthRewardValue;
                _data.matchStage = 4;
                return;
            }
            else if (_data.dy.count >= _data.fourthValue && _data.dy.stage < 5) {
                _data.RewardType = Model.RewardType[_data.st.fifthRewardType];
                _data.RewardCount = _data.st.fifthRewardValue;
                _data.matchStage = 5;
                return;
            }
            else if (_data.dy.count >= _data.fifthValue && _data.dy.stage >= 5) {
                _data.matchStage = 6;
            }
        };
        /**
         * @判断是否可领取
         */
        AchievementLocalService.setGetState = function (_data) {
            switch (_data.matchStage) {
                case 0:
                case 1:
                    _data.getState = _data.dy.count >= _data.firstValue ? true : false;
                    break;
                case 2:
                    _data.getState = _data.dy.count >= _data.secondValue ? true : false;
                    break;
                case 3:
                    _data.getState = _data.dy.count >= _data.thirdValue ? true : false;
                    break;
                case 4:
                    _data.getState = _data.dy.count >= _data.fourthValue ? true : false;
                    break;
                case 5:
                    _data.getState = _data.dy.count >= _data.fifthValue ? true : false;
                    break;
                case 6:
                    break;
                default: alert("成就状态出错！！！c2");
            }
        };
        /**
         * @判断成就是否达成如果达成将提示玩家
         */
        AchievementLocalService.beAchieved = function () {
            var flag = true;
            var i = 0;
            while (flag) {
                switch (AchievementLocalService.AchievementList[i].matchStage) {
                    case 0:
                    case 1:
                        AchievementLocalService.AchievementList[i].dy.count >= AchievementLocalService.AchievementList[i].firstValue;
                        break;
                    case 2:
                        AchievementLocalService.AchievementList[i].dy.count >= AchievementLocalService.AchievementList[i].secondValue;
                        break;
                    case 3:
                        AchievementLocalService.AchievementList[i].dy.count >= AchievementLocalService.AchievementList[i].thirdValue;
                        break;
                    case 4:
                        AchievementLocalService.AchievementList[i].dy.count >= AchievementLocalService.AchievementList[i].fourthValue;
                        break;
                    case 5:
                        AchievementLocalService.AchievementList[i].dy.count >= AchievementLocalService.AchievementList[i].fifthValue;
                        break;
                    case 6:
                        break;
                    default: alert("成就状态出错！！！c2");
                }
                i++;
            }
        };
        return AchievementLocalService;
    }());
    /**
     * @成就数据
     */
    AchievementLocalService.achievementList = null;
    Model.AchievementLocalService = AchievementLocalService;
    __reflect(AchievementLocalService.prototype, "Model.AchievementLocalService");
})(Model || (Model = {}));
//# sourceMappingURL=AchievementLocalService.js.map