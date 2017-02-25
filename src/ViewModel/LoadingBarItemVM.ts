module ViewModel {
	/**
	 *
	 * @author zhu_jun.
	 * @date: 2015.12.25.
	 */
	export class LoadingBarItemVM extends eui.ProgressBar{
    	
        private loadingBar : eui.Image;
    	private loadingLabel : eui.Label;
        
		public constructor() {
            super();
		}
		
        protected createChildren() {
            super.createChildren();
            this.skinName = "View.LoadingBarItem";
            this.thumb = this.loadingBar;
            this.labelDisplay = this.loadingLabel;
            this.minimum = 0;
            this.value = 0;
            this.maximum = 100;
        }
        
        public setProgress(current,total): void {
//            console.log("Test: current value is " + current + " total " + total + " value is " + Math.floor(current / total * 100));
            this.value = Math.floor(current / total*100);
        }
	}
}
