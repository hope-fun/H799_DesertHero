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
     * @date 2016.1.4
     *
     */
    var PartInRewardVM = (function (_super) {
        __extends(PartInRewardVM, _super);
        function PartInRewardVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.skinName = View.PartInRewardView;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        PartInRewardVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initWindow();
            this.getReward();
        };
        PartInRewardVM.prototype.initWindow = function () {
            var _this = this;
            egret.Tween.get(this.mask_black_reward).to({ alpha: .7 }, 700, egret.Ease.circIn);
            egret.Tween.get(this.window).to({ y: 0 }, 700, egret.Ease.backOut);
            this.LGCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                egret.Tween.get(_this.mask_black_reward).to({ alpha: 0 }, 700, egret.Ease.circIn);
                egret.Tween.get(_this.window).to({ y: -500 }, 700, egret.Ease.backIn);
                setTimeout(function () {
                    _this.uiLayer.removeChild(_this);
                }, 700);
            }, this);
            this.btnEarnReward.costIcon.visible = false;
            this.btnEarnReward.costNum.visible = false;
            if (Model.WebValue.isTraditional) {
                this.btnEarnReward.description.text = "領取獎勵";
            }
            else {
                this.btnEarnReward.description.text = "领取奖励";
            }
            this.btnEarnReward.description.size = 24;
        };
        PartInRewardVM.prototype.getReward = function () {
            var _this = this;
            this.btnEarnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.callBack();
            }, this);
        };
        PartInRewardVM.prototype.callBack = function () {
            if (this.onCallBack) {
                this.onCallBack(this.cdkey.text);
            }
        };
        return PartInRewardVM;
    }(eui.Component));
    ViewModel.PartInRewardVM = PartInRewardVM;
    __reflect(PartInRewardVM.prototype, "ViewModel.PartInRewardVM");
})(ViewModel || (ViewModel = {}));
