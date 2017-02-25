module Model{
    /**
     *
     * @author cai_haotian
     * @date 2016.3.28
     *
     */
    export class RankDyModel {
        /**
         * @闯关排名
         */ 
        public rankSceneList:Array<RankSceneModel>;
        
        /**
         * @当前玩家排名
         */ 
        public rankScene:RankSceneModel;
        
        /**
         * @关卡排名变动
         */
        public sceneChange: number;
        
        /**
         * @秒伤排名
         */ 
        public rankDPSList:Array<RankDPSModel>;
        
        /**
         * @当前玩家排名
         */
        public rankDPS: RankDPSModel;
        
        /**
         * @关卡排名变动
         */
        public DPSChange: number;
        
        /**
         * @充值排名
         */ 
        public rankRechargeList:Array<RankRechargeModel>;
        
        /**
         * @当前玩家排名
         */
        public rankRecharge: RankRechargeModel;
        
        /**
         * @关卡排名变动
         */
        public rechargeChange: number;
        
    	public constructor() {
    	}
    }
}