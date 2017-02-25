module ViewModel {
	/**
	 *
	 * @author fangchao 
	 * @date 2016.1.4
	 *
	 */
	export class PartInRewardVM extends eui.Component{
    	/**
    	 * @父元素
    	 */ 
        private uiLayer: eui.UILayer;
        /**
         * @回调函数
         */ 
        private onCallBack: Function;
        /**
         * @黑色背景
         */ 
        private mask_black_reward: eui.Image;
        /**
         * @主体窗口
         */ 
        private window: eui.Group;
        /**
         * @关闭按钮
         */ 
        private LGCloseBtn: eui.Button;
        /**
         * @cdkey输入文本
         */ 
        private cdkey: eui.EditableText;
        /**
         * @领取奖励按钮
         */ 
        private btnEarnReward: ViewModel.BtnShareVM;
    	public constructor(_uiLayer:eui.UILayer,_onCallBack?:Function) {
            super();
            this.uiLayer = _uiLayer;
            this.onCallBack = _onCallBack;
            
 
                this.skinName = View.PartInRewardView;
            
            
            this.uiLayer.addChild(this);
		}
        protected createChildren() { 
            super.createChildren();
            this.initWindow();
            this.getReward();
        }
        
        private initWindow(){
            egret.Tween.get(this.mask_black_reward).to({ alpha: .7 },700,egret.Ease.circIn);
            egret.Tween.get(this.window).to({ y: 0 },700,egret.Ease.backOut);
            this.LGCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                egret.Tween.get(this.mask_black_reward).to({ alpha: 0 },700,egret.Ease.circIn);
                egret.Tween.get(this.window).to({ y: -500 },700,egret.Ease.backIn);
                setTimeout(() => {
                    this.uiLayer.removeChild(this);
                },700);
            },this);
            this.btnEarnReward.costIcon.visible=false;
            this.btnEarnReward.costNum.visible=false;
            if(Model.WebValue.isTraditional){
                this.btnEarnReward.description.text = "領取獎勵";
            }else{
                this.btnEarnReward.description.text = "领取奖励";
            }
            
            this.btnEarnReward.description.size=24;
        }
        
        private getReward(){
            this.btnEarnReward.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                this.callBack();
            },this)
        }
        
        private callBack(){
            if(this.onCallBack){
                this.onCallBack(this.cdkey.text)
            }
        }
	}
}
