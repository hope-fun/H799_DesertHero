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
     * @author cai_haotian
     * @date 2015.12.29.
     *
     */
    var GiftPacksVM = (function (_super) {
        __extends(GiftPacksVM, _super);
        function GiftPacksVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.GiftPacksView;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.buyBtn.description.text = "￥ 9";
            _this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.uiLayer.removeChild(_this);
            }, _this);
            _this.uiLayer.addChild(_this);
            return _this;
        }
        GiftPacksVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                Model.AudioService.Shared().PlaySound("YX-001_mp3");
            }, this);
        };
        return GiftPacksVM;
    }(eui.Component));
    ViewModel.GiftPacksVM = GiftPacksVM;
    __reflect(GiftPacksVM.prototype, "ViewModel.GiftPacksVM");
})(ViewModel || (ViewModel = {}));
