module ViewModel{
    /**
     *
     * @author cai_haotian
     *
     */
    export class BtnRunItemVM extends eui.ToggleButton{
        
        /**
         * @父节点
         */ 
        private uiLayer:eui.UILayer;
        
        /**
         * @回调方法
         */ 
        public onCallBack:Function;
        
    	public constructor(_uiLayer?:eui.UILayer,_onCallBack?:Function) {
        	super();
        	this.uiLayer=_uiLayer;
        	this.onCallBack=_onCallBack;
            this.skinName = View.BtnRunItem;
    	}
    	
    	protected createChildren(){
    	  super.createChildren();
    	}
    }
}