module Model{
    /**
     *
     * @author cai_haotian 
     * @Date 2016.2.26.
     *
     */
    export class ShopStModel {
      /**
       * @商品id
       */ 
      public id:number;
      
      /**
       * @商品名称
       */ 
      public name:string;
      
      /**
       * @商品类型
       */ 
      public type:string;
      
      /**
       * @消耗元宝数量
       */ 
      public cost:number;
      
      /**
       * @额外获得元宝
       */ 
      public extraGet:number;
      
      /**
       * @消耗人民币数量
       */ 
      public costRmb:number;
      
      /**
       * @描述
       */ 
      public description:string;
      
      /**
       * @图片资源
       */ 
      public icon:string;
        
    	public constructor() {
    	}
    }
}