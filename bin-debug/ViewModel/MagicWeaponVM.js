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
     * @date 2015.12.28
     *
     */
    var MagicWeaponVM = (function (_super) {
        __extends(MagicWeaponVM, _super);
        function MagicWeaponVM(_uiLayer, _magicWeapon, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.MagicWeaponView;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.magicWeapon.source = "magic_weapon_" + _magicWeapon;
            _this.uiLayer.addChild(_this);
            egret.Tween.get(_this.mask_black).to({ alpha: .7 }, 700, egret.Ease.circIn);
            egret.Tween.get(_this.window).to({ y: 0 }, 700, egret.Ease.backOut);
            if (Model.WebServiceBase.isDebug) {
                console.log("fangchao: add magic weapon vm to ui layer !　");
            }
            ;
            /**
             * @添加按钮关闭事件.
             */
            _this.magicCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                egret.Tween.get(_this.mask_black).to({ alpha: 0 }, 700, egret.Ease.circIn);
                egret.Tween.get(_this.window).to({ y: -550 }, 700, egret.Ease.backIn);
                setTimeout(function () {
                    _this.uiLayer.removeChild(_this);
                }, 700);
            }, _this);
            return _this;
        }
        MagicWeaponVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return MagicWeaponVM;
    }(eui.Component));
    ViewModel.MagicWeaponVM = MagicWeaponVM;
    __reflect(MagicWeaponVM.prototype, "ViewModel.MagicWeaponVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=MagicWeaponVM.js.map