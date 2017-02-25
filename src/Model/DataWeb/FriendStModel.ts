module Model {
    
    
	/**
	 *
	 * @author cai_haotian
	 * @date 2015.12.24.
	 *
	 */
	export class FriendStModel {
    	
    	/**
    	 * @技能ID
    	 */ 
        public id: number;
        /**
         * @技能名称
         */ 
        public name: string;
        /**
         * @Icon技能图标
         */ 
        public icon: string;
        /**
         * @技能类型小伙伴还是技能
         */ 
        public type:string;
        /**
         * @招募消耗货币类型
         */ 
        public recruitMoneyType: string;
        /**
         * @技能描述
         */ 
        public description:string;
        /**
         * @招募消耗
         */ 
        public recruitCost: number;
        /**
         * @招募消耗单位ID
         */ 
        public recruitCostMagnitude: number;
        /**
         * @升级基础消耗(铜币)
         */ 
        public upgradeBaseCost: number;
        /**
         * @基础消耗单位ID
         */ 
        public baseCostMagnitude: number;
    	/**
    	 * @升级消耗倍数
    	 */ 
        public upgradeCostMultiple: number;
        /**
         * @基础秒伤值
         */ 
        public baseDamage: number;
        /**
         * @基础秒伤值单位ID
         */ 
        public baseDamageMagnitude: number;
        /**
         * @升级秒伤倍数
         */ 
        public upgradeDamageMultiple: number;
        /**
         * @第一重效果类型
         */ 
        public firstLayerType: string;
        /**
         * @第一重效果值（%）
         */ 
        public firstLayerValue: number;
        /**
         * @第二重效果类型
         */ 
        public secondLayerType: string;
        /**
         * @第二重效果值
         */ 
        public secondLayerValue: number;
        /**
         * @第三重效果类型
         */ 
        public thirdLayerType: string;
        /**
         * @第三重效果值
         */ 
        public thirdLayerValue: number;
        /**
         * @第四重效果类型
         */ 
        public fourthLayerType: string;
        /**
         * @第四重效果值
         */ 
        public fourthLayerValue: number;
        /**
         * @第五重效果类型
         */
        public fifthLayerType: string;
        /**
         * @第五重效果值
         */
        public fifthLayerValue: number;
        /**
         * @第六重效果类型
         */
        public sixthLayerType: string;
        /**
         * @第六重效果值
         */
        public sixthLayerValue: number;
        /**
         * @第七重效果类型
         */
        public seventhLayerType: string;
        /**
         * @第七重效果值
         */
        public seventhLayerValue: number;
        /**
         * @待机资源名.
         */ 
        public idle:string;
        /**
         * @攻击资源名称.
         */ 
        public attack:string;
        /**
         * @特效资源名称.
         */ 
        public effect:string;
        /**
         * @攻击音效.
         */ 
        public attackAudio:string;
        
        
		public constructor() {
		}
	}
}
