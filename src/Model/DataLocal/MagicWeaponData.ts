module Model {
	/**
	 *
	 * @author: zhu_jun
	 * @date: 2016.01.06.
	 * @神器弹窗本地数据对象.
	 */
	export class MagicWeaponData {
    	/**
    	 * @_dy:神器动态信息.
    	 * @_st:神器静态信息.
    	 */ 
		public constructor(_dy:MagicWeaponDyModel,_st:MagicWeaponStModel) {
    		this.dy = _dy;
    		this.st = _st;
		}
		
		/**
		 * @神器升级花费.
		 */ 
        public upgradeCost:number;
		
        /**
         * @神器下一级效果值1.
         */ 
        public effectFirstNext:number;
        
		/**
		 * @神器当前效果值1.
		 */
        public effectFirst:number;
        /**
         * @神器效果1的加成类型.
         */ 
        public get TypeFirst(): MagicWeaponEffectType {
            return <MagicWeaponEffectType>MagicWeaponEffectType[this.st.weaponEffectTypeFirst];
        }
        
        /**
         * @神器下一级效果值2.
         */ 
        public effectSecondNext:number;
        
        /**
         * @神器当前效果值2.
         */ 
        public effectSecond:number;
        /**
         * @神器效果2的加成类型.
         */ 
        public get TypeSecond():MagicWeaponEffectType{
            return <MagicWeaponEffectType>MagicWeaponEffectType[this.st.weaponEffectTypeSecond];
        }

		public get Icon():string{
			return this.st.icon + "_png"
		}
        
		/**
		 * @神器动态信息.
		 */ 
		public dy:MagicWeaponDyModel;
		/**
		 * @神器静态信息.
		 */ 
		public st:MagicWeaponStModel;
	}
}
