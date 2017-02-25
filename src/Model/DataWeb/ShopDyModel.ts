module Model {
    /**
     *
     * @author cai_haotian 
     * @Date 2016.2.26.
     *
     */
    export class ShopDyModel {
        /**
         * @商品id
         */ 
        public shopId: number;
        
        /**
         * @购买时间
         */ 
        public lastShopTime:number;
        
        /**
         * @金币数量
         */ 
        public gold:number;
        
        
        public constructor(_id: number,_time:number,_gold:number) {
            this.shopId=_id;
            this.lastShopTime=_time;
            this.gold=_gold;
        }
    }
}