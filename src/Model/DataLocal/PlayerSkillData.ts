module Model {
	/**
	 *
	 * @author: zhu_jun
	 * @data: 2016.01.14.
	 *
	 */
    export class PlayerSkillData {
        public constructor(_dy:SkillDyModel,_st:SkillStModel) {
            this.dy = _dy;
            this.st = _st;
        }
        /**
         * @技能升级效果.
         */ 
        public effect:number;
        /**
         * @下一级技能效果.
         */ 
        public effectNext:number;
        /**
         * @当前级和下一级技能效果差值.
         */ 
        public effectDelta:number;
        /**
         * @技能升级花费.
         */ 
        public cost:number;
        /**
         * @技能持续时间
         * @by cai_haotian 2016.3.25
         */ 
        public continueTime:number;
        /**
         * @技能cd时间
         */ 
        public cdTime:number;
        
        /**
         * @带单位技能花费.
         */ 
        public get CostAndUnit():string{
            return MainLocalService.toUnitConversion(this.cost);
        }
        
        /**
         * @10连升花费
         * @by cai_haotian 2016.3.8.
         */
        public tenUpgradeCost: number=0;
        /**
         * @带单位10连升花费
         * @by cai_haotian 2016.3.8.
         */
        public get TenUpgradeCostAndUnit(): string {
            return MainLocalService.toUnitConversion(this.tenUpgradeCost);
        }
        
//        /**
//         * @100连升花费
//         * @by cai_haotian 2016.3.8.
//         */
//        public hundredUpgradeCost: number;
//        /**
//         * @带单位100连升花费
//         * @by cai_haotian 2016.3.8.
//         */
//        public get HundredUpgradeCostAndUnit(): string {
//            return MainLocalService.toUnitConversion(this.hundredUpgradeCost);
//        }
        
        /**
         * @技能描述.
         */ 
        public get Description():string{
            return this.st.description.replace("{}",this.effect.toString());
        }


        
        /**
         * @技能动态数据.
         */ 
        public dy:SkillDyModel;
        
        /**
         * @技能静态数据.
         */ 
        public st:SkillStModel;
    }
}
