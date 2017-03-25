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
     *
     */
    var TotalRewardItemVM = (function (_super) {
        __extends(TotalRewardItemVM, _super);
        function TotalRewardItemVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.TotalRewardItem;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        TotalRewardItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * @设置信息
         */
        TotalRewardItemVM.prototype.setInfo = function (_data, _playerInfo) {
            this.data = _data;
            this.currentProgress.slideDuration = 0;
            this.currentProgress.maximum = _data.cumulativeRecharge;
            this.currentProgress.minimum = 0;
            this.currentProgress.value = _playerInfo >= _data.cumulativeRecharge ? _data.cumulativeRecharge : _playerInfo;
            this.finish.visible = false;
            if (Model.WebValue.isTraditional) {
                this.description.text = "儲值" + _data.cumulativeRecharge + "元寶";
            }
            else {
                this.description.text = "充值" + _data.cumulativeRecharge + "元宝";
            }
            this.rewardBtn.once(egret.TouchEvent.TOUCH_TAP, this.getReward, this);
            switch (_data.rewardState) {
                //可领取
                case -1:
                    this.rewardBtn.setCumulativeBtn(_data.rewardCount, true);
                    break;
                //不可领取 
                case 0:
                    this.rewardBtn.setCumulativeBtn(_data.rewardCount, false);
                    break;
                //已领取
                case 1:
                    this.rewardBtn.visible = false;
                    this.finish.visible = true;
                    break;
                default: alert("奖励状态出错！！！！");
            }
        };
        /**
         * @回调函数
         */
        TotalRewardItemVM.prototype.getReward = function () {
            if (this.onCallBack) {
                this.onCallBack(this.data);
                this.rewardBtn.visible = false;
                this.finish.visible = true;
            }
        };
        return TotalRewardItemVM;
    }(eui.Component));
    ViewModel.TotalRewardItemVM = TotalRewardItemVM;
    __reflect(TotalRewardItemVM.prototype, "ViewModel.TotalRewardItemVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=TotalRewardItemVM.js.map