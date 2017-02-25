module ViewModel {
	/**
	 *
	 * @author fangchao
	 * @date 2015.12.30 
	 *
	 */
	export class BtnMusicVM  extends eui.Button{
		public constructor() {
            super();
            this.skinName = View.BtnMusicView;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                if(this.currentState === "up") { this.currentState = "down" }
                else {this.currentState="up" }
                },this)
		}
		
        protected createChildren() {
            super.createChildren();
        }
	}
}
