module ViewModel{
    /**
     *
     * @author cai_haotian
     * @date 2015.12.29.
     *
     */
    export class ProgressMineVM extends eui.ProgressBar{
        /**
         * @进度条底
         */ 
        public progressBg:eui.Image;
        
        /**
         * @进度条显示条
         */ 
        public thumb:eui.Image;
        
        /**
         * @进度条显示文字
         */ 
        public labelDisplay:eui.Label;
        
        
    	public constructor() {
        	super();
            this.skinName = View.ProgressMineView;
    	}
    	
    	protected createChildren(){
    	      super.createChildren();
    	}
    }
}