module Model{
    /**
     *
     * @author cai_haotian 
     * @date 2016.4.1
     *
     */
    export class AchievementLocalService {
        /**
         * @成就数据
         */ 
        public static achievementList:Array<AchievementData>=null;
        
        /**
         * @获取成就数据
         */ 
        public static get AchievementList():Array<AchievementData>{
            return AchievementLocalService.achievementList;
        }
        
        
    	public constructor() {
    	}
    	
    	/**
    	 * @设置成就数据
    	 */ 
    	public static setAchievementList(){
        	  if(AchievementLocalService.achievementList){
                   for(var info of AchievementLocalService.achievementList) {
                       AchievementLocalService.setCurrentState(info);
                       AchievementLocalService.setGetState(info);
            	       }
            	       
                   AchievementLocalService.achievementList=Enumerable.From(AchievementLocalService.achievementList).OrderByDescending(x=>x.getState).ThenBy(x=>x.dy.stage).ToArray();
        	  }else{
            	      AchievementLocalService.achievementList=[];
                  for(var stData of WebValue.dataStModel.achievementList) {
                      var dy: AchievementDyModel = Enumerable.From(WebValue.dataDyModel.achievementModelList).Where(x=> x.achievementId == stData.id).FirstOrDefault(null);
                      var data: AchievementData = new AchievementData(stData,dy);
                      AchievementLocalService.setStageInfo(data);
                      AchievementLocalService.setCurrentState(data);
                      AchievementLocalService.achievementList.push(data);
        	      }
        	  }
        	  return AchievementLocalService.achievementList;
    	}
    	
    	/**
    	 * @设置等级需求数据
    	 */ 
    	public static setStageInfo(_data:AchievementData){
    	      _data.firstValue=MainLocalService.toTenConversion(_data.st.firstValue,_data.st.firstMagnitude);
    	      _data.secondValue=MainLocalService.toTenConversion(_data.st.secondValue,_data.st.secondMagnitude);
    	      _data.thirdValue=MainLocalService.toTenConversion(_data.st.thirdValue,_data.st.thirdMagnitude);
    	      _data.fourthValue=MainLocalService.toTenConversion(_data.st.fourthValue,_data.st.fourthMagnitude);
    	      _data.fifthValue=MainLocalService.toTenConversion(_data.st.fifthValue,_data.st.fifthMagnitude);
    	}
    	
    	/**
    	 * @设置目前成就达成数量
    	 */ 
    	public static setCurrentGet(_type:AchievementType,_count?:number){
            switch(_type){
    	            case AchievementType.ACHIEVEMENT_TYPE_KILL_ENEMY:
                    var data=Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_KILL_ENEMY).FirstOrDefault(null);
    	              data.dy.count+=_count;  
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_GET_COIN:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_GET_COIN).FirstOrDefault(null);
                    data.dy.count += _count;  
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_ARRIVE_SCENE:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_ARRIVE_SCENE).FirstOrDefault(null);
                    data.dy.count = _count;  
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_GET_JEWEL:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_GET_JEWEL).FirstOrDefault(null);
                    data.dy.count += _count;  
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_GET_MAGIC_WEAPON:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_GET_MAGIC_WEAPON).FirstOrDefault(null);
                    data.dy.count += _count;  
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_FRIEND_DAMAGE:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_FRIEND_DAMAGE).FirstOrDefault(null);
                    data.dy.count = _count?_count:0;
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_GET_FRIEND:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_GET_FRIEND).FirstOrDefault(null);
                    data.dy.count += _count;  
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_GET_GIFT:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_GET_GIFT).FirstOrDefault(null);
                    data.dy.count += _count;  
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_GET_BOX:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_GET_BOX).FirstOrDefault(null);
                    console.log("cai_haotian baoxiang shu ju "+JSON.stringify(data));
                    
                    data.dy.count += _count;
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_KILL_BOSS:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_KILL_BOSS).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_USE_SKILL1:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_USE_SKILL1).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_USE_SKILL2:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_USE_SKILL2).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_USE_SKILL3:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_USE_SKILL3).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_USE_SKILL4:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_USE_SKILL4).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_USE_SKILL5:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_USE_SKILL5).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                  case AchievementType.ACHIEVEMENT_TYPE_USE_SKILL6:
                    var data = Enumerable.From(AchievementLocalService.AchievementList).Where(x=> x.Type == AchievementType.ACHIEVEMENT_TYPE_USE_SKILL6).FirstOrDefault(null);
                    data.dy.count += _count;
                    break;
                  default:alert("成就信息出现错误！请联系管理员！！");
    	      }
            AchievementLocalService.setCurrentState(data);//一旦变动立刻设置状态
//            AchievementLocalService.beAchieved();//设置是否达到数量更新ui界面
    	}
    	
    	/**
    	 * @设置当前奖励状态
    	 */ 
    	public static setCurrentState(_data:AchievementData){ 
    	      if(_data.dy.count>=0&&_data.dy.stage<1){
                _data.RewardType = <RewardType>RewardType[_data.st.firstRewardType];
                _data.RewardCount=_data.st.firstRewardValue;
                _data.matchStage=1;
    	          return;
            }else if(_data.dy.count>=_data.firstValue&&_data.dy.stage<2){
                _data.RewardType = <RewardType>RewardType[_data.st.secondRewardType];
                _data.RewardCount=_data.st.secondRewardValue;
                _data.matchStage = 2;
                return;
    	      }else if(_data.dy.count>=_data.secondValue&&_data.dy.stage<3){
                _data.RewardType = <RewardType>RewardType[_data.st.thirdRewardType];
                _data.RewardCount = _data.st.thirdRewardValue;
                _data.matchStage = 3;
                return;
    	      }else if(_data.dy.count>=_data.thirdValue&&_data.dy.stage<4){
    	          _data.RewardType=<RewardType>RewardType[_data.st.fourthRewardType];
                _data.RewardCount = _data.st.fourthRewardValue;
                _data.matchStage = 4;
    	          return;
    	      }else if(_data.dy.count>=_data.fourthValue&&_data.dy.stage<5){
    	          _data.RewardType=<RewardType>RewardType[_data.st.fifthRewardType];
    	          _data.RewardCount=_data.st.fifthRewardValue;
                _data.matchStage = 5;
    	          return;
            } else if(_data.dy.count >= _data.fifthValue && _data.dy.stage >= 5){
                  _data.matchStage = 6; 
            }
    	}
    	
    	/**
    	 * @判断是否可领取
    	 */ 
      public static setGetState(_data: AchievementData){
          switch(_data.matchStage) {
              case 0:
              case 1:
                  _data.getState=_data.dy.count >= _data.firstValue?true:false;
                  break;
              case 2:
                  _data.getState=_data.dy.count >= _data.secondValue?true:false;
                  break;
              case 3:
                  _data.getState =_data.dy.count >= _data.thirdValue?true:false;
                  break;
              case 4:
                  _data.getState =_data.dy.count >= _data.fourthValue?true:false;
                  break;
              case 5:
                  _data.getState =_data.dy.count >= _data.fifthValue?true:false;
                  break;
              case 6:
                  break;
              default: alert("成就状态出错！！！c2");
          }
    	}
    	
    	/**
    	 * @判断成就是否达成如果达成将提示玩家
    	 */ 
        public static beAchieved(){
            var flag=true;
            var i=0;
            while(flag){
                switch(AchievementLocalService.AchievementList[i].matchStage) {
                    case 0:
                    case 1:
                        AchievementLocalService.AchievementList[i].dy.count >= AchievementLocalService.AchievementList[i].firstValue;
                        break;
                    case 2:
                        AchievementLocalService.AchievementList[i].dy.count >= AchievementLocalService.AchievementList[i].secondValue;
                        break;
                    case 3:
                        AchievementLocalService.AchievementList[i].dy.count >= AchievementLocalService.AchievementList[i].thirdValue;
                        break;
                    case 4:
                        AchievementLocalService.AchievementList[i].dy.count >= AchievementLocalService.AchievementList[i].fourthValue;
                        break;
                    case 5:
                        AchievementLocalService.AchievementList[i].dy.count >= AchievementLocalService.AchievementList[i].fifthValue;
                        break;
                    case 6:
                        break;
                    default: alert("成就状态出错！！！c2");
                }
                i++;
            }
            
        }
    	
    	
    	
    }
}