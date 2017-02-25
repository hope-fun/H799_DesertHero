module Model{
    /**
     *
     * @author cai_haotian 
     * @date 2016.3.21.
     *
     */
    export class ClanStModel {
        /**
         * @家族id
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
         * @加成类型
         */ 
        public clanType:string;
        /**
         * @加成值 
         */ 
        public clanValue:number;
        /**
         * @激活消耗货币类型
         */ 
        public activationMoneyType:string;
        /**
         * @激活消耗值
         */ 
        public activationCost:number;
        /**
         * @描述
         */ 
        public described:string;
        
    	public constructor() {
    	}
    }
}