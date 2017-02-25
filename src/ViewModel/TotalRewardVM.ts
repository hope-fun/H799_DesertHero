module ViewModel {
	/**
	 *
	 * @author fangchao
	 *
	 */
	export class TotalRewardVM  extends eui.Component{
    	 /**
         * @拥有灵石数量
         */ 
        private magicStone:eui.Label;
        
        /**
         * @关闭按钮
         */ 
        private closeBtn:ViewModel.CloseBtnVM;
        
        /**
         * @显示列表
         */ 
        private listGroup:eui.Group;
        
    
        /**
         * @父节点
         */ 
        public uiLayer:eui.UILayer;
        
        /**
         * @回调方法
         */ 
        public onCallBack:Function;
		public constructor(_uiLayer:eui.UILayer,_onCallBack?:Function) {
            super();

                this.skinName = View.TotalRewardView;
            
            
            this.uiLayer = _uiLayer;
            this.onCallBack = _onCallBack;
            this.uiLayer.addChild(this);
		}
        protected createChildren() {
            super.createChildren();
            this.initWindow();
        }
        
        private initWindow(){
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.uiLayer.removeChild(this);
            },this);
            this.magicStone.text=Model.PlayerLocalService.PlayerData.dy.jewel+"";
        }
        
        public setList(_data:Model.CumulativeRechargeInfo){
            var ListInfo:Array<Model.CumulativeRechargeModel>=_data.cumulativeRechargeList;
            var playerInfo:number=_data.playerRecharge;
            for(var i=0;i<ListInfo.length;i++){
                var item:TotalRewardItemVM=new TotalRewardItemVM(this.listGroup,(_data:Model.CumulativeRechargeModel)=>{
                        Model.WebService.GetCumulativeRecharge(_data.cumulativeId,() => {
                            if(Model.WebServiceBase.isDebug) {
                                console.log("cai_haotian GetCumulativeRecharge success!!!!!!");
                            }
                            Model.PlayerLocalService.PlayerData.AddJewel = _data.rewardCount;
                            //调用成就 2016.4.5
                            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_JEWEL,_data.rewardCount);
                            this.magicStone.text = Model.PlayerLocalService.PlayerData.dy.jewel + "";
                        },() => {
                            if(Model.WebValue.isTraditional){
                                alert("獲取累計充值獎勵失敗！")
                            }else{
                                alert("获取累计充值奖励失败！");
                            }
                            if(Model.WebServiceBase.isDebug) {
                                console.log("cai_haotian GetCumulativeRecharge failed!!!!!!!");
                            }
                        })
                    });
                item.setInfo(ListInfo[i],playerInfo);
            }
        }
	}
}
