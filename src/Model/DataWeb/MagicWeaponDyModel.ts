module Model {
	/**
	 * @author: zhu_jun.
	 * @date: 2015.12.26.
	 */
	export class MagicWeaponDyModel {
        public constructor(_magicWeaponId: number,_level:number) {
		    this.magicWeaponId = _magicWeaponId;
		    this.level = _level;
		}
		/**
		 * @神器ID
		 */ 
        public magicWeaponId: number;
        /**
         * @神器等级
         */ 
        public level: number;
	}
}
