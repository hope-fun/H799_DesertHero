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
     *
     */
    var LackGoldVM = (function (_super) {
        __extends(LackGoldVM, _super);
        function LackGoldVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.LackGoldView;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        LackGoldVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initVM();
        };
        /**
         * @初始化
         */
        LackGoldVM.prototype.initVM = function () {
            var _this = this;
            if (Model.WebValue.isTraditional) {
                this.cancelBtn.description.text = "取消";
            }
            else {
                this.cancelBtn.description.text = "取消";
            }
            this.cancelBtn.description.size = 22;
            this.cancelBtn.costIcon.visible = false;
            this.cancelBtn.costNum.visible = false;
            if (Model.WebValue.isTraditional) {
                this.rechargeBtn.description.text = "儲值";
            }
            else {
                this.rechargeBtn.description.text = "充值";
            }
            this.rechargeBtn.description.size = 22;
            this.rechargeBtn.costIcon.visible = false;
            this.rechargeBtn.costNum.visible = false;
            egret.Tween.get(this.mask_black).to({ alpha: .7 }, 700, egret.Ease.circIn);
            egret.Tween.get(this.window).to({ y: 0 }, 700, egret.Ease.backOut);
            this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                egret.Tween.get(_this.mask_black).to({ alpha: 0 }, 700, egret.Ease.circIn);
                egret.Tween.get(_this.window).to({ y: -550 }, 700, egret.Ease.backIn);
                egret.setTimeout(function () {
                    _this.uiLayer.removeChild(_this);
                }, _this, 700);
            }, this);
            this.rechargeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.onCallBack();
                egret.Tween.get(_this.mask_black).to({ alpha: 0 }, 700, egret.Ease.circIn);
                egret.Tween.get(_this.window).to({ y: -550 }, 700, egret.Ease.backIn);
                egret.setTimeout(function () {
                    _this.uiLayer.removeChild(_this);
                    for (var i = 0; i < Main.singleton.mainMenuVM.btnBottomGroup.length; i++) {
                        if (Main.singleton.mainMenuVM.btnMall == Main.singleton.mainMenuVM.btnBottomGroup[i]) {
                            Main.singleton.mainMenuVM.btnBottomGroup[i].currentState = "down";
                            Main.singleton.mainMenuVM.btnBottomGroup[i].enabled = false;
                            Main.singleton.mainMenuVM.btnBottomGroup[i].btnWordImage.source = Main.singleton.mainMenuVM.btnBottomGroup[i].btnWordSourceDown;
                        }
                        else {
                            Main.singleton.mainMenuVM.btnBottomGroup[i].currentState = "up";
                            Main.singleton.mainMenuVM.btnBottomGroup[i].enabled = true;
                            Main.singleton.mainMenuVM.btnBottomGroup[i].btnWordImage.source = Main.singleton.mainMenuVM.btnBottomGroup[i].btnWordSource;
                        }
                    }
                    Main.singleton.mainMenuVM.menuPopupGroup.visible = true;
                    Main.singleton.mainMenuVM.menuPopup.setMData(true);
                }, _this, 700);
            }, this);
        };
        return LackGoldVM;
    }(eui.Component));
    ViewModel.LackGoldVM = LackGoldVM;
    __reflect(LackGoldVM.prototype, "ViewModel.LackGoldVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=LackGoldVM.js.map