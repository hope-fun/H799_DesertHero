module ViewModel {
	/**
	 *
	 * @author fangchao
	 * @date 2015.12.30
	 *
	 */
	export class SettingsVM extends eui.Component {
    	/**
    	 * @界面关闭按钮
    	 */
        private LGCloseBtn: eui.Button;
        /**
        * @父节点.
        */
        private uiLayer: eui.UILayer;
        /**
         * @回调函数.
         */
        private onCallBack: Function;
        /**
         * @黑色背景.
         */
        private maskBlackSettings: eui.Image;
        /**
         * @主题窗口
         */
        private window: eui.Group;
         /**
         * @个人信息按钮
         */
        private personalMsg: ViewModel.BtnMagicWeaponDetailVM;
         /**
         * @分享按钮
         */
        private share: ViewModel.BtnMagicWeaponDetailVM;
        /**
         * @音乐开关
         */
        private music: ViewModel.BtnMusicVM;
        /**
         * @音效开关
         */
        private sound:ViewModel.BtnMusicVM
		public constructor(_uiLayer:eui.UILayer,_onCallBack?:Function) {
            super();
            
 
                if(Model.WebValue.is9G){
                    this.skinName = View.SettingsView_9G;
                }else{
                    this.skinName = View.SettingsView;
                }
            
            
            this.uiLayer = _uiLayer;
            this.onCallBack = _onCallBack;
            this.uiLayer.addChild(this);
        }
        
        protected createChildren() {
            super.createChildren();
            this.initWindow();
        }
        
        /**
         * @初始化窗口
         * @by cai_haotian 2016.3.10
         */ 
        private initWindow(){
            egret.Tween.get(this.maskBlackSettings).to({ alpha: 0.7 },700,egret.Ease.circIn);
            egret.Tween.get(this.window).to({ y: 0 },700,egret.Ease.backOut);
            this.LGCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                egret.Tween.get(this.maskBlackSettings).to({ alpha: 0 },700,egret.Ease.circIn);
                egret.Tween.get(this.window).to({ y: -550 },700,egret.Ease.backIn).call(() => {
                    this.uiLayer.removeChild(this);
                });
            },this);
            this.music.addEventListener(egret.TouchEvent.TOUCH_TAP,this.BGMBtn,this);
            this.sound.addEventListener(egret.TouchEvent.TOUCH_TAP,this.soundEffectBtn,this);
            this.personalMsg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.personalInfo,this);
            this.updateButtonState();
        }
        
        /**
         * @音效开关
         * @by cai_haotian 2016.3.10
         */ 
        private soundEffectBtn(){
            Model.AudioService.Shared().IsSound=!Model.AudioService.Shared().IsSound;
            this.updateButtonState();
        }
        
        /**
         * @背景音乐开关
         * @by cai_haotian 2016.3.10.
         */ 
        private BGMBtn(){
            Model.AudioService.Shared().IsMusic=!Model.AudioService.Shared().IsMusic;
            this.updateButtonState();
        }
        
        /**
         * @根据音乐是否播放实现按钮状态
         * @by cai_haotian 2016.3.18.
         */ 
        private updateButtonState(){
            this.music.currentState = Model.AudioService.Shared().IsMusic?"up":"down";
            this.sound.currentState = Model.AudioService.Shared().IsSound ? "up" : "down";
        }
        
        /**
         * @个人信息
         * @by cai_haotian 2016.3.18
         */ 
        private personalInfo(){
            new ViewModel.PersonalMsgVM(this.uiLayer,()=>{
                    
                });
        }
        
	}
}
