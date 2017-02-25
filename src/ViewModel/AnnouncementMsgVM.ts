module ViewModel{
    
    /**
     *
     * @author cai_haotian 
     * @date 2016.1.18.
     *
     */
    export class AnnouncementMsgVM extends eui.Component{
        /**
         * @关闭按钮
         */ 
        private closeBtn:ViewModel.CloseBtnVM;
        
        /**
         * @第一条信息的标题
         */ 
        private noticeInfoTitle0:eui.Label;
        
        /**
         * @第一条信息的活动时间
         */ 
        private activeTime0:eui.Label;
        
        /**
         * @第一条信息的详情
         */ 
        private activeDetail0:eui.Label;
        
        
        /**
         * @第二条信息的标题
         */
        private noticeInfoTitle1: eui.Label;
        
        /**
         * @第二条信息的活动时间
         */
        private activeTime1: eui.Label;
        
        /**
         * @第二条信息的详情
         */ 
        private activeDetail1: eui.Label;
        
        
        /**
         * @父节点
         */ 
        private uiLayer:eui.UILayer;
        
        
        /**
         * @回调方法
         */ 
        private onCallBack:Function;
        
        
    	public constructor(_uiLayer:eui.UILayer,_onCallBack:Function) {
        	super();

                this.skinName = View.AnnouncementMsg;

            this.uiLayer=_uiLayer;
            this.uiLayer.addChild(this);
            this.onCallBack=_onCallBack;            
            
    	}
    	
    	protected createChildren(){
            super.createChildren();
            this.setInfo();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.uiLayer.removeChild(this);
            },this);
    	}
    	
    	/**
    	 * @设置信息
    	 */ 
    	public setInfo(){

    	}
    	
    	
    }
}