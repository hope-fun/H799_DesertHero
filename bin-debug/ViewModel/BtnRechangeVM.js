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
     * @author fangchao
     * @date 2015.12.29
     *
     */
    var BtnRechargeVM = (function (_super) {
        __extends(BtnRechargeVM, _super);
        function BtnRechargeVM() {
            var _this = _super.call(this) || this;
            /**
             * @按钮的文本内容
             */
            _this.btnTextIn = "";
            _this.skinName = View.BtnRechargeView;
            return _this;
        }
        BtnRechargeVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnText.text = this.btnTextIn;
        };
        return BtnRechargeVM;
    }(eui.Button));
    ViewModel.BtnRechargeVM = BtnRechargeVM;
    __reflect(BtnRechargeVM.prototype, "ViewModel.BtnRechargeVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=BtnRechangeVM.js.map