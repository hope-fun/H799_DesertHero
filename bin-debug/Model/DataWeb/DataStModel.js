var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     * @author: zhu_jun
     * @date: 2015.12.26.
     */
    var DataStModel = (function () {
        function DataStModel() {
            /**
             * @挚友、技能.
             */
            this.friendSkillList = new Array();
        }
        return DataStModel;
    }());
    Model.DataStModel = DataStModel;
    __reflect(DataStModel.prototype, "Model.DataStModel");
})(Model || (Model = {}));
//# sourceMappingURL=DataStModel.js.map