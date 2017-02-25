var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewModel;
(function (ViewModel) {
    /**
     *
     * @author  fangchao
     * @date 2015.12.30
     *
     */
    var MagicWeaponBuyDetailVM = (function (_super) {
        __extends(MagicWeaponBuyDetailVM, _super);
        function MagicWeaponBuyDetailVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.MagicWeaponBuyDetail;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        MagicWeaponBuyDetailVM.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            /**
             * @添加按钮关闭事件
             */
            this.magicCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.uiLayer.removeChild(_this);
            }, this);
        };
        return MagicWeaponBuyDetailVM;
    }(eui.Component));
    ViewModel.MagicWeaponBuyDetailVM = MagicWeaponBuyDetailVM;
    __reflect(MagicWeaponBuyDetailVM.prototype, "ViewModel.MagicWeaponBuyDetailVM");
})(ViewModel || (ViewModel = {}));
