module Model {
	/**
	 *
	 * @author cai_haotian 2015.12.24.
	 *
	 */
	export class MagicWeaponStModel {
    	/**
    	 * @神器id
    	 */ 
        public id: number;
        /**
         * @神器name
         */ 
        public name: string;
        /**
         * @技能图标
         */ 
        public icon: string;
        /**
         * @升级消耗类型
         */ 
        public upgradeCostType:string;
        /**
         * @升级基础消耗
         */ 
        public upgradeBaseCost:number;
        /**
         * @效果类型1
         */ 
        public weaponEffectTypeFirst: string;
        /**
         * @基础效果值1(%)
         */ 
        public weaponEffectValueFirst: number;
        /**
         * @效果类型2
         */ 
        public weaponEffectTypeSecond: string;
        /**
         * @基础效果值2(%)
         */ 
        public weaponEffectValueSecond: number;
        /**
         * @效果描述1.
         */ 
        public descriptionFirst:string;
        /**
         * @效果描述2.
         */ 
        public descriptionSecond:string;
        
		public constructor() {
		}
	}
}
