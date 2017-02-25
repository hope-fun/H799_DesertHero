module ViewModel{
    /**
     *
     * @author cai_haotian
     * @date 2016.4.11
     *
     */
    export class OffLineRewardVM extends eui.Component{
        /**
         * @奖励数量
         */ 
        public rewardCount:eui.Label;
        
        /**
         * @确定按钮
         */ 
        public confirmBtn:ViewModel.BtnShareVM;
        
        /**
         * @父节点
         */ 
        public uiLayer:eui.UILayer;
        
        /**
         * @回调方法
         */ 
        public onCallBack:Function;
        
    	public constructor(_uiLayer?:eui.UILayer,_onCallBack?:Function) {
        	super();
 
                this.skinName = View.OffLineRewardView;
        	
            
            this.uiLayer=_uiLayer;
            this.onCallBack=_onCallBack;
            this.uiLayer.addChild(this);
    	}
    	
    	protected createChildren(){
    	      super.createChildren();
    	      this.init();
    	      this.setCount()
    	}
    	
    	private init(){
        	this.confirmBtn.setOffLineBtn();
    	      this.confirmBtn.once(egret.TouchEvent.TOUCH_TAP,()=>{
        	    this.uiLayer.removeChild(this);
        	  },this)
    	}
    	
    	public setCount(){
    	     this.rewardCount.text=Model.PlayerLocalService.PlayerData.OffLineMoney;
           Model.PlayerLocalService.PlayerData.AddGold = Model.PlayerLocalService.PlayerData.offLineMoney;
           //调用成就 by cai_haotian 2016.4.5
           Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_COIN,Model.PlayerLocalService.PlayerData.offLineMoney);
    	}
    	
    }
}