module Model {
	/**
	 *
	 * @author cai_haotian 
	 * @date 2016.3.31.
	 *
	 */
	export class AchievementDyModel {
    	/**
    	 * @成就id
    	 */ 
        public achievementId:number;
    	
    	/**
    	 * @达成数量数量     
    	 */ 
        public count:number;
 
    	/**
    	 * @阶段0-5
    	 */ 
        public stage:number;
    	
    	
    	/**
    	 * @是否领取
    	 */ 
    	public isComplete:boolean;
    	
    	
    	
		public constructor() {
		}
	}
}
