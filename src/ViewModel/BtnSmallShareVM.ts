module ViewModel {
    /**
     *
     * @author by cai_haotian 2015.12.23.
     *
     */
    export class BtnSmallShareVM extends eui.Button {
        /*
         * 按钮上技能状态描述
         */
        public state: eui.Label;
        /**
         * @商城按钮上的状态文字
         */
        public describe: eui.Label;
        /**
         * @friend小伙伴和商城所用图片
         */
        public friend: eui.Image;
        /**
         * @zhujue显示图片
         */
        public zhujue: eui.Image;
        /**
         * @花费的钱数量
         */ 
        public costNum: eui.Label;
        /**
         * @花费的钱单位(元宝 金币)
         */
        public costIcon: eui.Image;
        public constructor() {
            super();
            this.skinName = View.BtnSmallShareItem;
        }

        protected createChildren(): void {
            super.createChildren();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                Model.AudioService.Shared().PlaySound("YX-002_mp3");
            },this);
        }
        /**
         * @挚友10,100连升
         * @by cai_haotian 2016.2.25.
         */ 
        public setFriendIcon(count?:number,cost?:string){
            this.friend.visible=true;
            this.describe.text="+"+count;
            this.costNum.text = cost;
        }
        
        /**
         * @主角10,100连升
         * @by cai_haotian 2016.2.25.
         */
        public setCharIcon(count?: number,cost?:string) {
            this.zhujue.visible = true;
            this.describe.text = "+" + count;
            this.costNum.text=cost;
        }
        
    }
}