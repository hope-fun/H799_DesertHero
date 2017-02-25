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
     * @author: zhu_jun.
     * @date: 2015.12.25.
     */
    var BtnTopVM = (function (_super) {
        __extends(BtnTopVM, _super);
        function BtnTopVM(_onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.BtnTopView;
            _this.onCallBack = _onCallBack;
            return _this;
        }
        BtnTopVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return BtnTopVM;
    }(eui.Component));
    ViewModel.BtnTopVM = BtnTopVM;
    __reflect(BtnTopVM.prototype, "ViewModel.BtnTopVM");
})(ViewModel || (ViewModel = {}));
