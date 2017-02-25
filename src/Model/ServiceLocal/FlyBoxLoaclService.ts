module Model {
    /**
     *
     * @author cai_haotian 
     * @by 2016.2.26.
     *
     */
    export class FlyBoxLocalService {
        /**
         * @掉落数据
         */ 
        public static dropList: BagDropStModel[]=null;
        
        /**
         * @技能数据
         */ 
        public static skillInfo: FlyBoxSkillData[]=null;
        
        /**
         * @掉落货币数据
         */
        public static currencyInfo: BagDropStModel[] = null;
        
        public constructor() {
            
        }
        
        /**
         * @设置掉落数据
         */ 
        public static setDropList(){
            if(FlyBoxLocalService.dropList){
                if(Model.WebServiceBase.isDebug) {
                    console.log("cai_haotian 盒子的掉落数据一直是不变的");
                }
                
            }else{
                FlyBoxLocalService.dropList = [];
                FlyBoxLocalService.skillInfo = [];
                FlyBoxLocalService.currencyInfo = [];
                for(var i = 0;i < WebValue.dataStModel.bagdropList.length;i++) {
                    FlyBoxLocalService.dropList.push(WebValue.dataStModel.bagdropList[i]);
                }
                
                //寒冰心法数据
                var skillInfo1 = new FlyBoxSkillData(PlayerSkillLocalService.PlayerSkillList[1],<ViewModel.BtnActiveSkillVM>Main.singleton.mainMenuVM.mainInfo.skillGroup.getChildAt(1));
                FlyBoxLocalService.skillInfo.push(skillInfo1);
                //破空霸拳
                var skillInfo2 = new FlyBoxSkillData(PlayerSkillLocalService.PlayerSkillList[2],<ViewModel.BtnActiveSkillVM>Main.singleton.mainMenuVM.mainInfo.skillGroup.getChildAt(2));
                FlyBoxLocalService.skillInfo.push(skillInfo2);
                //寂灭雷诀
                var skillInfo3 = new FlyBoxSkillData(PlayerSkillLocalService.PlayerSkillList[3],<ViewModel.BtnActiveSkillVM>Main.singleton.mainMenuVM.mainInfo.skillGroup.getChildAt(3));
                FlyBoxLocalService.skillInfo.push(skillInfo3);
                //寂灭雷诀
                var skillInfo5 = new FlyBoxSkillData(PlayerSkillLocalService.PlayerSkillList[4],<ViewModel.BtnActiveSkillVM>Main.singleton.mainMenuVM.mainInfo.skillGroup.getChildAt(4));
                FlyBoxLocalService.skillInfo.push(skillInfo5);

                FlyBoxLocalService.currencyInfo = Enumerable.From(FlyBoxLocalService.dropList).Where(x=> x.goOnTime == 0).ToArray();
                
                
                if(Model.WebServiceBase.isDebug) {
                    console.log("cai_haotian currency " + JSON.stringify(FlyBoxLocalService.currencyInfo));
                    console.log("cai_haotian skill" + FlyBoxLocalService.skillInfo);
                }
                
//                console.log("cai_haotian currency" + JSON.stringify(FlyBoxLocalService.currencyInfo));
            }
            return FlyBoxLocalService.dropList;
        }
        
        /**
         * @获得钱币
         */ 
        public static getCurrency(_currencyProbability:number):string{
            if(_currencyProbability >= 0 && _currencyProbability <= FlyBoxLocalService.currencyInfo[0].probability*0.05-1) {
                //灵石
                PlayerLocalService.PlayerData.AddJewel = 1;
                Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_JEWEL,1);
                
                return FlyBoxLocalService.currencyInfo[0].dropTypeDescribe;
            } else if(_currencyProbability >= FlyBoxLocalService.currencyInfo[0].probability * 0.05 && _currencyProbability <= FlyBoxLocalService.currencyInfo[2].probability * 0.1-1) {
                //元宝
                PlayerLocalService.PlayerData.dy.treasure += 2;
                
                //调用成就 by cai_haotian 2016.4.5
//                Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_COIN,2);
                
                return FlyBoxLocalService.currencyInfo[2].dropTypeDescribe;
            } else if(_currencyProbability >= FlyBoxLocalService.currencyInfo[2].probability * 0.1 && _currencyProbability <= FlyBoxLocalService.currencyInfo[1].probability*0.1-1) {
                //金币
                var bossHp = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hp
                var fdsAdd = FriendLocalService.FriendSkillTypeCoin/100;
                var mWAdd = MagicWeaponService.AddCoin/100;
                var add = Math.ceil((bossHp / 5) * (1 + fdsAdd + mWAdd));
                PlayerLocalService.PlayerData.AddGold = add;
                var des = FlyBoxLocalService.currencyInfo[1].dropTypeDescribe.replace("{}",MainLocalService.toUnitConversion(add));
                
                //调用成就 by cai_haotian 2016.4.5
                Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_COIN,add);
                return des;
            }
            PlayerLocalService.initAllData();
        }

    }
}