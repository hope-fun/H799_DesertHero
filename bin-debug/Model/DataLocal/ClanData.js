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
    var ClanData = (function () {
        function ClanData(_st, _dy) {
            this.st = _st;
            this.dy = _dy;
        }
        Object.defineProperty(ClanData.prototype, "Type", {
            /**
             * @加成类型
             */
            get: function () {
                return Model.FamliyType[this.st.clanType];
            },
            enumerable: true,
            configurable: true
        });
        return ClanData;
    }());
    Model.ClanData = ClanData;
    __reflect(ClanData.prototype, "Model.ClanData");
})(Model || (Model = {}));
//# sourceMappingURL=ClanData.js.map