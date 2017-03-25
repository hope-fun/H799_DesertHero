var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author: zhu_jun
 * @date: 2016.03.17.
 *
 */
var PageName;
(function (PageName) {
    PageName[PageName["MainInfo"] = 0] = "MainInfo";
    PageName[PageName["Player"] = 1] = "Player";
    PageName[PageName["Friend"] = 2] = "Friend";
    PageName[PageName["MagicWeapon"] = 3] = "MagicWeapon";
    PageName[PageName["Mall"] = 4] = "Mall";
})(PageName || (PageName = {}));
var Model;
(function (Model) {
    /**
     *
     * @author
     *
     */
    var LocalValue = (function () {
        function LocalValue() {
        }
        return LocalValue;
    }());
    Model.LocalValue = LocalValue;
    __reflect(LocalValue.prototype, "Model.LocalValue");
})(Model || (Model = {}));
//# sourceMappingURL=LocalValue.js.map