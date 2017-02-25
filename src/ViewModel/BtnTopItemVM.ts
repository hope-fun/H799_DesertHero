module ViewModel {
	/**
	 *
	 * @author: zhu_jun.
	 * @date: 2015.12.25.
	 */
    export class BtnTopItemVM extends eui.Button {

        /**
         * @按钮回调方法.
         */
        public onCallBack: Function;
        /**
         * @按钮Icon图片.
         */
        public btnIcon: eui.Image;
        /**
         * @在exml里面给btnIcon字段赋值.
         */
        public btnIconSource: string = "";

        public constructor(_onCallBack: Function) {
            super();
            this.skinName = View.BtnTopItem;
            this.onCallBack = _onCallBack;
            //            this.setSkinPart("btnIconSource",this.btnIconSource);//TODO:这句好像加不加无所谓.
        }

        protected createChildren() {
            super.createChildren();
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.btnIcon.source = this.btnIconSource;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                Model.AudioService.Shared().PlaySound("YX-001_mp3");
            }, this);
        }
    }
}
