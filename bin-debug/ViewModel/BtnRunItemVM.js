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
     *
     */
    var BtnRunItemVM = (function (_super) {
        __extends(BtnRunItemVM, _super);
        function BtnRunItemVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.skinName = View.BtnRunItem;
            return _this;
        }
        BtnRunItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return BtnRunItemVM;
    }(eui.ToggleButton));
    ViewModel.BtnRunItemVM = BtnRunItemVM;
    __reflect(BtnRunItemVM.prototype, "ViewModel.BtnRunItemVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=BtnRunItemVM.js.map