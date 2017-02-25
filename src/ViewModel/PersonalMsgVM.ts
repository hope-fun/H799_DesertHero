module ViewModel {
	/**
	 *
	 * @author cai_haotian 
	 * @date 2016.3.18
	 *
	 */
	export class PersonalMsgVM extends eui.Component{
    	/**
    	 * @黑色遮罩
    	 */ 
        private maskBlackSettings:eui.Image;
        
        /**
         * @窗口
         */ 
        private window:eui.Group;
        
        /**
         * @窗口关闭按钮
         */ 
        private LGCloseBtn:ViewModel.CloseBtnVM;
        
        /**
         * @所有神器等级
         */ 
        private allWeaponLevel:eui.Label;
        
        /**
         * @暴击率
         */ 
        private hitRate:eui.Label;
        
        /**
         * @秒伤加成
         */ 
        private secondAddition:eui.Label;
        
        /**
         * @暴击加成
         */ 
        private hitAddition:eui.Label;
        
        /**
         * @铜币加成
         */ 
        private goldAddition:eui.Label;
        
        /**
         * @上次兑换灵石后的时间
         */ 
        private stoneDuring:eui.Label;
        
        /**
         * @父节点
         */ 
        private uiLayer:eui.UILayer;
        
        /**
         * @回调方法
         */ 
        private onCallBack:Function;
    	
        public constructor(_uiLayer?: eui.UILayer,_onCallBack?:Function){
    	    super();
    	    

                this.skinName = View.PersnoalMsgView;
    	    
        
    	    this.uiLayer=_uiLayer;
    	    this.onCallBack=_onCallBack;
    	    this.uiLayer.addChild(this);
    	}
    	
    	protected createChildren(){
    	    super.createChildren();
    	    this.initWindow();
    	    this.initInfo();
    	}
    	
    	private initWindow(){
            egret.Tween.get(this.maskBlackSettings).to({ alpha: 0.7 },700,egret.Ease.circIn);
            egret.Tween.get(this.window).to({ y: 0 },700,egret.Ease.backOut);
            this.LGCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                egret.Tween.get(this.maskBlackSettings).to({ alpha: 0 },700,egret.Ease.circIn);
                egret.Tween.get(this.window).to({ y: -550 },700,egret.Ease.backIn).call(() => {
                    this.uiLayer.removeChild(this);
                });
            },this);
    	}
		
    	private initInfo(){
    	    this.allWeaponLevel.text=Model.PlayerLocalService.PlayerData.allFriendLevel+"";
    	    this.hitRate.text=Model.PlayerLocalService.PlayerData.CritRate+"%";
    	    this.secondAddition.text=Model.PlayerLocalService.PlayerData.allDamageAdd+"%";
    	    this.hitAddition.text=Model.PlayerLocalService.PlayerData.allCritdDamageAdd +"%";
    	    this.goldAddition.text=Model.PlayerLocalService.PlayerData.allGoldAdd+"%";
    	}
    	
	}
}

