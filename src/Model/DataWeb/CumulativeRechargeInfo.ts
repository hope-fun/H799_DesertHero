module Model{
    /**
     *
     * @author cai_haotian 
     * @date 2016.3.23.
     *
     */
    export class CumulativeRechargeInfo {
        /**
         * @累充奖励信息
         */ 
        public cumulativeRechargeList:Array<CumulativeRechargeModel>;
        /**
         * @玩家已充值数量
         */ 
        public playerRecharge:number;
        
    	public constructor() {
    	}
    }
}