module ViewModel {
	/**
	 *
	 * @author  fangchao
	 * @date 2015.12.30
	 *
	 */
    export class MagicWeaponBuyDetailVM extends eui.Component {
        
        /**
        * @父节点.
        */
        private uiLayer: egret.DisplayObjectContainer;
        /**
        * @回调函数.
        */
        private onCallBack: Function;
        /**
        * @窗口关闭按钮
        */
        private magicCloseBtn: eui.Button;
        /**
        * @黑色背景图片
        */
        private mask_black_detail: eui.Image;
        /**
        * @主体界面
        */
        private window: eui.Group;

        public constructor(_uiLayer: egret.DisplayObjectContainer,_onCallBack?: Function) {
            super();

                this.skinName = View.MagicWeaponBuyDetail;
            
            
            this.uiLayer = _uiLayer;
            this.onCallBack = _onCallBack;
            this.uiLayer.addChild(this);
            
        }

        protected createChildren() {
            super.createChildren();
            /**
             * @添加按钮关闭事件
             */
            this.magicCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.uiLayer.removeChild(this);
            },this);
        }

    }
}

