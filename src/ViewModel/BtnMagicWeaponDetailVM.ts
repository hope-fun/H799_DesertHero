module ViewModel {
	/**
	 *
	 * @author fangchao
	 * @date 2015.12.30
	 *
	 */
	export class BtnMagicWeaponDetailVM extends eui.Button{
    	/**
    	 * @按钮的文本框
    	 */
        public detailText: eui.Label;
        /**
    	 * @按钮的文本内容
    	 */
        public detailTextIn: string = "";
		public constructor() {
            super();
            this.skinName = View.BtnMagicWeaponDetailItem;
		}
        protected createChildren() {
            super.createChildren();
            this.detailText.text = this.detailTextIn;
        }
	}
}
