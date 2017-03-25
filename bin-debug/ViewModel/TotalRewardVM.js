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
     *
     */
    var TotalRewardVM = (function (_super) {
        __extends(TotalRewardVM, _super);
        function TotalRewardVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.TotalRewardView;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        TotalRewardVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initWindow();
        };
        TotalRewardVM.prototype.initWindow = function () {
            var _this = this;
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.uiLayer.removeChild(_this);
            }, this);
            this.magicStone.text = Model.PlayerLocalService.PlayerData.dy.jewel + "";
        };
        TotalRewardVM.prototype.setList = function (_data) {
            var _this = this;
            var ListInfo = _data.cumulativeRechargeList;
            var playerInfo = _data.playerRecharge;
            for (var i = 0; i < ListInfo.length; i++) {
                var item = new ViewModel.TotalRewardItemVM(this.listGroup, function (_data) {
                    Model.WebService.GetCumulativeRecharge(_data.cumulativeId, function () {
                        if (Model.WebServiceBase.isDebug) {
                            console.log("cai_haotian GetCumulativeRecharge success!!!!!!");
                        }
                        Model.PlayerLocalService.PlayerData.AddJewel = _data.rewardCount;
                        //调用成就 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_JEWEL, _data.rewardCount);
                        _this.magicStone.text = Model.PlayerLocalService.PlayerData.dy.jewel + "";
                    }, function () {
                        if (Model.WebValue.isTraditional) {
                            alert("獲取累計充值獎勵失敗！");
                        }
                        else {
                            alert("获取累计充值奖励失败！");
                        }
                        if (Model.WebServiceBase.isDebug) {
                            console.log("cai_haotian GetCumulativeRecharge failed!!!!!!!");
                        }
                    });
                });
                item.setInfo(ListInfo[i], playerInfo);
            }
        };
        return TotalRewardVM;
    }(eui.Component));
    ViewModel.TotalRewardVM = TotalRewardVM;
    __reflect(TotalRewardVM.prototype, "ViewModel.TotalRewardVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=TotalRewardVM.js.map