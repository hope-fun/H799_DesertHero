var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author: zhu_jun
     * @data: 2016.01.14.
     *
     */
    var PlayerSkillData = (function () {
        function PlayerSkillData(_dy, _st) {
            /**
             * @10连升花费
             * @by cai_haotian 2016.3.8.
             */
            this.tenUpgradeCost = 0;
            this.dy = _dy;
            this.st = _st;
        }
        Object.defineProperty(PlayerSkillData.prototype, "CostAndUnit", {
            /**
             * @带单位技能花费.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.cost);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerSkillData.prototype, "TenUpgradeCostAndUnit", {
            /**
             * @带单位10连升花费
             * @by cai_haotian 2016.3.8.
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.tenUpgradeCost);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerSkillData.prototype, "Description", {
            //        /**
            //         * @100连升花费
            //         * @by cai_haotian 2016.3.8.
            //         */
            //        public hundredUpgradeCost: number;
            //        /**
            //         * @带单位100连升花费
            //         * @by cai_haotian 2016.3.8.
            //         */
            //        public get HundredUpgradeCostAndUnit(): string {
            //            return MainLocalService.toUnitConversion(this.hundredUpgradeCost);
            //        }
            /**
             * @技能描述.
             */
            get: function () {
                return this.st.description.replace("{}", this.effect.toString());
            },
            enumerable: true,
            configurable: true
        });
        return PlayerSkillData;
    }());
    Model.PlayerSkillData = PlayerSkillData;
    __reflect(PlayerSkillData.prototype, "Model.PlayerSkillData");
})(Model || (Model = {}));
//# sourceMappingURL=PlayerSkillData.js.map