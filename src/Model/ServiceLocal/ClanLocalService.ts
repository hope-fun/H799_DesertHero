module Model{
    /**
     *
     * @author cai_haotian
     * @date 2016.3.21
     *
     */
    export class ClanLocalService {
        /**
         * @家族数据
         */ 
        public static clanListData:ClanData[]=null;
        
        /**
         * @获取家族数据
         */ 
        public static get ClanListData():ClanData[]{
            return ClanLocalService.clanListData;
        }
        
        /**
         * @增加所有伤害数值
         */ 
        public static addTypeAll:number=0;
        
        /**
         * @获取增加所有伤害数值
         */ 
        public static get AddTypeAll():number{
            return ClanLocalService.addTypeAll;
        }
        
        /**
         * @增加所有点击伤害数值
         */
        public static addTypeClick: number=0;
        
        /**
         * @获取增加所有点击伤害数值
         */
        public static get AddTypeClick(): number {
            return ClanLocalService.addTypeClick;
        }
        
        /**
         * @增加暴击伤害
         */
        public static addTypeCrit: number=0;
        
        /**
         * @获取增加的暴击伤害
         */
        public static get AddTypeCrit(): number {
            return ClanLocalService.addTypeCrit;
        }
        
        /**
         * @减cd
         */
        public static cutSkillCd: number=0;
        
        /**
         * @获取减cd数值
         */
        public static get CutSkillCd(): number {
            return ClanLocalService.cutSkillCd;
        }
        
        
    	public constructor() {
    	}
    	
    	/**
    	 * @设置家族数据
    	 */ 
    	public static setClanList(){
    	      if(ClanLocalService.clanListData){
                ClanLocalService.addTypeAll=0;
                ClanLocalService.addTypeClick=0;
                ClanLocalService.addTypeCrit=0;
                ClanLocalService.cutSkillCd=0;
                WebValue.dataDyModel.clanModelList = [];//重置网络层数据.
    	          for(var info of ClanLocalService.clanListData) {
                      ClanLocalService.setClanAttribute(info);
                      WebValue.dataDyModel.clanModelList.push(info.dy);
    	          }
    	      }else{
                ClanLocalService.clanListData=[];
    	          for(var stInfo of WebValue.dataStModel.clanList) {
                    var dy: ClanDyModel = Enumerable.From(WebValue.dataDyModel.clanModelList).Where(x=> x.clanId == stInfo.id).FirstOrDefault(null);
                    var data: ClanData = new ClanData(stInfo,dy);
                    ClanLocalService.setClanAttribute(data);
                    ClanLocalService.clanListData.push(data);
    	          }
    	      }
            return ClanLocalService.clanListData;
    	}
    	
    	/**
    	 * @设置各自属性
    	 */ 
    	public static setClanAttribute(_data:ClanData){
        	if(_data.dy){
                switch(_data.Type) {
                    case FamliyType.CLAN_TYPE_ALL:
                        ClanLocalService.addTypeAll += _data.st.clanValue
                        break;
                    case FamliyType.CLAN_TYPE_CLICK:
                        ClanLocalService.addTypeClick += _data.st.clanValue;
                        break;
                    case FamliyType.CLAN_TYPE_CRIT:
                        ClanLocalService.addTypeCrit += _data.st.clanValue;
                        break;
                    case FamliyType.CLAN_TYPE_CUT_SKILL_CD:
                        ClanLocalService.cutSkillCd += _data.st.clanValue;
                        break;
                    default: alert("家族加成属性出错！！请联系管理员！c");
                }
        	}
    	}
    	
    	/**
    	 * @购买回调函数
    	 */ 
    	public static buySuccessCallBack(_data:ClanData){
    	     PlayerLocalService.PlayerData.dy.treasure-=_data.st.activationCost;
    	     var dy:ClanDyModel=new ClanDyModel(_data.st.id);
    	     _data.dy=dy;
    	     PlayerLocalService.initAllData();
    	}
    	
    	
    	
    	
    	
    	
    }
}