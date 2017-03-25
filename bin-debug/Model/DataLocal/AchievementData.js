var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author cai_haotian
     * @date 2016.4.1.
     *
     */
    var AchievementData = (function () {
        function AchievementData(_st, _dy) {
            /**
             * @当前匹配第几阶段
             */
            this.matchStage = 0;
            /**
             * @当前奖励可获取数量
             */
            this.RewardCount = 0;
            /**
             * @当前是否可领取
             */
            this.getState = false;
            this.st = _st;
            this.dy = _dy;
        }
        Object.defineProperty(AchievementData.prototype, "Type", {
            /**
             * @当前可获得奖品类型
             */
            get: function () {
                return Model.AchievementType[this.st.type];
            },
            enumerable: true,
            configurable: true
        });
        ;
        return AchievementData;
    }());
    Model.AchievementData = AchievementData;
    __reflect(AchievementData.prototype, "Model.AchievementData");
})(Model || (Model = {}));
//# sourceMappingURL=AchievementData.js.map