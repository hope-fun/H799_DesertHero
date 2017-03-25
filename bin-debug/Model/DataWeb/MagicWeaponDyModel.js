var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     * @author: zhu_jun.
     * @date: 2015.12.26.
     */
    var MagicWeaponDyModel = (function () {
        function MagicWeaponDyModel(_magicWeaponId, _level) {
            this.magicWeaponId = _magicWeaponId;
            this.level = _level;
        }
        return MagicWeaponDyModel;
    }());
    Model.MagicWeaponDyModel = MagicWeaponDyModel;
    __reflect(MagicWeaponDyModel.prototype, "Model.MagicWeaponDyModel");
})(Model || (Model = {}));
//# sourceMappingURL=MagicWeaponDyModel.js.map