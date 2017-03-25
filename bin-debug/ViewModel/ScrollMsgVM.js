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
     * @author
     *
     */
    var ScrollMsgVM = (function (_super) {
        __extends(ScrollMsgVM, _super);
        function ScrollMsgVM(uiLayer, onCallBack, roundName) {
            var _this = _super.call(this) || this;
            _this.skinName = View.ScrollMsg;
            _this.roundName.text = roundName;
            _this.uiLayer = uiLayer;
            _this.onCallBack = onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        ScrollMsgVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initScroll();
        };
        /**
         * @卷轴初始化
         * @by cai_haotian 2016.2.3.
         */
        ScrollMsgVM.prototype.initScroll = function () {
            var _this = this;
            egret.Tween.get(this.scrollBar).to({ width: 500 }, 550).call(function () {
                egret.Tween.get(_this.roundName).to({ alpha: 1 }, 150).call(function () {
                    egret.setTimeout(function () {
                        if (_this.onCallBack)
                            _this.onCallBack(_this.uiLayer);
                    }, _this, 800);
                });
            });
        };
        return ScrollMsgVM;
    }(eui.Component));
    ViewModel.ScrollMsgVM = ScrollMsgVM;
    __reflect(ScrollMsgVM.prototype, "ViewModel.ScrollMsgVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=ScrollMsgVM.js.map