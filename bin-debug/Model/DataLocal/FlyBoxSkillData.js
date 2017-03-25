var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author cai_haotian
     * @Date 2016.3.15
     *
     */
    var FlyBoxSkillData = (function () {
        function FlyBoxSkillData(_skillData, _skillItem) {
            this.skillData = _skillData;
            this.skillItem = _skillItem;
        }
        return FlyBoxSkillData;
    }());
    Model.FlyBoxSkillData = FlyBoxSkillData;
    __reflect(FlyBoxSkillData.prototype, "Model.FlyBoxSkillData");
})(Model || (Model = {}));
//# sourceMappingURL=FlyBoxSkillData.js.map