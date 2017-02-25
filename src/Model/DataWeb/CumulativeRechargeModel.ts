module Model{
    /**
     *
     * @author 
     *
     */
    export class CumulativeRechargeModel {
        /**
         * @累充奖励id
         */ 
        public cumulativeId:number;
        /**
         * @累计充值元宝
         */ 
        public cumulativeRecharge:number;
        /**
         * @奖励物品类型
         */ 
        public rewardType:string;
        /**
         * @奖励物品数量
         */ 
        public rewardCount:number;
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