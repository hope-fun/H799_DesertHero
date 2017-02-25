module Model{
    /**
     *
     * @author cai_haotian 
     * @by 2016.2.26.
     *
     */
    export class ShopLocalService {
      /**
       * @商城列表数据
       */ 
      private static shopList:ShopData[]=null;  
      
      /**
       * @单条提交数据
       */ 
      public static shopItemData:ShopData;
        
      /**
       * @获得商城列表数据
       */ 
      public static get ShopList():ShopData[]{
          return ShopLocalService.setShopList();
      }
      
    	public constructor() {
    	}
    	
    	/**
    	 * @设置商城数据
    	 */ 
      public static setShopList(){
          if(ShopLocalService.shopList){
              for(var i = 0;i < ShopLocalService.shopList.length; i++) {
                  ShopLocalService.shopList[i].gold = ShopLocalService.setShopGold(ShopLocalService.shopList[i].st);
              }
          }else{
              ShopLocalService.shopList=[];
              for(var i = 0;i < WebValue.dataStModel.shopList.length;i++) {
                  var dy: ShopDyModel = Enumerable.From(WebValue.dataDyModel.shopModelList).Where(x=> x.shopId == WebValue.dataStModel.shopList[i].id).FirstOrDefault(null);
                  var data: ShopData = new ShopData(dy,WebValue.dataStModel.shopList[i]);
                  data.gold = ShopLocalService.setShopGold(WebValue.dataStModel.shopList[i]);
                  ShopLocalService.initProtectFriend(data);
                  ShopLocalService.shopList.push(data);
              }
          }
    	    return ShopLocalService.shopList;
    	}
    	
    	/**
    	 * @根据元宝数来计算不同档次的铜钱数量
    	 * @商城100元宝购买金币= monsterHpRatio^关卡序号/4*（1+铜币掉落加成）*100
       * @注：其实100前面一段公式就是当前关卡非BOX小怪掉钱公式）
       * @商城1000元宝购买金币=100元宝购钱*30
       * @商城5000元宝购买金币=100元宝购钱*1000000
    	 */ 
    	public static setShopGold(_data:ShopStModel):number{
            var baseMoney: number = Math.pow(Number(WebValue.dataStModel.sysConfigModel.monsterHpRatio),Number(Model.WebValue.dataDyModel.playerModel.sceneId)) / 4 * (1 + FriendLocalService.FriendSkillTypeCoin/100 + MagicWeaponService.AddCoin/100)*100
        	switch(_data.id){
        	    case 1:
        	    //100元宝
        	       return baseMoney;
                case 2:
                //1000元宝
                    return baseMoney*30;
                case 3:
                //5000元宝
                    return baseMoney * 1000000;
                default:return 0;
        	}
    	}
    	
    	/**
    	 * @初始化是否挚友技能可以被封印
    	 */ 
      public static initProtectFriend(_data: ShopData){
	       if(_data.st.id==4&&_data.dy){
               var myDate = new Date();
               var now=myDate.getTime() / 1000;
               if(now - _data.dy.lastShopTime <= 86400){
                    ShopLocalService.protectFriend();
               }
	       }
    	}
    	
    	/**
    	 * @商城购买提交函数
    	 */ 
      public static commitShop(_data: ShopData,_isFree:boolean,_onCallBack?:Function){
          
          var myDate=new Date();
          _data.dy = new ShopDyModel(_data.st.id,Math.round(myDate.getTime() / 1000),_data.gold);//这里获得的时间是ms，到最终用于计算的是s
          WebService.commitShop(_data.dy,()=>{
              if(WebServiceBase.isDebug) {
                  console.log("cai_haotian commitShop success！");
              }
              ShopLocalService.upGradeShop(_data,_isFree,_onCallBack);
          },() => {
              alert("购买道具失败！！");
              if(WebServiceBase.isDebug) {
                  console.log("cai_haotian commitShop failed！！！");
              }
          });
    	}
    	
    	
    	/**
    	 * @商城购买成功回调函数
    	 */ 
      public static upGradeShop(_data: ShopData,_isFree:boolean,_onCallBack:Function){
            
            if(_isFree){
                //免费
                PlayerLocalService.changeSycee(0);
                Model.PlayerLocalService.PlayerData.dy.freeSkillTime = 0;//用完之后免费释放重新置为0
            }else{
                //减钱
                PlayerLocalService.changeSycee(-_data.st.cost);
            }
        	
            
            switch(_data.st.id){
                case 1: 
                    
                    ShopLocalService.addMoney(_data.gold,2);
                    break;
                case 2:
                    ShopLocalService.addMoney(_data.gold,5);
                    break;
                case 3:
                    ShopLocalService.addMoney(_data.gold,10);
                    break;
                case 4:
                    ShopLocalService.protectFriend();
                    break;
                case 5:
                    ShopLocalService.hugeDamage();
                    break;
                default:alert("商城购买出错！请联系管理员！c");
            }
            _onCallBack();
    	}
    	
    	/**
    	 * @前三个购物选项单纯是给玩家加钱
    	 */ 
    	public static addMoney(_gold:number,_timer:number){
            //调用成就 by cai_haotian 2016.4.5
            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_COIN,_gold);
    	}
    	    	
    	/**
    	 * @技能4保护挚友不会被杀
    	 */ 
        public static protectFriend(){
            Model.PlayerLocalService.PlayerData.protectFriend=true;
    	}
    	
    	/**
    	 * @技能5对敌人造成巨大伤害
    	 */ 
        public static hugeDamage(){
            var changeHp=Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hp*0.9;
            Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].AddHp = -changeHp;
    	}
    }
}