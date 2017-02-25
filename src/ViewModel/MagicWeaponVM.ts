module ViewModel {
	/**
	 *
	 * @author fangchao
	 * @date 2015.12.28
	 *
	 */
    export class MagicWeaponVM extends eui.Component {
        /**
   	     * @父节点.
    	 */
       private uiLayer: eui.UILayer;
        /**
         * @回调函数.
         */
       private onCallBack: Function;
         /**
         * @窗口关闭按钮
         */ 
       private magicCloseBtn: eui.Button;
        /**
         * @神器图片
         */ 
       private magicWeapon: eui.Image;
       /**
        * @黑色背景图片
        */ 
       private mask_black:eui.Image;
       /**
        * @主体界面
        */
       private window: eui.Group;
       
		public constructor(_uiLayer:eui.UILayer,_magicWeapon:number,_onCallBack?:Function) {
            super();
            this.skinName = View.MagicWeaponView;
            this.uiLayer = _uiLayer;
            this.onCallBack = _onCallBack;
            this.magicWeapon.source = "magic_weapon_" + _magicWeapon;
            this.uiLayer.addChild(this);
            egret.Tween.get(this.mask_black).to({ alpha: .7 },700,egret.Ease.circIn);
            egret.Tween.get(this.window).to({ y: 0 },700,egret.Ease.backOut);
            if(Model.WebServiceBase.isDebug)
            { console.log("fangchao: add magic weapon vm to ui layer !　");}; 
             /**
              * @添加按钮关闭事件.
              */                                
            this.magicCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {  
                egret.Tween.get(this.mask_black).to({ alpha: 0 },700,egret.Ease.circIn);
                egret.Tween.get(this.window).to({ y: -550},700,egret.Ease.backIn);
                setTimeout(() => {
                    this.uiLayer.removeChild(this);
                },700);
            },this);
		} 
        protected createChildren() {
            super.createChildren();
        }
	}
}
