module ViewModel {
	/**
	 *
	 * @author: zhu_jun. 
	 * @date: 2015.12.25.
	 */
    export class BtnBottomItemVM extends eui.Button {

        /**
         * @按钮回调方法.
         */
        public onCallBack: Function;

        /**
         * @在exml里面给btnWord_up状态赋值.
         */
        public btnWordSource: string = "";
        /**
         * @在exml里面给btnWord_down状态赋值.
         */
        public btnWordSourceDown: string = "";
        /**
         * @按钮Icon图片.
         */
        public btnWordImage: eui.Image;
        /**
         * @新标示
         */
        public btnNewMark: eui.Image;

        private testImage: eui.Image;

        public constructor(_onCallBack: Function) {
            super();
            this.skinName = View.BtnBottomItem;
            this.onCallBack = _onCallBack;
            this.setSkinPart("btnWordSource", this.btnWordSource);
            this.setSkinPart("btnWordSourceDown", this.btnWordSourceDown);
        }

        protected createChildren() {
            super.createChildren();
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.btnWordImage.source = this.btnWordSource;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                Model.AudioService.Shared().PlaySound("YX-002_mp3");
                if (this.currentState == "down") {
                    this.btnWordImage.source = this.btnWordSourceDown;
                } else {
                    this.btnWordImage.source = this.btnWordSource;
                }
            }, this);
        }

        /**
         * @控件状态监听.
         */
        protected getCurrentState(): string {
            if (super.getCurrentState() == "down") {
                this.btnWordImage.source = this.btnWordSourceDown;
                //                console.log("zhujun: this.btnWordSourceDown " + this.btnWordSourceDown);
            } else {
                this.btnWordImage.source = this.btnWordSource;
                //                console.log("zhujun: this.btnWordSource " + this.btnWordSource);
            }
            return super.getCurrentState();
        }
    }
}
