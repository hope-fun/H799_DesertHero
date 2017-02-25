module Model {
	/**
	 * @author: zhu_jun.
	 * @date: 2016.01.15.
	 */
    export class PlayerLocalService {
    	/**
    	 * @玩家数据.
    	 */
        private static playerData: PlayerData = null;
    	
		/**
		 * @by zhu_jun,2016.01.15.
		 * @获取玩家数据.
		 */
        public static get PlayerData(): PlayerData {
            return PlayerLocalService.playerData;
        }

        public constructor() {
            
        }
		
		/**
		 * @初始化所有数据.
		 * @暂时放在玩家身上.
		 */
        public static initAllData() {
            PlayerLocalService.setPlayerData(() => {
                ClanLocalService.setClanList();//家族数据也应该先初始化，影响秒伤全部伤害和暴击率等.by cai_haotian 2016.4.7
                MagicWeaponService.setMagicWeaponList();//最先初始化神器,神器影响秒伤和点击伤害.
                FriendLocalService.setFriendList();//其次初始化挚友,秒伤影响点击伤害.
                PlayerSkillLocalService.setPlayerSkillList();//初始化玩家技能.
                SceneLocalService.setSceneData();//场景要在主角和神器之后初始化.
                MonsterLocalService.setMonsterList();//怪物初始化要在场景好了之后.
                ShopLocalService.setShopList();//更新商城数据 by cai_haotian 2016.3.1.
                AchievementLocalService.setAchievementList();//更新成就数据 by cai_haotian 2016.4.5
            });//最后初始化主角,主角收到其他模块影响.
        }
		
		/**
		 * @by zhu_jun,2016.01.20.
		 * @设置玩家数据.(初始化)
		 */
        public static setPlayerData(initFunc: Function): PlayerData {
            if(PlayerLocalService.playerData) {
                if(Model.WebServiceBase.isDebug) {
                    console.log("主角数据已经有了,不需要重新创建.");
                }
                
            } else {
                PlayerLocalService.playerData = new PlayerData(WebValue.dataDyModel.playerModel,WebValue.dataStModel.sysConfigModel);
                PlayerLocalService.setOffLineMoney()//设置离线奖励 by cai_haotian 2016.4.11
            }
            initFunc();
            PlayerLocalService.setPlayerClickDamage();//设置点击伤害.
            PlayerLocalService.setPlayerUpgradeCost();
            PlayerLocalService.setPlayerTenUpgradeCost();//设置十连升价格
            PlayerLocalService.setPlayerHundredUpgradeCost();//设置百连升价格
            PlayerLocalService.setPlayerInfo();//设置玩家信息
            WebValue.dataDyModel.playerModel = PlayerLocalService.playerData.dy;//更新网络层数据.
            return PlayerLocalService.playerData;
        }

		/**
		 * @by zhu_jun,2016.01.15.
		 * @玩家升级消耗.
		 * @_level: 玩家要升到的等级.
		 * @ 主角升级消耗铜币=ROUNDUP（leadCostRatio^主角等级，0）
		 */
        public static setPlayerUpgradeCost(): number {
            PlayerLocalService.playerData.upgradeCost = Math.ceil(Math.pow(parseFloat(WebValue.dataStModel.sysConfigModel.leadCostRatio),PlayerLocalService.playerData.dy.level));
            return PlayerLocalService.playerData.upgradeCost;
        }
        
        /**
         * @by cai_haotian,2016.3.8.
         * @玩家十连升消耗
         * @ 主角升级消耗铜币=ROUNDUP（leadCostRatio^主角等级，0）
         */ 
        public static setPlayerTenUpgradeCost():number{
            var cost:number=0;
            for(var i=0;i<10;i++){
                cost += Math.ceil(Math.pow(parseFloat(WebValue.dataStModel.sysConfigModel.leadCostRatio),PlayerLocalService.playerData.dy.level+i));
            }
            PlayerLocalService.playerData.tenUpgradeCost=cost;
            return PlayerLocalService.playerData.tenUpgradeCost
        }
        
        /**
         * @by cai_haotian,2016.3.8.
         * @玩家百连升消耗
         * @ 主角升级消耗铜币=ROUNDUP（leadCostRatio^主角等级，0）
         */
        public static setPlayerHundredUpgradeCost(): number {
            var cost: number = 0;
            for(var i = 0;i < 100;i++) {
                cost += Math.ceil(Math.pow(parseFloat(WebValue.dataStModel.sysConfigModel.leadCostRatio),PlayerLocalService.playerData.dy.level + i));
            }
            PlayerLocalService.playerData.hundredUpgradeCost = cost;
            return PlayerLocalService.playerData.hundredUpgradeCost;
        }

		/**
		 * @by zhu_jun,2016.01.15.
		 * @玩家基础点击伤害差值.
		 * @基础点击伤害=ROUNDUP（clickHurtRatio^主角等级，0）
		 */
        private static setClickDamageBase(): number {//_level:number
            PlayerLocalService.playerData.clickDamageBase = Math.ceil(Math.pow(parseFloat(WebValue.dataStModel.sysConfigModel.clickHurtRatio),PlayerLocalService.playerData.dy.level));
            PlayerLocalService.playerData.clickDamageBaseNext = Math.ceil(Math.pow(parseFloat(WebValue.dataStModel.sysConfigModel.clickHurtRatio),PlayerLocalService.playerData.dy.level + 1));
            return PlayerLocalService.playerData.clickDamageBase;
        }
		
		/**
		 * @设置玩家总点击伤害.
		 * @总点击伤害 =（基础点击伤害+挚友总秒伤/20）*（1+技能加成）
		 * @技能加成包括挚友技能效果里的:1.提升所有伤害（FRIEND_SKILL_TYPE_ALL）2.提升点击伤害（FRIEND_SKILL_TYPE_CLICK）
         * @神兵里的:1.提升点击伤害（WEAPON_TYPE_ADD_CLICK_DAMAGE）
		 */
        public static setPlayerClickDamage() {
            PlayerLocalService.setClickDamageBase();//设置基础点击伤害.
            PlayerLocalService.playerData.dy.clickDamage = (PlayerLocalService.playerData.clickDamageBase +
                PlayerLocalService.playerData.dy.friendDamage / 20) *
                (100 + FriendLocalService.FriendSkillTypeAll +
                    FriendLocalService.FriendSkillTypeClick +
                    MagicWeaponService.AddClickDamage+ClanLocalService.AddTypeAll+ClanLocalService.AddTypeClick) / 100;
            PlayerLocalService.playerData.clickDamageNext = (PlayerLocalService.playerData.clickDamageBaseNext +
                PlayerLocalService.playerData.dy.friendDamage / 20) *
                (100 + FriendLocalService.FriendSkillTypeAll +
                    FriendLocalService.FriendSkillTypeClick +
                    MagicWeaponService.AddClickDamage + ClanLocalService.AddTypeAll + ClanLocalService.AddTypeClick) / 100;
            
            PlayerLocalService.playerData.clickDamageDelta = PlayerLocalService.playerData.clickDamageNext - PlayerLocalService.playerData.dy.clickDamage;
            
            return PlayerLocalService.playerData.dy.clickDamage;
        }
        
        /**
         * @设置玩家信息
         * @by cai_haotian 2016.3.18
         */ 
        public static setPlayerInfo(){

            PlayerLocalService.playerData.allDamageAdd = FriendLocalService.FriendSkillTypeAll + MagicWeaponService.AddCommon + MagicWeaponService.AddAllSkillDamage;
            
            PlayerLocalService.playerData.allGoldAdd = FriendLocalService.FriendSkillTypeCoin + MagicWeaponService.AddCoin;
            if(Model.WebServiceBase.isDebug) {
                console.log("zhujun: PlayerLocalService.playerData.BaseCritDmageMultiple * 100 " + PlayerLocalService.playerData.BaseCritDmageMultiple * 100 + " FriendLocalService.FriendSkillTypeCrit " + FriendLocalService.FriendSkillTypeCrit + " MagicWeaponService.AddCritDamage " + MagicWeaponService.AddCritDamage + " ClanLocalService.AddTypeCrit " + ClanLocalService.AddTypeCrit); 
            }
            
            
            
            PlayerLocalService.playerData.allCritdDamageAdd = PlayerLocalService.playerData.BaseCritDmageMultiple * 100 + FriendLocalService.FriendSkillTypeCrit + MagicWeaponService.AddCritDamage + ClanLocalService.AddTypeCrit;
        }
        
        /**
         * @设置每秒点击伤害.
         */ 
        public static setPerSecondTapDamage(_value?:number){
            if(Model.WebServiceBase.isDebug) {
                console.log("zhujun: setPerSecondTapDamage " + _value);
            }
            
            PlayerLocalService.PlayerData.PerSecondTapDamage = _value;
        }
        
        /**
         * @主角升级成功回调.
         * @设置+10 +100方法
         * @Modify by cai_haotian 2016.3.14
         */
        public static upgradeSuccessedCallBack(_data: PlayerData,_time:number=1) {
            switch(_time){
                case 1: PlayerLocalService.playerData.AddGold = -_data.upgradeCost;//扣钱.
                    PlayerLocalService.playerData.dy.level += 1;//增加等级.
                    break;
                case 10: PlayerLocalService.playerData.AddGold = -_data.tenUpgradeCost;//10连升扣钱
                    PlayerLocalService.playerData.dy.level += 10;//增加等级.
                    break;
                case 100: PlayerLocalService.playerData.AddGold = -_data.hundredUpgradeCost;//10连升扣钱
                    PlayerLocalService.playerData.dy.level += 100;//增加等级.
                    break;
                default:alert("升级出现错误，请联系管理员!");
            }
            PlayerLocalService.initAllData();//主角升级会影响主角技能.
        }
        
        /**
         * @金币是否足够.
         */
        public static isEnoughGold(_deltaGold: number,_onEnough: Function = null): boolean {
            if(PlayerLocalService.PlayerData.dy.gold < _deltaGold) {
                return false;
            } else {
                if(_onEnough) {
                    _onEnough(_deltaGold);
                }
                return true;
            }
        }
        
        /**
         * @增减金币.
         * @_deltaGold: 需要加减的金币前三位数量,是有正负的.
         * @_unitId:需要加减的金币单位id.
         * @return:金币够减true,金币不够减false.
         */
        public static changeGold(_deltaGold: number): boolean {
            return PlayerLocalService.isEnoughGold(_deltaGold,(_bDeltaGold: number) => {
                PlayerLocalService.PlayerData.AddGold = _bDeltaGold;
            });
        }
        
        /**
         * @元宝是够足够.
         */
        public static isEnoughSycee(_deltaSycee: number,_onEnough: Function = null) {
            if(PlayerLocalService.PlayerData.dy.treasure < _deltaSycee) {
                return false;
            } else {
                if(_onEnough) {
                    _onEnough(_deltaSycee);
                }
                return true;
            }
        }
        
        /**
         * @增减元宝.
         * @_deltaSycee:需要加减的元宝前三位数量,带正负传入.
         */
        public static changeSycee(_deltaSycee: number) {
            return PlayerLocalService.isEnoughSycee(_deltaSycee,(_bDeltaSycee) => {
                PlayerLocalService.PlayerData.dy.treasure += _bDeltaSycee;
            });
        }
        
        /**
         * @设置离线奖励钱币数
         * @by cai_haotian 
         * @2016.4.11
         */ 
        public static setOffLineMoney(){
            var myDate = new Date();
            var now = myDate.getTime() / 1000;
            var offLineTime=0;
            
            if(PlayerLocalService.PlayerData.dy.offLineTime != 0) {
                offLineTime = now - PlayerLocalService.PlayerData.dy.offLineTime > 14400 ? 14400 : Math.round(now - PlayerLocalService.PlayerData.dy.offLineTime);
                offLineTime = offLineTime < 0 ? 0 : offLineTime;
            }
            
            PlayerLocalService.PlayerData.offLineMoney = Math.round(Math.pow(Number(WebValue.dataStModel.sysConfigModel.monsterHpRatio),Number(Model.WebValue.dataDyModel.playerModel.sceneId)) / 4 * (1 + FriendLocalService.FriendSkillTypeCoin / 100 + MagicWeaponService.AddCoin / 100) / 100
                * offLineTime);
        }
    }
}
