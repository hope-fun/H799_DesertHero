module Model{
    /**
     *
     * @author cai_haotian 
     * @date 2016.3.23
     *
     */
    export class DailyRechargeInfo {
        /**
         * @每日充值信息
         */ 
        public dailyRechargeList:Array<DailyRechargeModel>;
        /**
         * @玩家连续充值天数
         */ 
        public playerDuration:number;
        
    	public constructor() {
    	}
    }
}