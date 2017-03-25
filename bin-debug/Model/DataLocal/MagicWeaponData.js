var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author: zhu_jun
     * @date: 2016.01.06.
     * @神器弹窗本地数据对象.
     */
    var MagicWeaponData = (function () {
        /**
         * @_dy:神器动态信息.
         * @_st:神器静态信息.
         */
        function MagicWeaponData(_dy, _st) {
            this.dy = _dy;
            this.st = _st;
        }
        Object.defineProperty(MagicWeaponData.prototype, "TypeFirst", {
            /**
             * @神器效果1的加成类型.
             */
            get: function () {
                return Model.MagicWeaponEffectType[this.st.weaponEffectTypeFirst];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponData.prototype, "TypeSecond", {
            /**
             * @神器效果2的加成类型.
             */
            get: function () {
                return Model.MagicWeaponEffectType[this.st.weaponEffectTypeSecond];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagicWeaponData.prototype, "Icon", {
            get: function () {
                return this.st.icon + "_png";
            },
            enumerable: true,
            configurable: true
        });
        return MagicWeaponData;
    }());
    Model.MagicWeaponData = MagicWeaponData;
    __reflect(MagicWeaponData.prototype, "Model.MagicWeaponData");
})(Model || (Model = {}));
//# sourceMappingURL=MagicWeaponData.js.map