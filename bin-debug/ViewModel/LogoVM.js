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
     * @author: zhu_jun.
     * @date: 2015.12.25.
     */
    var LogoVM = (function (_super) {
        __extends(LogoVM, _super);
        function LogoVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.LogoView;
            _this.onCallBack = _onCallBack;
            _this.uiLayer = _uiLayer;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        LogoVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this.onCallBack != null) {
                this.onCallBack();
            }
        };
        return LogoVM;
    }(eui.Component));
    ViewModel.LogoVM = LogoVM;
    __reflect(LogoVM.prototype, "ViewModel.LogoVM");
})(ViewModel || (ViewModel = {}));
