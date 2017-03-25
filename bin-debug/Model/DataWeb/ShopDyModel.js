var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author cai_haotian
     * @Date 2016.2.26.
     *
     */
    var ShopDyModel = (function () {
        function ShopDyModel(_id, _time, _gold) {
            this.shopId = _id;
            this.lastShopTime = _time;
            this.gold = _gold;
        }
        return ShopDyModel;
    }());
    Model.ShopDyModel = ShopDyModel;
    __reflect(ShopDyModel.prototype, "Model.ShopDyModel");
})(Model || (Model = {}));
//# sourceMappingURL=ShopDyModel.js.map