var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     * @Data:组织VM所需要的数据.
     * @author: zhu_jun
     * @date: 2016.01.05.
     */
    var MainInfoData = (function () {
        function MainInfoData() {
        }
        Object.defineProperty(MainInfoData.prototype, "getSkillDyList", {
            /**
             * @获取技能动态列表.
             */
            get: function () {
                return Model.WebValue.dataDyModel.skillModelList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainInfoData.prototype, "getSkillStList", {
            /**
             * @获取技能静态列表.
             */
            get: function () {
                return Model.WebValue.dataStModel.skillList;
            },
            enumerable: true,
            configurable: true
        });
        return MainInfoData;
    }());
    Model.MainInfoData = MainInfoData;
    __reflect(MainInfoData.prototype, "Model.MainInfoData");
})(Model || (Model = {}));
//# sourceMappingURL=MainInfoData.js.map