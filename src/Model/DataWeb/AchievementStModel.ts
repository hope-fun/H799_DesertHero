module Model{
    /**
     *
     * @author cai_haotian 
     * @date 2016.3.31
     *
     */
    export class AchievementStModel {
        /**
         * @成就id
         */ 
        public id:number;
        
        /**
         * @名称 
         */ 
        public name:string;
        
        /**
         * @图片
         */ 
        public pic:string;
        
        /**
         * @描述
         */ 
        public description:string;
        
        /**
         * @类型
         */ 
        public type:string;
        
        /**
         * @阶段1要求值
         */ 
        public firstValue:number;
        
        /**
         * @阶段1数量级ID
         */ 
        public firstMagnitude:number;
        
        /**
         * @阶段1奖励类型
         */
        public firstRewardType: string;
        
        /**
         * @阶段1奖励数量
         */ 
        public firstRewardValue:number;
        
        /**
         * @阶段2要求值
         */ 
        public secondValue:number;
        
        /**
         * @阶段2数量级ID
         */ 
        public secondMagnitude:number;
        
        /**
         * @阶段2奖励类型
         */ 
        public secondRewardType:string;
        
        /**
         * @阶段2奖励数量
         */ 
        public secondRewardValue:number;
        
        /**
         * @阶段3要求值
         */ 
        public thirdValue:number;
        
        /**
         * @阶段3数量级ID
         */ 
        public thirdMagnitude:number;
        
        /**
         * @阶段3奖励类型
         */ 
        public thirdRewardType:string;
        
        /**
         * @阶段3奖励数量
         */ 
        public thirdRewardValue:number;
        
        /**
         * @阶段4要求值
         */ 
        public fourthValue:number;
        
        /**
         * @阶段4数量级ID
         */ 
        public fourthMagnitude:number;
        
        /**
         * @阶段4奖励类型
         */ 
        public fourthRewardType:string;
        
        /**
         * @阶段4奖励数量
         */ 
        public fourthRewardValue:number;
        
        /**
         * @阶段5要求值
         */ 
        public fifthValue:number;
        
        /**
         * @阶段5数量级ID
         */ 
        public fifthMagnitude:number;
        
        /**
         * @阶段5奖励类型
         */ 
        public fifthRewardType:string;
        
        /**
         * @阶段5奖励数量
         */ 
        public fifthRewardValue:number;
        
    	public constructor() {
    	}
    }
}