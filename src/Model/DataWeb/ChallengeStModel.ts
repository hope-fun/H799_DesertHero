module Model{
    /**
     *
     * @author by cai_haotian 
     * @date 2016.4.14 
     *
     */
    export class ChallengeStModel {
        /**
         * @id
         */ 
        public id:number;
        
        /**
         * @难度系数
         */ 
        public difficultNum:number;
        
        /**
         * @图片资源
         */ 
        public icon:string;
        
        /**
         * @奖励类型
         */ 
        public rewardType:string;
        
        /**
         * @奖励数量
         */ 
        public rewardCount:number;
        
        /**
         * @描述
         */ 
        public description:string;
        
    	public constructor() {
    	}
    }
}