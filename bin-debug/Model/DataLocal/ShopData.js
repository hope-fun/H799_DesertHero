var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     *
     * @author cai_haotian
     * @Date 2016.2.26
     *
     */
    var ShopData = (function () {
        function ShopData(_dy, _st) {
            this.dy = _dy;
            this.st = _st;
        }
        Object.defineProperty(ShopData.prototype, "Icon", {
            get: function () {
                return this.st.icon + "_png";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopData.prototype, "SilverAndUnit", {
            /**
             * @获得铜币显示数量
             */
            get: function () {
                return Model.MainLocalService.toUnitConversion(this.gold);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopData.prototype, "Type", {
            /**
               * @获得商品类型
               */
            get: function () {
                return Model.ShopType[this.st.type];
            },
            enumerable: true,
            configurable: true
        });
        return ShopData;
    }());
    Model.ShopData = ShopData;
    __reflect(ShopData.prototype, "Model.ShopData");
})(Model || (Model = {}));
//# sourceMappingURL=ShopData.js.map