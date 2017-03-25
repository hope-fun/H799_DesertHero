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
     * @date 2016.3.18
     *
     */
    var PersonalMsgVM = (function (_super) {
        __extends(PersonalMsgVM, _super);
        function PersonalMsgVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.PersnoalMsgView;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        PersonalMsgVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initWindow();
            this.initInfo();
        };
        PersonalMsgVM.prototype.initWindow = function () {
            var _this = this;
            egret.Tween.get(this.maskBlackSettings).to({ alpha: 0.7 }, 700, egret.Ease.circIn);
            egret.Tween.get(this.window).to({ y: 0 }, 700, egret.Ease.backOut);
            this.LGCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                egret.Tween.get(_this.maskBlackSettings).to({ alpha: 0 }, 700, egret.Ease.circIn);
                egret.Tween.get(_this.window).to({ y: -550 }, 700, egret.Ease.backIn).call(function () {
                    _this.uiLayer.removeChild(_this);
                });
            }, this);
        };
        PersonalMsgVM.prototype.initInfo = function () {
            this.allWeaponLevel.text = Model.PlayerLocalService.PlayerData.allFriendLevel + "";
            this.hitRate.text = Model.PlayerLocalService.PlayerData.CritRate + "%";
            this.secondAddition.text = Model.PlayerLocalService.PlayerData.allDamageAdd + "%";
            this.hitAddition.text = Model.PlayerLocalService.PlayerData.allCritdDamageAdd + "%";
            this.goldAddition.text = Model.PlayerLocalService.PlayerData.allGoldAdd + "%";
        };
        return PersonalMsgVM;
    }(eui.Component));
    ViewModel.PersonalMsgVM = PersonalMsgVM;
    __reflect(PersonalMsgVM.prototype, "ViewModel.PersonalMsgVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=PersonalMsgVM.js.map