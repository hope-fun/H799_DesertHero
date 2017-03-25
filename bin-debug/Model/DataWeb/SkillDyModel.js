var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author: zhu_jun
     * @date: 2016.02.02.
     *
     */
    var SkillDyModel = (function () {
        function SkillDyModel(_skillId, _level, _cdTime) {
            this.skillId = _skillId;
            this.level = _level;
            this.cdTime = _cdTime;
        }
        return SkillDyModel;
    }());
    Model.SkillDyModel = SkillDyModel;
    __reflect(SkillDyModel.prototype, "Model.SkillDyModel");
})(Model || (Model = {}));
//# sourceMappingURL=SkillDyModel.js.map