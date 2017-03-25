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
    var ChallengeData = (function () {
        function ChallengeData(_st) {
            this.st = _st;
        }
        Object.defineProperty(ChallengeData.prototype, "AddHp", {
            /**
             * @设置boss扣血量
             */
            set: function (_value) {
                this.hp += _value;
                if (Model.WebServiceBase.isDebug) {
                    console.log("cai_haotian: this.hp += _value  " + this.hp);
                }
                if (this.hp < 0) {
                    this.hp = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChallengeData.prototype, "GetHpMax", {
            /**
             * @显示boss血量
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.hpMax);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChallengeData.prototype, "Type", {
            /**
             * @奖励类型
             */
            get: function () {
                return Model.DailyChallengeType[this.st.rewardType];
            },
            enumerable: true,
            configurable: true
        });
        return ChallengeData;
    }());
    Model.ChallengeData = ChallengeData;
    __reflect(ChallengeData.prototype, "Model.ChallengeData");
})(Model || (Model = {}));
//# sourceMappingURL=ChallengeData.js.map