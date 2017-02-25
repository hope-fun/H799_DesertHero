module ViewModel{
    /**
     *
     * @author cai_haotian 2016.1.7.
     *
     */
    export class CutHpItemVM extends eui.Component{
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
        public data:string;
        
        /**
         * @血量数值
         */ 
        public damage:number;
        
        /**
         * @父节点
         */ 
        private group:eui.Component;
        
        public constructor(_group?: eui.Component) {
        	super();
        	this.enabled=false;
            this.group = _group;
        	this.skinName=View.CutHpItem;
            this.group.addChild(this);
    	}
    
    	protected createChildren(){
    	      super.createChildren();
    	}
    	
    	
    	/**
       * @设置普攻时口血量
       */
        public setNoramlAttack(_data: string,_damage:number) {
            this.data=_data;
            this.damage=_damage;
            this.normalAttack.font = RES.getRes("normal-font_fnt");
            this.normalAttack.smoothing=true;
            this.normalAttack.text = _data;
            this.TweenAnimate(100);
            //更新目前dps by cai_haotian 2016.2.23.
//            Main.singleton.mainMenuVM.mainInfo.setMIData(Number(_data));
        }
        
        /**
         * @设置暴击时扣血量
         */
        public setCriticalAttack(_data: string,_damage: number) {
            this.data = _data;
            this.damage = _damage;
            this.criticalAttack.font = RES.getRes("critical-font_fnt");
            this.criticalAttack.smoothing=true;
            this.criticalAttack.text = _data;
            this.criticalAttack.y=10;
            //更新目前dps by cai_haotian 2016.2.23.
//            Main.singleton.mainMenuVM.mainInfo.setMIData(Number(_data));
            
            egret.setTimeout(() => {
                this.TweenAnimate(50);
            },this,200);
        }
    	/**
       * @渐淡动画
       */
    	private TweenAnimate(num?:number){
            var groupAlphaTween = egret.Tween.get(this);
            groupAlphaTween.to({ alpha: 0,y: this.y-num },1000).call(() => {
                //更新目前dps by cai_haotian 2016.2.23.
//                Main.singleton.mainMenuVM.mainInfo.setMIData(-Number(this.data));
                Model.PlayerLocalService.setPerSecondTapDamage(-this.damage);
                this.group.removeChild(this)});
    	}
    }
}