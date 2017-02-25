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
     * @date 2015.12.29.
     *
     */
    var AchievementItemVM = (function (_super) {
        __extends(AchievementItemVM, _super);
        function AchievementItemVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.AchievementItem;
            _this.onCallBack = _onCallBack;
            _this.uiLayer = _uiLayer;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        AchievementItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * @设置单条数据
         */
        AchievementItemVM.prototype.setItemInfo = function (_data) {
            this.aData = _data;
            this.icon.source = _data.st.pic;
            this.itemName.text = _data.st.name;
            switch (_data.dy.stage) {
                case 6:
                case 5: this.fifthStar.source = "icon_star";
                case 4: this.fourthStar.source = "icon_star";
                case 3: this.thirdStar.source = "icon_star";
                case 2: this.secondStar.source = "icon_star";
                case 1: this.firstStar.source = "icon_star";
                case 0: break;
                default: alert("成就状态出错！！！c1");
            }
            switch (_data.matchStage) {
                case 0:
                case 1:
                    this.description.text = _data.st.description.replace("{}", Model.MainLocalService.toUnitConversion(_data.firstValue) + "");
                    this.completionState.text = Model.MainLocalService.toUnitConversion(Math.round(_data.dy.count)) + "/" + Model.MainLocalService.toUnitConversion(_data.firstValue);
                    this.setBtnState(_data, _data.getState);
                    break;
                case 2:
                    this.description.text = _data.st.description.replace("{}", Model.MainLocalService.toUnitConversion(_data.secondValue) + "");
                    this.completionState.text = Model.MainLocalService.toUnitConversion(Math.round(_data.dy.count)) + "/" + Model.MainLocalService.toUnitConversion(_data.secondValue);
                    this.setBtnState(_data, _data.getState);
                    break;
                case 3:
                    this.description.text = _data.st.description.replace("{}", Model.MainLocalService.toUnitConversion(_data.thirdValue) + "");
                    this.completionState.text = Model.MainLocalService.toUnitConversion(Math.round(_data.dy.count)) + "/" + Model.MainLocalService.toUnitConversion(_data.thirdValue);
                    this.setBtnState(_data, _data.getState);
                    break;
                case 4:
                    this.description.text = _data.st.description.replace("{}", Model.MainLocalService.toUnitConversion(_data.fourthValue) + "");
                    this.completionState.text = Model.MainLocalService.toUnitConversion(Math.round(_data.dy.count)) + "/" + Model.MainLocalService.toUnitConversion(_data.fourthValue);
                    this.setBtnState(_data, _data.getState);
                    break;
                case 5:
                    this.description.text = _data.st.description.replace("{}", Model.MainLocalService.toUnitConversion(_data.fifthValue) + "");
                    this.completionState.text = Model.MainLocalService.toUnitConversion(Math.round(_data.dy.count)) + "/" + Model.MainLocalService.toUnitConversion(_data.fifthValue);
                    this.setBtnState(_data, _data.getState);
                    break;
                case 6:
                    this.description.text = _data.st.description.replace("{}", Model.MainLocalService.toUnitConversion(_data.fifthValue) + "");
                    this.completionState.text = Model.MainLocalService.toUnitConversion(Math.round(_data.dy.count)) + "/" + Model.MainLocalService.toUnitConversion(_data.fifthValue);
                    this.rewardBtn.visible = false;
                    this.finish.visible = true;
                    break;
                default: alert("成就状态出错！！！c2");
            }
            this.rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCallBack, this);
        };
        /**
         * @设置按钮状态
         */
        AchievementItemVM.prototype.setBtnState = function (_data, _getState) {
            if (_data.RewardType == Model.RewardType.MONEY_TYPE_YB) {
                this.rewardBtn.setAchievementYBBtn(_data.RewardCount, _getState);
            }
            else if (_data.RewardType == Model.RewardType.MONEY_TYPE_JEWEL) {
                this.rewardBtn.setAchievementJWBtn(_data.RewardCount, _getState);
            }
            else {
                alert("cht 奖励类型出错！！！1");
            }
        };
        AchievementItemVM.prototype.btnCallBack = function () {
            if (this.onCallBack) {
                this.onCallBack(this.aData);
            }
        };
        return AchievementItemVM;
    }(eui.Component));
    ViewModel.AchievementItemVM = AchievementItemVM;
    __reflect(AchievementItemVM.prototype, "ViewModel.AchievementItemVM");
})(ViewModel || (ViewModel = {}));
