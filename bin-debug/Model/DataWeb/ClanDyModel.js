var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author cai_haotian
     * @date 2016.4.7
     *
     */
    var ClanDyModel = (function () {
        function ClanDyModel(_id) {
            this.clanId = _id;
        }
        return ClanDyModel;
    }());
    Model.ClanDyModel = ClanDyModel;
    __reflect(ClanDyModel.prototype, "Model.ClanDyModel");
})(Model || (Model = {}));
//# sourceMappingURL=ClanDyModel.js.map