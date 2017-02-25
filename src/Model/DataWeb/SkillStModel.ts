module Model {

    
    
	/**
	 *
	 * @author cai_haotian 2015.12.24.
	 *
	 */
    export class SkillStModel {
    	/**
    	 * @主角技能id
    	 */
        public id: number;
        /**
         * @技能名
         */
        public name: string;
        /**
         * @技能图标
         */
        public icon: string;
        /**
         * @开放等级
         */
        public openLevel: number;
        /**
         * @效果类型
         */
        public skillEffect: string;
        /**
         * @效果基础值
         */
        public skillEffectValue: number;
        /**
         * @效果升级增加
         */
        public skillEffectAdd: number;
        /**
         * @持续时间(s)
         */
        public continueTime: number;
        /**
         * @冷却时间(s)
         */
        public cdTime: number;
        /**
         * @升级基础消耗(铜币)
         */
        public upgradeBaseCost: number;
        /**
         * @基础消耗单位Id
         */
        public baseCostMagnitude: string;
        /**
         * @升级消耗倍数
         */
        public upgradeCostMultiple: number;
        /**
         * @描述
         */
        public description: string;
        /**
         * @消除CD消耗(元宝)
         */ 
        public removeCdCost:number;
        /**
         * @音效
         */ 
        public skillYx:string;


        public constructor() {
        }
    }


}
