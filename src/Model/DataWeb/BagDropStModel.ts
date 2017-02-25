module Model {
    /**
     *
     * @author cai_haotian 
     * @Date 2016.2.26.
     *
     */
    export class BagDropStModel {
        /**
         * @掉落id
        */ 
        public id: number;
      
        /**
         * @掉落名称
        */ 
        public name: string;
      
        /**
         * @掉落物品类型
        */ 
        public dropType: string;
      
        /**
         * @描述
        */ 
        public dropTypeDescribe: string;
      
        /**
         * @持续时间
        */ 
        public goOnTime: number;
        
        /**
         * @出现概率
        */
        public probability: number;

        public constructor() {
        }
    }
}