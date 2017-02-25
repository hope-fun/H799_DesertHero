module Model{
    /**
     *
     * @author cai_haotian 
     * @date 2016.4.1.
     *
     */
    export class AchievementData {
    	public constructor(_st:AchievementStModel,_dy:AchievementDyModel) {
        	this.st=_st;
        	this.dy=_dy;
    	}
    	
    	/**
    	 * @静态数据
    	 */ 
    	public st:AchievementStModel;
    	
    	/**
    	 * @动态数据
    	 */ 
    	public dy:AchievementDyModel;
    	
    	/**
    	 * @第一阶段数量
    	 */ 
    	public firstValue:number;
    	
    	/**
    	 * @第二阶段数量
    	 */ 
    	public secondValue:number;
    	
    	/**
    	 * @第三阶段数量
    	 */ 
    	public thirdValue:number;
    	
    	/**
    	 * @第四阶段数量
    	 */ 
    	public fourthValue:number;
    	
    	/**
    	 * @第五阶段数量
    	 */ 
    	public fifthValue:number;
    	
    	/**
    	 * @当前可获得奖品类型
    	 */ 
    	public get Type(){
            return <AchievementType>AchievementType[this.st.type];
    	};
    	
    	/**
    	 * @当前匹配第几阶段
    	 */ 
    	public matchStage:number=0;
    	
    	/**
    	 * @当前可获得奖励类型
    	 */ 
        public RewardType: RewardType;
        
        /**
         * @当前奖励可获取数量
         */ 
        public RewardCount:number=0;
    	
        /**
         * @当前是否可领取
         */ 
        public getState:boolean=false;
    	
    	
    }
}