module Model {
	/**
	 *
	 * @author: zhu_jun.
	 * @data: 2016.01.15.
	 *
	 */
    export class FriendLocalService {
    	/**
    	 * @挚友提供的所有伤害提升率.
    	 */
        private static friendSkillTypeAll: number = 0;
        /**
         * @挚友模块提供的所有伤害提升率.
         */
        public static get FriendSkillTypeAll(): number {
            return FriendLocalService.friendSkillTypeAll;
        }
        /**
         * @挚友模块提供的暴击伤害加成率.
         */
        private static friendSkillTypeCrit: number = 0;
        /**
         * @挚友模块提供的暴击伤害加成率.
         */
        public static get FriendSkillTypeCrit(): number {
            return FriendLocalService.friendSkillTypeCrit;
        }
        /**
         * @挚友模块提供的暴击率加成率.
         */
        private static friendSkillTypeCritProbability: number = 0;
        /**
         * @挚友模块提供的暴击率加成率.
         */
        public static get FriendSkillTypeCritProbability(): number {
            return FriendLocalService.friendSkillTypeCritProbability;
        }
        /**
         * @挚友模块提供的点击伤害加成率.
         */
        private static friendSkillTypeClick: number = 0;
        /**
         * @挚友模块提供的点击伤害加成率.
         */
        public static get FriendSkillTypeClick(): number {
            return FriendLocalService.friendSkillTypeClick;
        }
        /**
         * @挚友模块提供的铜币掉落数量加成率.
         */
        private static friendSkillTypeCoin: number = 0;
        /**
         * @挚友模块提供的铜币掉落数量加成率.
         */
        public static get FriendSkillTypeCoin(): number {
            return FriendLocalService.friendSkillTypeCoin;
        }
        /**
         * @挚友模块提供的宝箱铜币掉落数量加成率.
         */
        private static friendSkillTypeBoxCoin: number = 0;
        /**
         * @挚友模块提供的宝箱铜币掉落数量加成率.
         */
        public static get FriendSkillTypeBoxCoin(): number {
            return FriendLocalService.friendSkillTypeBoxCoin;
        }
        /**
         * @挚友模块提供的Boss伤害加成率.
         */
        private static  friendSkillTypeBoss: number = 0;
        /**
         * @挚友模块提供的Boss伤害加成率.
         */
        public static get FriendSkilTypeBoss(): number {
            return FriendLocalService.friendSkillTypeBoss;
        }

    	/**
    	 * @挚友列表数据.
    	 */
        private static friendList: FriendData[] = null;
        
        /**
		 * @获取挚友数据.
		 */
        public static get FriendList(): FriendData[] {
            return FriendLocalService.friendList;
        }

        public constructor() {

        }
		
		/**
		 * @设置挚友数据.
		 */
        public static setFriendList(): FriendData[] {
            PlayerLocalService.PlayerData.dy.friendDamage = 0;//重置总秒伤.
            FriendLocalService.friendSkillTypeAll= 0;
            FriendLocalService.friendSkillTypeCrit = 0;
            FriendLocalService.friendSkillTypeCritProbability = 0;
            FriendLocalService.friendSkillTypeClick = 0;
            FriendLocalService.friendSkillTypeCoin = 0;
            FriendLocalService.friendSkillTypeBoxCoin = 0;
            FriendLocalService.friendSkillTypeBoss = 0;
            if(FriendLocalService.friendList) {
                WebValue.dataDyModel.friendModelList = [];//重置网络层数据.
                PlayerLocalService.PlayerData.allFriendLevel=0;
                for(var i = 0;i < FriendLocalService.friendList.length;i++) {
                    FriendLocalService.updateFriendData(FriendLocalService.friendList[i]);
                    WebValue.dataDyModel.friendModelList.push(FriendLocalService.friendList[i].dy);//更新网络层数据.
                }
            } else {
                FriendLocalService.friendList = [];
                for(var i = 0;i < WebValue.dataStModel.friendSkillList.length;i++) {
                    var dy:FriendDyModel = Enumerable.From(WebValue.dataDyModel.friendModelList).Where(x=> x.friendId == WebValue.dataStModel.friendSkillList[i].id).FirstOrDefault(null);
                    var data: FriendData = new FriendData(dy,WebValue.dataStModel.friendSkillList[i]);
                    
                    FriendLocalService.updateFriendData(data);
                    FriendLocalService.friendList.push(data);
                    FriendLocalService.recruitDemand(data);//设置招募条件 by cai_haotian 2016.3.28.
//                    WebValue.dataDyModel.friendModelList.push(FriendLocalService.friendList[i].sceneId);//更新网络层数据.
                }
            }
            return FriendLocalService.friendList;
        }
        
        /**
         * @购买或升级后更新挚友信息.
         */
        private static updateFriendData(_data: FriendData) {//,_isUpgrade: boolean = false by zhu_jun,2016.02.19.
            _data.layerPercent = 0;
//            _data.recruitCost = Model.MainLocalService.toTenConversion(_data.st.recruitCost,_data.st.recruitCostMagnitude); by zhu_jun,2016.02.20.
//            PlayerLocalService.changeGold(_data.st.recruitCost,_data.st.recruitCostMagnitude);
//            PlayerLocalService.changeGold();//TODO: by zhu_jun,2016.02.23.上面几句应该都没用了,如果没问题过段时间可以删掉.
//            console.log("zhujun: _data.st.upgrade base damage " + _data.st.baseDamage);
            _data.dpsBase = MainLocalService.toTenConversion(_data.st.baseDamage,_data.st.baseDamageMagnitude);
            if(_data.dy) {
                FriendLocalService.layerMatch(_data);//设置挚友层级对自身的加成，注意:必须要先算层级加成.
                
//                console.log("zhujun: _data.st.upgrade base cost " + _data.st.upgradeBaseCost);
                _data.upgradeBaseCost = MainLocalService.toTenConversion(_data.st.upgradeBaseCost,_data.st.baseCostMagnitude);
                _data.upgradeCost = FriendLocalService.friendUpgradeCost(_data.upgradeBaseCost,_data.st.upgradeCostMultiple,_data.dy.level);//这个要在算效果之前调用.
                
                _data.tenUpgradeCost = FriendLocalService.tenFriendUpgradeCost(_data.upgradeBaseCost,_data.st.upgradeCostMultiple,_data.dy.level);//10连升耗费金币 by cai_haotian 2016.3.9
                _data.hundredUpgradeCost = FriendLocalService.hundredFriendUpgradeCost(_data.upgradeBaseCost,_data.st.upgradeCostMultiple,_data.dy.level);//10连升耗费金币 by cai_haotian 2016.3.9
                
                _data.layerCost = FriendLocalService.layerCost(_data.upgradeCost);
//                _data.layerMatchLevel = FriendLocalService.layerMatchLevel(_data.sceneId.level);
                _data.layerMatchLevel = FriendLocalService.layerMatchLevel(_data.dy);//by cai_haotian 2016.3.22.
//                if(_isUpgrade) {//升级时是先加后算。//by zhu_jun,2016.02.19.
//                    PlayerLocalService.PlayerData.sceneId.friendDamage += _data.dpsDelta;//升级加总值的时候，加的是插值.
//                    PlayerLocalService.PlayerData.FriendDamageUnit = MainLocalService.toUnitConversion(PlayerLocalService.PlayerData.sceneId.friendDamage);
//                    _data.dps = FriendLocalService.setFriendEffect(_data);//设置挚友单个挚友伤害.
//                    _data.DpsAndUnit = MainLocalService.toUnitConversion(_data.dps);
//                    _data.dpsNext = FriendLocalService.setFriendEffect(_data,true);
//                    _data.DpsNextAndUnit = MainLocalService.toUnitConversion(_data.dpsNext);
//                    _data.dpsDelta = _data.dpsNext - _data.dps;
//                    _data.DpsDeltaUnit = MainLocalService.toUnitConversion(_data.dpsDelta);
//                } else {//解锁是先算后加.
                    _data.dps = FriendLocalService.setFriendEffect(_data);//设置挚友单个挚友伤害.
                    _data.dpsNext = FriendLocalService.setFriendEffect(_data,true);
//                    _data.DpsNextAndUnit = MainLocalService.toUnitConversion(_data.dpsNext);by zhu_jun,2017.01.24.理论上用的时候直接get.
                    _data.dpsDelta = _data.dpsNext - _data.dps;
                    
                    var myDate = new Date();
                    var now = myDate.getTime() / 1000;
                    if(_data.dy.sealCD < now) {//挚友技能未被封印，才加到总值上。
                        PlayerLocalService.PlayerData.dy.friendDamage += _data.dps;//最后把所有的单个技能秒伤效果相加，得到挚友总秒伤
                        _data.dy.sealCD=0;//重置技能封印cd时间
                    }
                    PlayerLocalService.PlayerData.allFriendLevel += _data.dy.level;//by cai_haotian 2016.3.25.
//                }
            } else {
                _data.upgradeBaseCost = MainLocalService.toTenConversion(_data.st.upgradeBaseCost,_data.st.baseCostMagnitude);
                _data.upgradeCost = FriendLocalService.friendUpgradeCost(_data.upgradeBaseCost,_data.st.upgradeCostMultiple,1);//这个要在算效果之前调用.
//                _data.UpgradeCostAndUnit = Model.MainLocalService.toUnitConversion(_data.upgradeCost);
                _data.layerCost = FriendLocalService.layerCost(_data.upgradeCost);
//                _data.LayerCostAndUnit = Model.MainLocalService.toUnitConversion(_data.layerCost);
                _data.dps = FriendLocalService.setFriendEffect(_data);
//                _data.DpsAndUnit = MainLocalService.toUnitConversion(_data.dps);TODO:by zhu_jun,2017.01.24.理论上这边不用赋值,用的时候直接get.
                _data.dpsDelta = _data.dps;
//                _data.DpsDeltaUnit = _data.DpsAndUnit;TODO:by zhu_jun,这句话没看懂,理论上用的时候直接get.
                PlayerLocalService.PlayerData.dy.friendDamage += 0;//最后把所有的单个技能秒伤效果相加，得到挚友总秒伤
            }
        }        
        
        /**
         * @挚友技能升级效果计算公式.
         * @技能效果=base_damage*upgrade_damage_multiple ^（技能等级-1）
         * @_type: 挚友或挚友技能
         * @技能效果=skill_effect_value + skill_effect_add*（技能等级-1）
         * @单个技能秒伤效果=挚友技能升级效果*（1+N）
         * @获取挚友加成 1.挚友技能效果里的提升本技能伤害（FRIEND_SKILL_TYPE_SLEF）2.提升所有伤害（FRIEND_SKILL_TYPE_ALL）
         * @获取神器加成 1.神兵效果里的增加挚友伤害（WEAPON_TYPE_ADD_COMMON），2.增加所有武学伤害（WEAPON_TYPE_ADD_ALL_SKILL_DAMAGE）
         * @兼容_data.sceneId==null时，数据初始化.
         */
        public static setFriendEffect(_data: FriendData,isNext: boolean = false): number {
            if(_data.dy) { //st.baseDamage ,_data.st.baseDamageMagnitude,_data.st.upgradeDamageMultiple
                if(isNext) {
                    var effect: number = _data.dpsBase * Math.pow(_data.st.upgradeDamageMultiple,_data.dy.level);
                } else {
                    var effect: number = _data.dpsBase * Math.pow(_data.st.upgradeDamageMultiple,_data.dy.level - 1);
                }
//                Console.log("zhujun: effect base " + effect);
                switch(_data.Type) {
                    case FriendType.FRIEND_TYPE_FRIEND://获取神器的挚友加成.
                        effect = effect * (100 + _data.layerPercent + FriendLocalService.FriendSkillTypeAll + MagicWeaponService.AddCommon+ClanLocalService.AddTypeAll) / 100;
                        break;
                    case FriendType.FRIEND_TYPE_SKILL://获取神器的挚友技能加成.
                        effect = effect * (100 + _data.layerPercent + FriendLocalService.FriendSkillTypeAll + MagicWeaponService.AddCommon + MagicWeaponService.AddAllSkillDamage + ClanLocalService.AddTypeAll) / 100;
                        break;
                    default://这边是加所有加成.
                        alert("挚友类型错误,请联系客服 ! ");
                        break;
                }
            } else {
                var effect: number = _data.dpsBase * Math.pow(_data.st.upgradeDamageMultiple,0);
//                Console.log("zhujun: var effect: number = _data.st.baseDamage * Math.pow(_data.st.upgradeDamageconsolee,0); " + effect);
                switch(_data.Type) {
                    case FriendType.FRIEND_TYPE_FRIEND://获取神器的挚友加成,不会有自身层级加成。
                        effect = effect * (100 + FriendLocalService.FriendSkillTypeAll + MagicWeaponService.AddCommon + ClanLocalService.AddTypeAll) / 100;
                        break;
                    case FriendType.FRIEND_TYPE_SKILL://获取神器的挚友技能加成,不会有自身层级加成。
                        effect = effect * (100 + FriendLocalService.FriendSkillTypeAll + MagicWeaponService.AddCommon + MagicWeaponService.AddAllSkillDamage + ClanLocalService.AddTypeAll) / 100;
                        break;
                    default://这边是加所有加成.
                        alert("挚友类型错误,请联系客服 ! ");
                        break;
                }
            }
//            Console.log("zhujun: effect extra " + effect);
            return effect;
        }
        	
        /**
         * @挚友技能升级消耗铜币公式.
         * @升级消耗铜币=upgrade_base_cost * upgrade_cost_multiple^(当前技能等级-1). 
         */
        public static friendUpgradeCost(_upgradeBaseCost: number,_upgradeCostMultiple: number,_level: number): number {
//            console.log("zhujun: _upgradeBaseCost " + _upgradeBaseCost);
            var value:number=0;
            //TODO: by zhu_jun,本来是要做十连升，和百连升.
//            for(var i = 1;i<_level;i++){
//                
//            }
            
            var value: number = _upgradeBaseCost * Math.pow(_upgradeCostMultiple,_level - 1);
            return value;
        }
        
        /**
         * @十连升挚友技能升级消耗铜币
         * @升级消耗铜币=upgrade_base_cost * upgrade_cost_multiple^(当前技能等级-1). 
         */ 
        public static tenFriendUpgradeCost(_upgradeBaseCost: number,_upgradeCostMultiple: number,_level: number):number{
            var value: number = 0;
            for(var i = 0;i < 10;i++) {
                value += _upgradeBaseCost * Math.pow(_upgradeCostMultiple,_level+i - 1);
            }
            return value;
        }
        
        /**
         * @百连升挚友技能升级消耗铜币
         * @升级消耗铜币=upgrade_base_cost * upgrade_cost_multiple^(当前技能等级-1). 
         */
        public static hundredFriendUpgradeCost(_upgradeBaseCost: number,_upgradeCostMultiple: number,_level: number): number {
            var value: number = 0;
            for(var i = 0;i < 100;i++) {
                value += _upgradeBaseCost * Math.pow(_upgradeCostMultiple,_level+ i - 1);
            }
            return value;
        }
        
        /**
         * @设置招募条件
         * @by cai_haotian 2016.3.28.
         */ 
        public static recruitDemand(_data:FriendData){
            _data.recruitDemand = Number(_data.upgradeBaseCost) * Math.pow(Number(_data.st.upgradeCostMultiple),1);
        }
        
        
        /**
         * @设置是否显示item
         * @by cai_haotian 2016.3.28.
         */ 
        public static isShow(_data: FriendData,_friendDataList: Model.FriendData[]){
            if(Model.PlayerLocalService.PlayerData.dy.silver >= _data.recruitDemand) {
                _data.reachRecruit=true;
            }else{
                var flag:boolean = Enumerable.From(_friendDataList).Select(x=>x.reachRecruit==true).FirstOrDefault(null);
                
                if(flag){
                    var maxId: number  = Enumerable.From(_friendDataList).Where(x=> x.reachRecruit == true).Max(x=> x.st.id);
                }else{
                    var maxId:number=0;
                }
               
                if(maxId >= _data.st.id || _data.st.id - maxId == 1) {
                    _data.isShow = true;
                }
            }
        }
        
        /**
         * @层级开启消耗铜币公式：
         * @层级开启消耗铜币= upgrade_base_cost * upgrade_cost_multiple^(层级开启等级-1)*5
         */ 
        public static layerCost(_friendCost:number):number{
            var value :number = _friendCost*5;
            return value;
        }
        
        /**
         * @根据等级计算挚友当前可开启的层级.
         */ 
        public static layerMatchLevel(_data:FriendDyModel){
            var layer:number = 0; 
//            if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFirst) <= _level && _level < parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSecond)){
//                return layer= 1;
//            } else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSecond) <= _level && _level <parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelThird)){
//                return layer = 2;
//            } else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelThird) <= _level && _level < parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFourth)){
//                return layer = 3;
//            } else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFourth)<=_level && _level < parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFifth)){
//                return layer = 4;
//            }else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFifth)<= _level && _level < parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSixth)){
//                return layer = 5;
//            }else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSixth)<=_level&& _level<parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSeventh)){
//                return layer = 6;
//            }else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSeventh) <= _level){
//                return layer = 7;
//            }else{
//                return layer;
//            }
            
            if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFirst) <= _data.level && _data.layerId==0) {
                return layer = 1;
            } else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSecond) <= _data.level && _data.layerId == 1) {
                return layer = 2;
            } else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelThird) <= _data.level && _data.layerId == 2) {
                return layer = 3;
            } else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFourth) <= _data.level && _data.layerId == 3) {
                return layer = 4;
            } else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFifth) <= _data.level && _data.layerId == 4) {
                return layer = 5;
            } else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSixth) <= _data.level && _data.layerId == 5) {
                return layer = 6;
            } else if(parseInt(WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSeventh) <= _data.level) {
                return layer = 7;
            } else {
                return layer;
            }

        }
        
        /**
         * @层级匹配.
         * @设置挚友层级加成效果对自身的影响以及对全局性的影响.
         * @不要break,几层就进几个case.
         */
        private static layerMatch(_data: FriendData) {
            switch(_data.dy.layerId) {
                case 7:
                    FriendLocalService.setFriendLayerEffect(_data.SeventhLayerType,_data.st.seventhLayerValue,_data);
                case 6:
                    FriendLocalService.setFriendLayerEffect(_data.SixthLayerType,_data.st.sixthLayerValue,_data);
                case 5:
                    FriendLocalService.setFriendLayerEffect(_data.FifthLayerType,_data.st.fifthLayerValue,_data);
                case 4:
                    FriendLocalService.setFriendLayerEffect(_data.FourthLayerType,_data.st.fourthLayerValue,_data);
                case 3:
                    FriendLocalService.setFriendLayerEffect(_data.ThirdLayerType,_data.st.thirdLayerValue,_data);
                case 2:
                    FriendLocalService.setFriendLayerEffect(_data.SecondLayerType,_data.st.secondLayerValue,_data);
                case 1:
                    FriendLocalService.setFriendLayerEffect(_data.FirstLayerType,_data.st.firstLayerValue,_data);
                    break;
                case 0:
                    _data.layerPercent = 0;
                    if(Model.WebServiceBase.isDebug) {
                        console.log("zhujun: no friend layer , until break ! ");
                    }
                    break;
                default:
                    alert("技能层级数据异常,请联系客服人员 ! ");
                    break;
            }
        }
        
        /**
         * @设置好友层级加成.
         */
        public static setFriendLayerEffect(_type: SkillFloorType,_value: number,_data: FriendData) {
            if(_type == SkillFloorType.FRIEND_SKILL_TYPE_SLEF){//技能如果被封印，对自身的影响依然有效.
                _data.layerPercent += _value;
                return;
            }
            if(_data.dy.sealCD > 0){//如果技能被封印,则直接return.
                return;
            }
            switch(_type) {
                case SkillFloorType.FRIEND_SKILL_TYPE_ALL:
                    FriendLocalService.friendSkillTypeAll += _value;
                    break;
                case SkillFloorType.FRIEND_SKILL_TYPE_CRIT:
                    FriendLocalService.friendSkillTypeCrit += _value;
                    break;
                case SkillFloorType.FRIEND_SKILL_TYPE_CRIT_PROBABILITY:
                    FriendLocalService.friendSkillTypeCritProbability += _value;
                    break;
                case SkillFloorType.FRIEND_SKILL_TYPE_CLICK:
                    FriendLocalService.friendSkillTypeClick += _value;
                    break;
                case SkillFloorType.FRIEND_SKILL_TYPE_COIN:
                    FriendLocalService.friendSkillTypeCoin += _value;
                    break;
                case SkillFloorType.FRIEND_SKILL_TYPE_BOX_COIN:
                    FriendLocalService.friendSkillTypeBoxCoin += _value;
                    break;
                case SkillFloorType.FRIEND_SKILL_TYPE_BOSS:
                    FriendLocalService.friendSkillTypeBoss += _value;
                    break;
                default:
                    alert("挚友层级类型有误,请联系客服人员 ! ");
                    break;
            }
        }
        
        /**
         * @挚友或挚友技能购买成功回调用.
         */
        public static buySuccessedCallBack(_data: FriendData) {
            _data.dy = new FriendDyModel(_data.st.id,1,0);//创建挚友对象.
            if(_data.RecruitMoneyType == MoneyType.MONEY_TYPE_COIN) {
                PlayerLocalService.changeGold(-_data.RecruitCost);
            } else if(_data.RecruitMoneyType == MoneyType.MONEY_TYPE_YB) {
                PlayerLocalService.changeSycee(-_data.st.recruitCost);
            } else {
                alert("您的货币类型不正确,请及时联系客服!");
            }
            PlayerLocalService.initAllData();
        }
        
        /**
         * @挚友升级成功.
         * @by cai_haotian 2016.3.14.
         */
        public static upgradeSuccessedCallBack(_data: FriendData,_time:number) {
            switch(_time){
                case 1: _data.dy.level += 1;//等级加1. 
                    PlayerLocalService.PlayerData.AddSilver = -_data.upgradeCost;
                    break;
                case 10: _data.dy.level += 10;//等级加10. 
                    PlayerLocalService.PlayerData.AddSilver = -_data.tenUpgradeCost;
                    break;
                case 100: _data.dy.level += 100;//等级加100. 
                    PlayerLocalService.PlayerData.AddSilver = -_data.hundredUpgradeCost;
                    break;
                default:alert("挚友升级出错，请联系管理员！");
            }
            PlayerLocalService.initAllData();
        }
        
        /**
         * @层级解锁成功.
         */ 
        public static layerSuccessedCallBack(_data:FriendData){
            _data.dy.layerId += 1;
            PlayerLocalService.PlayerData.AddSilver = -_data.layerCost;
            PlayerLocalService.initAllData();
        }
        
        /**
         * @技能封印.
         * @封印在BOSS死亡时触发
         * @所有数据都在st_system_config里
         * @bossSkillFriendProbability是封印的概率
         * @bossSkillFriendTimeMin
         * @bossSkillFriendTimeMax为封印时间的下限和上限
         * @dieSceneCount开启等级.
         */ 
        public static sealFriendAndSkills(){
            if(PlayerLocalService.PlayerData.dy.sceneId < PlayerLocalService.PlayerData.st.dieSceneCount){//等级没到，直接return.
                return;
            }
            var random : number = Mathf.random(0,10000);
            if(random >= PlayerLocalService.PlayerData.st.bossSkillFriendProbability){//没有触发技能锁定事件。
                return;
            }
            var dyList:FriendData[]=Enumerable.From(FriendLocalService.FriendList).Where(x=>x.dy != null).ToArray();
            if(dyList.length){
                var myDate = new Date();
                var now = myDate.getTime() / 1000;
                var randomData: FriendData = dyList[Mathf.random(0,dyList.length)];//创建随机解锁对象,TODO:这边查出来来的可能是引用.dyList[0];//
                //这里技能封印时间设置为最终的时间 方便计算不要每秒去减 by cai_haotian 2016.4.18
                randomData.dy.sealCD = Math.round(Number(now) + Mathf.random(PlayerLocalService.PlayerData.st.bossSkillFriendTimeMin,PlayerLocalService.PlayerData.st.bossSkillFriendTimeMax));
                if(Model.WebServiceBase.isDebug) {
                    console.log("cht sealcd is" + randomData.dy.sealCD);
                }
                
                PlayerLocalService.initAllData();//该数据,UI. TODO: 在层级和挚友那边都要做是否被封印的判断.
                Main.sington.mainGameVM.switchFriend(randomData); //改主页
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
        
        /**
         * @技能解封索需要钱数
         * @by cai_haotian 2016.4.18
         */ 
        public static setResurgenceMoney(_data:FriendData,lastTime:number){
            _data.sealCDMoney = Math.round(lastTime / 1800);
        }
        
        /**
         * @解除封印
         * @by cai_haotian 2016.4.18.
         */ 
        public static removeSealCD(_data:FriendData){
            Model.PlayerLocalService.PlayerData.AddGold-=_data.sealCDMoney;//by zhu_jun,2017.03.22.
            _data.dy.sealCD=0;
            PlayerLocalService.initAllData();//TODO: 在层级和只有那边都要做是否被封印的判断.
            Main.sington.mainGameVM.switchFriend(_data); //改主页
//                Main.singleton.mainGameVM. 改主页
        }
        
    }
}
