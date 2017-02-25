module Model{
    /**
     *
     * @author cai_haotian
     * @date 2016.4.14.
     *
     */
    export class ChallengeLoaclService {
        /**
         * @每日挑战数据
         */ 
        public static challengeDataList:Array<ChallengeData>=null;
        
        /**
         * @获取每日挑战数据
         */ 
        public static get ChallengeDataList():Array<ChallengeData>{
            return ChallengeLoaclService.challengeDataList;
        }
        
        /**
         * @当前活动boss信息
         */ 
        public static challengeBossData:ChallengeData;
        
        
    	public constructor() {
    	}
    	
      public static setChallengeData(){
    	      if(ChallengeLoaclService.challengeDataList){
                for(var infoData of ChallengeLoaclService.challengeDataList) {
                    ChallengeLoaclService.setBossHp(infoData);
                }
    	      }else{
    	          ChallengeLoaclService.challengeDataList=[];
    	          for(var info of WebValue.dataStModel.challengeList){
    	              var data:ChallengeData=new ChallengeData(info);
    	              ChallengeLoaclService.setBossHp(data);
    	              ChallengeLoaclService.challengeDataList.push(data);
    	          }
    	      }
    	}
    	
    	/**
    	 * @设置挑战boss血量
    	 */ 
      public static setBossHp(_data:ChallengeData){
          _data.hpMax = Math.round(Math.pow(Number(WebValue.dataStModel.sysConfigModel.monsterHpRatio),WebValue.dataDyModel.playerModel.sceneId)*5*_data.st.difficultNum*
              (1-MagicWeaponService.CutBossHp/100));
          _data.hp=_data.hpMax;
      }

      /**
       * @设置挑战cd时间
       */ 
      public static setChallengeCD(_CDTime:number){
          PlayerLocalService.PlayerData.dy.chanllengeTime = _CDTime;
      }
      
      /**
       * @挑战成功后的回调
       */ 
      public static successBack(_data:ChallengeData){
          if(Model.WebServiceBase.isDebug){
                console.log("cai_haotian   _data "+JSON.stringify(_data));
          }
          
          switch(_data.Type){
            case DailyChallengeType.MONEY_TYPE_YB:
                  PlayerLocalService.PlayerData.dy.treasure += _data.st.rewardCount;
                break;
            case DailyChallengeType.MONEY_TYPE_JEWEL:
                  PlayerLocalService.PlayerData.AddJewel = _data.st.rewardCount;
                break;
            case DailyChallengeType.REWARD_TYPE_CUT_BAGDROP_TIME:
                  var myDate = new Date();
                  var now = myDate.getTime() / 1000;
                  PlayerLocalService.PlayerData.dy.doubleProbabilityTime = now;
                break;
            case DailyChallengeType.REWARD_TYPE_USE_SKILL_DSTQ:
                  var myDate = new Date();
                  var now = myDate.getTime() / 1000;
                  PlayerLocalService.PlayerData.dy.freeSkillTime = now;
                  PlayerLocalService.PlayerData.st.bagAppearTimeInterval/=2;
                break;
            default:alert("每日挑战奖励出错！c");
          }
          
          Model.WebService.commitData(Model.WebValue.dataDyModel,() => {
              if(Model.WebServiceBase.isDebug) {
                  console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
              }
          },() => {
              if(Model.WebValue.isTraditional){
                  alert("數據提交失敗請聯繫管理員！！！！");
              }else{
                  alert("数据提交失败请联系管理员！！！！");
              }
          });
          
      }
      
    }
}