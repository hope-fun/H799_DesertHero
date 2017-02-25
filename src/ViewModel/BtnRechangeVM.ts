module ViewModel {
	/**
	 *
	 * @author fangchao 
	 * @date 2015.12.29
	 *
	 */
	
	export class BtnRechargeVM extends eui.Button {
    	/**
    	 * @按钮的文本框
    	 */ 
        private btnText: eui.Label;
        /**
    	 * @按钮的文本内容
    	 */
        public btnTextIn: string = "";
		public constructor() {
            super();
            this.skinName = View.BtnRechargeView;
		}
        protected createChildren() {
            super.createChildren();
            this.btnText.text = this.btnTextIn;
        }
	}
}
