module Model{
    /**
     *
     * @author cai_haotian
     * @date 2016.3.23.
     *
     */
    export class DailyRechargeModel {
        /**
         * @每日充值id
         */ 
        public dailyRechargeId:number;
        /**
         * @累计天数
         */ 
        public cumulativeDays:number;
        /**
         * @奖励物品1类型
         */ 
        public rewardTypeFirst:string;
        /**
         * @奖励物品1数量
         */ 
        public rewardCountFirst:number;
        /**
         * @奖励物品2类型
         */ 
        public rewardTypeSecond:string;
        /**
         * @奖励物品2数量
         */ 
        public rewardCountSecond:number;
        /**
         * @奖励状态
         * @-1未达成
         * @0可领取 
         * @1已领取
         */ 
        public rewardState:number;
        
    	public constructor() {
    	}
    }
}