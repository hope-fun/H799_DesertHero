module ViewModel {
	/**
	 *
	 * @author fangchao
	 * 
	 *
	 */
	export class TotalRewardItemVM extends eui.Component {
        /**
         * @领取奖励按钮
         */ 
        private rewardBtn: ViewModel.BtnShareVM;
         /**
         * @获取灵石数量
         */
        private earnStone: eui.Label;
        /**
         * @描述
         */ 
        private description:eui.Label
        
         /**
         * @当前获取状态
         */
        private currentProgress: ViewModel.ProgressMineVM;
        
        /**
         * @完成状态
         */ 
        private completionState:eui.Label;
        
        /**
         * @完成贴图
         */ 
        private finish:eui.Image;
        
        /**
         * @父节点
         */ 
        private uiLayer: eui.Group;
        
        /**
         * @数据
         */ 
        private data: Model.CumulativeRechargeModel;
        
        /**
         * @回调函数
         */ 
        private onCallBack:Function
        
		public constructor(_uiLayer:eui.Group,_onCallBack:Function) {
            super();
            this.skinName = View.TotalRewardItem;
            this.uiLayer=_uiLayer;
            this.onCallBack=_onCallBack;
            this.uiLayer.addChild(this);
		}
		
        protected createChildren() {
            super.createChildren();
        }
        
        /**
         * @设置信息
         */ 
        public setInfo(_data:Model.CumulativeRechargeModel,_playerInfo:number){
            this.data=_data;
            this.currentProgress.slideDuration=0;
            this.currentProgress.maximum=_data.cumulativeRecharge;
            this.currentProgress.minimum=0;
            this.currentProgress.value = _playerInfo >= _data.cumulativeRecharge ? _data.cumulativeRecharge : _playerInfo;
            this.finish.visible = false;
            
            if(Model.WebValue.isTraditional){
                this.description.text="儲值"+_data.cumulativeRecharge+"元寶";
            }else{
                this.description.text = "充值" + _data.cumulativeRecharge + "元宝";
            }
            
            
            this.rewardBtn.once(egret.TouchEvent.TOUCH_TAP,this.getReward,this);
            switch(_data.rewardState){
                //可领取
                case -1:
                    this.rewardBtn.setCumulativeBtn(_data.rewardCount,true);
                    break;
                //不可领取 
                case 0:
                    this.rewardBtn.setCumulativeBtn(_data.rewardCount,false);
                    break;
                //已领取
                case 1:
                    this.rewardBtn.visible=false;
                    this.finish.visible=true;
                    break;
                default:alert("奖励状态出错！！！！");
            }
        }
        
        /**
         * @回调函数
         */ 
        private getReward(){
            if(this.onCallBack){
                this.onCallBack(this.data);
                this.rewardBtn.visible = false;
                this.finish.visible = true;
            }
        }
	}
}
