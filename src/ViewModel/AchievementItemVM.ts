module ViewModel {
    /**
     *
     * @author cai_haotian 
     * @date 2015.12.29.
     *
     */
    export class AchievementItemVM extends eui.Component {
        /**
         * @图标
         */
        private icon: eui.Image;

        /**
         * @成就名
         */
        private itemName: eui.Label;

        /**
         * @描述信息
         */
        private description: eui.Label;

        /**
         * @钱的数量
         */
        private money: eui.Label;

        /**
         * @第一颗星
         */
        private firstStar: eui.Image;

        /**
         * @第二颗星
         */
        private secondStar: eui.Image;

        /**
         * @第三颗星
         */
        private thirdStar: eui.Image;

        /**
         * @第四颗星
         */
        private fourthStar: eui.Image;

        /**
         * @第五颗星
         */
        private fifthStar: eui.Image;

        /**
         * @当前已完成状态
         */
        private completionState: eui.Label;

        /**
         * @奖励按钮
         */
        private rewardBtn: ViewModel.BtnShareVM;

        /**
         * @已完成
         */
        private finish: eui.Image;

        /**
         * @回调方法
         */
        public onCallBack: Function;

        /**
         * @父节点
         */
        public uiLayer: eui.Group;

        /**
         * @信息
         */
        public aData: Model.AchievementData;

        public constructor(_uiLayer?: eui.Group, _onCallBack?: Function) {
            super();
            this.skinName = View.AchievementItem;
            this.onCallBack = _onCallBack;
            this.uiLayer = _uiLayer;
            this.uiLayer.addChild(this);
        }

        protected createChildren() {
            super.createChildren();
        }

    	/**
    	 * @设置单条数据
    	 */
        public setItemInfo(_data: Model.AchievementData) {

            this.aData = _data;
            this.icon.source = _data.st.pic;
            this.itemName.text = _data.st.name

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
        }

    	/**
    	 * @设置按钮状态
    	 */
        private setBtnState(_data: Model.AchievementData, _getState: boolean) {
            if (_data.RewardType == Model.RewardType.MONEY_TYPE_YB) {
                this.rewardBtn.setAchievementYBBtn(_data.RewardCount, _getState);
            } else if (_data.RewardType == Model.RewardType.MONEY_TYPE_JEWEL) {
                this.rewardBtn.setAchievementJWBtn(_data.RewardCount, _getState);
            } else {
                alert("cht 奖励类型出错！！！1");
            }
        }

        private btnCallBack() {
            if (this.onCallBack) {
                this.onCallBack(this.aData);
            }
        }

    }
}