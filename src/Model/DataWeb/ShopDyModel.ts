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
         * @银币数量
         */ 
        public silver:number;
        
        
        public constructor(_id: number,_time:number,_silver:number) {
            this.shopId=_id;
            this.lastShopTime=_time;
            this.silver=_silver;
        }
    }
}