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
     * @date 2015.12.30
     *
     */
    var BtnMagicWeaponDetailVM = (function (_super) {
        __extends(BtnMagicWeaponDetailVM, _super);
        function BtnMagicWeaponDetailVM() {
            var _this = _super.call(this) || this;
            /**
             * @按钮的文本内容
             */
            _this.detailTextIn = "";
            _this.skinName = View.BtnMagicWeaponDetailItem;
            return _this;
        }
        BtnMagicWeaponDetailVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.detailText.text = this.detailTextIn;
        };
        return BtnMagicWeaponDetailVM;
    }(eui.Button));
    ViewModel.BtnMagicWeaponDetailVM = BtnMagicWeaponDetailVM;
    __reflect(BtnMagicWeaponDetailVM.prototype, "ViewModel.BtnMagicWeaponDetailVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=BtnMagicWeaponDetailVM.js.map