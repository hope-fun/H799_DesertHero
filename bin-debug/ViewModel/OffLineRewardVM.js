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
     * @date 2016.4.11
     *
     */
    var OffLineRewardVM = (function (_super) {
        __extends(OffLineRewardVM, _super);
        function OffLineRewardVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.OffLineRewardView;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        OffLineRewardVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
            this.setCount();
        };
        OffLineRewardVM.prototype.init = function () {
            var _this = this;
            this.confirmBtn.setOffLineBtn();
            this.confirmBtn.once(egret.TouchEvent.TOUCH_TAP, function () {
                _this.uiLayer.removeChild(_this);
            }, this);
        };
        OffLineRewardVM.prototype.setCount = function () {
            this.rewardCount.text = Model.PlayerLocalService.PlayerData.OffLineMoney;
            Model.PlayerLocalService.PlayerData.AddGold = Model.PlayerLocalService.PlayerData.offLineMoney;
            //调用成就 by cai_haotian 2016.4.5
            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_COIN, Model.PlayerLocalService.PlayerData.offLineMoney);
        };
        return OffLineRewardVM;
    }(eui.Component));
    ViewModel.OffLineRewardVM = OffLineRewardVM;
    __reflect(OffLineRewardVM.prototype, "ViewModel.OffLineRewardVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=OffLineRewardVM.js.map