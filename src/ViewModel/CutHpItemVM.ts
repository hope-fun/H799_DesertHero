module ViewModel {
    /**
     *
     * @author cai_haotian 2016.1.7.
     *
     */
    export class CutHpItemVM extends eui.Component {
        /**
         * @普通攻击时扣血量
         */
        public normalAttack: eui.BitmapLabel;

        /**
         * @暴击时被扣血量
         */
        public criticalAttack: eui.BitmapLabel;

        /**
         * @血量
         */
        public data: string;

        /**
         * @血量数值
         */
        public damage: number;

        /**
         * @父节点
         */
        private group: eui.Group;

        public constructor(_group?: eui.Group) {
            super();
            this.enabled = false;
            this.group = _group;
            this.skinName = View.CutHpItem;
            this.group.addChild(this);
        }

        protected createChildren() {
            console.log("zhujun: create cut hp group !!!!!!!!!!!!!!!!!!!");
            super.createChildren();
        }


    	/**
       * @设置普攻时口血量
       */
        public setNoramlAttack(_data: string, _damage: number) {
            this.data = _data;
            this.damage = _damage;
            this.normalAttack.font = RES.getRes("normal-font_fnt");
            this.normalAttack.smoothing = true;
            this.normalAttack.text = _data;
            this.normalAttack.scaleX = 1.5;
            this.normalAttack.scaleY = 1.5;
            this.TweenAnimate(100);
        }

        /**
         * @设置暴击时扣血量
         */
        public setCriticalAttack(_data: string, _damage: number) {
            this.data = _data;
            this.damage = _damage;
            this.criticalAttack.font = RES.getRes("critical-font_fnt");
            this.criticalAttack.smoothing = true;
            this.criticalAttack.text = _data;
            // this.criticalAttack.y = 10;在变改成在exml里面锚定了.
            this.criticalAttack.scaleX = 1.5;
            this.criticalAttack.scaleY = 1.5;
            egret.setTimeout(() => {
                this.TweenAnimate(50);
            }, this, 200);
        }
    	/**
         * @渐淡动画
         */
        private TweenAnimate(num?: number) {
            var groupAlphaTween = egret.Tween.get(this);
            groupAlphaTween.to({ alpha: 0, y: this.y - num }, 1000).call(() => {
                egret.Tween.removeTweens(groupAlphaTween);
                //更新目前dps by cai_haotian 2016.2.23.
                //                Main.singleton.mainMenuVM.setMIData(-Number(this.data));
                Model.PlayerLocalService.setPerSecondTapDamage(-this.damage);
                // alert("remove cut hp item");
                this.group.removeChild(this);
            });
        }
    }
}