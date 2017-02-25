module ViewModel{
        /**
         *
         * @author 
         *
         */
        export class ScrollMsgVM extends eui.Component{
            /**
             * @关卡名称
             */ 
            private roundName:eui.Label;
            
            /**
             * @卷轴
             */ 
            private scrollBar:eui.Image;
            
            /**
             * @父节点
             */ 
            private uiLayer:eui.UILayer;
            
            /**
             * @回调函数
             */ 
            private onCallBack:Function;
            
        	public constructor(uiLayer?:eui.UILayer,onCallBack?:Function,roundName?:string) {
            	    super();
            	    this.skinName=View.ScrollMsg;
            	    this.roundName.text=roundName;
            	    this.uiLayer=uiLayer;
            	    this.onCallBack=onCallBack;
            	    this.uiLayer.addChild(this);
        	}
        	
        	protected createChildren(){
        	    super.createChildren();
        	    this.initScroll();
        	}
        	
        	/**
        	 * @卷轴初始化
        	 * @by cai_haotian 2016.2.3.
        	 */ 
        	private initScroll(){
        	    egret.Tween.get(this.scrollBar).to({width:276},500).call(()=>{
                    egret.Tween.get(this.roundName).to({ alpha: 1 },100).call(() => {
                        egret.setTimeout(() => {
                            if(this.onCallBack)this.onCallBack(this.uiLayer);
                        },this,800)
                    });
            	    });
        	}
        	
        }
}