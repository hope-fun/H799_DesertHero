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
    var BtnBottomVM = (function (_super) {
        __extends(BtnBottomVM, _super);
        function BtnBottomVM(_onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.BtnBottomView;
            _this.onCallBack = _onCallBack;
            return _this;
        }
        BtnBottomVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        BtnBottomVM.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        return BtnBottomVM;
    }(eui.Component));
    ViewModel.BtnBottomVM = BtnBottomVM;
    __reflect(BtnBottomVM.prototype, "ViewModel.BtnBottomVM");
})(ViewModel || (ViewModel = {}));
