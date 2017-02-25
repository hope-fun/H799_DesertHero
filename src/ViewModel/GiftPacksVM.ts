module ViewModel{
    /**
     *
     * @author cai_haotian 
     * @date 2015.12.29.
     *
     */
    export class GiftPacksVM extends eui.Component{
        /**
         * @物品1
         */ 
        private goods0:eui.Label;
        /**
         *@物品2 
         */ 
        private goods1:eui.Label;
        
        /**
         * @打折剩余时间
         */ 
        private leftTime:eui.Label;
        
        /**
         * @关闭按钮
         */ 
        private closeBtn:ViewModel.CloseBtnVM;
        
        /**
         * @买按钮
         */ 
        private buyBtn:ViewModel.BtnShareVM;
        
        /**
         * @父节点
         */      
        private uiLayer:eui.UILayer;
        
        /**
         * @回调方法
         */ 
        private onCallBack:Function;
        
    	public constructor(_uiLayer?:eui.UILayer,_onCallBack?:Function) {
        	super();
        	
     
                this.skinName = View.GiftPacksView;
        	
            
            this.uiLayer=_uiLayer;
            this.onCallBack=_onCallBack;
            this.buyBtn.description.text = "￥ 9";
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                this.uiLayer.removeChild(this);
            },this)
            this.uiLayer.addChild(this);
    	}
    	
    	protected createChildren(){
    	      super.createChildren();
              this.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                  Model.AudioService.Shared().PlaySound("YX-001_mp3");
              },this);
    	}
    }
}