module Model {
	/**
	 *
	 * @author 
	 *
	 */
    export class PlayerSkillLocalService {
    	/**
    	 * @玩家技能list.
    	 */
        private static playerSkillList: PlayerSkillData[] = null;
        
        /**
		 * @获取获取玩家技能数据.
		 */
        public static get PlayerSkillList(): PlayerSkillData[] {
            return PlayerSkillLocalService.playerSkillList;
        }

        public constructor() {
        }        
        
        /**
         * @获取挚友或技能列表.
         */
        public static setPlayerSkillList(): PlayerSkillData[] {
            if(PlayerSkillLocalService.playerSkillList){
                WebValue.dataDyModel.skillModelList = [];//重置接口层数据.
                for(var i = 0;i<PlayerSkillLocalService.playerSkillList.length;i++){
                    PlayerSkillLocalService.updataPlayerSkillData(PlayerSkillLocalService.playerSkillList[i]);
                    WebValue.dataDyModel.skillModelList.push(PlayerSkillLocalService.playerSkillList[i].dy);//更新接口层数据.
                }
            }else{
                PlayerSkillLocalService.playerSkillList = [];
                for(var i = 0;i < WebValue.dataStModel.skillList.length;i++) {
                    var dy: SkillDyModel = Enumerable.From(WebValue.dataDyModel.skillModelList).Where(x=> x.skillId == WebValue.dataStModel.skillList[i].id).FirstOrDefault(null);
                    var data: PlayerSkillData = new PlayerSkillData(dy,WebValue.dataStModel.skillList[i]);
                    PlayerSkillLocalService.updataPlayerSkillData(data);
                    PlayerSkillLocalService.playerSkillList.push(data);
//                    WebValue.dataDyModel.skillModelList.push(PlayerSkillLocalService.playerSkillList[i].sceneId);//更新接口层数据.
                }
            }
            return PlayerSkillLocalService.playerSkillList;
        }
        
        /**
         * @更新玩家技能数据. 
         */ 
        private static updataPlayerSkillData(_data:PlayerSkillData){
            PlayerSkillLocalService.setSkillEffect(_data);
            PlayerSkillLocalService.setSkillCost(_data);
            
            //by cai_haotian 2016.3.9
//            if(_data.dy&&_data.dy.level>0){
//                PlayerSkillLocalService.setSkillTenCost(_data);
//                PlayerSkillLocalService.setSkillHundredCost(_data);
//            }
            
            PlayerSkillLocalService.mWskillEffect(_data);
        }

        /**
         * @设置升级效果相关属性.
         * @所有主角的技能升级效果计算公式:
         * @技能效果=skill_effect_value+skill_effect_add*（技能等级-1）
         */
        public static setSkillEffect(_data: PlayerSkillData) {
            if(_data.dy){
//                console.log("zhujun: 147 _data.effect is 111111111111111111111111111111111111111111 " + _data.effect);
                _data.effect = _data.st.skillEffectValue + _data.st.skillEffectAdd * (_data.dy.level - 1);
                _data.effectNext = _data.st.skillEffectValue + _data.st.skillEffectAdd * _data.dy.level;
                _data.effectDelta = _data.effectNext - _data.effect;
            }else{
                _data.effect = _data.st.skillEffectValue;
                _data.effectNext = _data.st.skillEffectValue + _data.st.skillEffectAdd * 1;
                _data.effectDelta = _data.effectNext - _data.effect;
            }
            return _data.effect;
        }
        
        /**
         * @设置升级花费相关属性.
         * @升级消耗铜币=upgrade_base_cost * upgrde_cost_multiple^(当前技能等级-1) * 10^(当前技能等级*3)
         */
        public static setSkillCost(_data: PlayerSkillData) {
            if(_data.dy) {
                _data.cost = _data.st.upgradeBaseCost * Math.pow(_data.st.upgradeCostMultiple,_data.dy.level - 1) * Math.pow(10,_data.dy.level * 3);
            } else {
                _data.cost = _data.st.upgradeBaseCost * Math.pow(_data.st.upgradeCostMultiple,0) * Math.pow(10,3);
            }
            return _data.cost;
        }
        
        /**
         * @设置十连升花费相关属性.
         * @升级消耗铜币=upgrade_base_cost * upgrde_cost_multiple^(当前技能等级-1) * 10^(当前技能等级*3)
         */
        public static setSkillTenCost(_data: PlayerSkillData) {
            if(_data.dy) {
                var cost: number = 0;
                for(var i=0;i<10;i++){
                    cost += _data.st.upgradeBaseCost * Math.pow(_data.st.upgradeCostMultiple,_data.dy.level + i - 1) * Math.pow(10,(_data.dy.level + i) * 3);
                }
                _data.tenUpgradeCost = cost;
                if(Model.WebServiceBase.isDebug) {
                    console.log("cai_haotian setSkillTenCost" + cost);
                }
                
                return _data.tenUpgradeCost;
            }
        }
        
//        /**
//         * @设置百连升花费相关属性.
//         * @升级消耗铜币=upgrade_base_cost * upgrde_cost_multiple^(当前技能等级-1) * 10^(当前技能等级*3)
//         */
//        public static setSkillHundredCost(_data: PlayerSkillData) {
//            if(_data.sceneId) {
//                var cost: number = 0;
//                for(var i = 0;i < 100;i++) {
//                    cost += _data.st.upgradeBaseCost * Math.pow(_data.st.upgradeCostMultiple,_data.sceneId.level + i - 1) * Math.pow(10,(_data.sceneId.level + i) * 3);
//                }
//                _data.hundredUpgradeCost = cost;
//                return _data.hundredUpgradeCost;
//            }
//        }
        
        /**
         * @根据神器的各种属性设置玩家技能 
         * @by cai_haotian 2016.3.2.
         */ 
        public static mWskillEffect(_data: PlayerSkillData){
            switch(_data.st.id){
                case 1:
                    _data.cdTime = Math.floor(_data.st.cdTime * (1 - MagicWeaponService.CutID1SkillCD / 100-ClanLocalService.CutSkillCd/100));
                    _data.effect = Math.floor(_data.effect * (1 + MagicWeaponService.AddID1SkillDamage / 100));//TODO:在现有基础上增加神器伤害加成.
                    _data.continueTime = Math.floor(_data.st.continueTime);
                break;
                case 2:
                    _data.cdTime = Math.floor(_data.st.cdTime * (1 - MagicWeaponService.CutID2SkillCD / 100 - ClanLocalService.CutSkillCd / 100));
                    _data.continueTime = Math.floor(_data.st.continueTime * (1 + MagicWeaponService.AddID2SkillTime / 100))
                break;
                case 3:
                    _data.cdTime = Math.floor(_data.st.cdTime * (1 - MagicWeaponService.CutID3SkillCD / 100 - ClanLocalService.CutSkillCd / 100));
                    _data.continueTime = Math.floor(_data.st.continueTime * (1 + MagicWeaponService.AddID3SkillTime / 100))
                break;
                case 4:
                    _data.cdTime = Math.floor(_data.st.cdTime * (1 - MagicWeaponService.CutID4SkillCD / 100 - ClanLocalService.CutSkillCd / 100));
                    _data.continueTime = Math.floor(_data.st.continueTime * (1 + MagicWeaponService.AddID4SkillTime / 100))
                break;
                case 5:
                    _data.cdTime = Math.floor(_data.st.cdTime * (1 - MagicWeaponService.CutID5SkillCD / 100 - ClanLocalService.CutSkillCd / 100));
                    _data.continueTime = Math.floor(_data.st.continueTime * (1 + MagicWeaponService.AddID5SkillTime / 100))
                break;
                case 6:
                    _data.continueTime = _data.st.continueTime;
                    _data.cdTime = Math.floor(_data.st.cdTime * (1 - MagicWeaponService.CutID6SkillCD / 100));
                break;
                default:alert("主角技能神器加成初始化错误！！！");
            }
            if(_data.cdTime <= 0) {
                _data.cdTime = 10;
            }
        }
        
        /**
         * @玩家技能解锁成功.
         */ 
        public static unlockSuccessedCallBack(_data:PlayerSkillData){
            //TODO: 这边cdTime还需要加成.waiting.....
            //by cai_haotian 这里的cdtime不应该技能解锁后就设置，而应该是在使用后才计时
            //by cai_haotian 2016.3.7.
            _data.dy = new SkillDyModel(_data.st.id,0,0);
//            PlayerSkillLocalService.setSkillEffect(_data);
//            PlayerSkillLocalService.setSkillCost(_data);
            PlayerLocalService.initAllData();
            return _data;
        }
        
        /**
         * @玩家技能升级成功.
         */ 
        public static upgradeSuccessedCallBack(_data:PlayerSkillData,_time?:number){
            switch(_time){
                case 1: PlayerLocalService.PlayerData.AddGold = -_data.cost;
                    _data.dy.level += 1;
                    break;
                case 10: PlayerLocalService.PlayerData.AddGold = -_data.tenUpgradeCost;
                    _data.dy.level += 10;
                    break;
                default: alert("技能升级出错，请联系管理员！");
            }
            PlayerLocalService.initAllData();
            Model.WebService.commitData(Model.WebValue.dataDyModel,() => {
                if(Model.WebServiceBase.isDebug) {
                    console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                }
            },() => {
                if(Model.WebValue.isTraditional) {
                    alert("數據提交失敗請聯繫管理員！！！！");
                } else {
                    alert("数据提交失败请联系管理员！！！！");
                }
            });
            return _data;            
        }
        
        /********by cai_haotian 2016.3.2 begin*********/
        /**
         * @时间描述方法
         * @by cai_haotian 2016.2.1.
         */
        public static timeDes(time: number): string {
            var min = Math.floor(time / 60) < 10 ? "0" + Math.floor(time / 60) : Math.floor(time / 60);
            var second = time % 60 < 10 ? "0" + time % 60 : time % 60;
            return min + ":" + second;
        }
        
        /**
         * @使用技能增加相应属性值
         */ 
        public static PlayerSkillEffect(_data?: PlayerSkillData,_onCallback?:Function,_flag?:boolean){
            //将静态时间赋值给动态cd时间
            var duringTime=15;
            if(_flag){
                _data.dy.cdTime = _data.cdTime;
                duringTime = _data.continueTime;
            }
            
            switch(_data.st.id){
                //第一个技能造成点击伤害X多少倍的伤害
                case 1: 
//                    var skillOncAnimate=()=>{
//                            egret.setTimeout(()=>{
//                                egret.clearTimeout(once);
//                                PlayerLocalService.PlayerData.dy.clickDamage *= _data.effect;
//                                _onCallback();
//                                PlayerLocalService.PlayerData.dy.clickDamage /= _data.effect;
//                            },this,300);
//                        }
//                    Main.singleton.mainGameVM.clickBtn.once(egret.TouchEvent.TOUCH_TAP,skillOncAnimate,this);
//                    var once=egret.setTimeout(()=>{
//                            Main.singleton.mainGameVM.clickBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,skillOncAnimate,this);
//                    },this,duringTime*1000);
                    
                    
                    PlayerLocalService.PlayerData.dy.clickDamage *= _data.effect;
                    _onCallback();
                    PlayerLocalService.PlayerData.dy.clickDamage /= _data.effect;
                    break;
                    
                    
                //创建一个分身攻击数次
                case 2:
                    var spacingInterval = Math.ceil(1000 / _data.effect);
                    var index = spacingInterval*2;
                    var timer: egret.Timer = new egret.Timer(spacingInterval,Math.floor(_data.effect * duringTime));
                    timer.addEventListener(egret.TimerEvent.TIMER,()=>{
                            _onCallback();
                        },this);
                    timer.start();
                    break;
                    
                //暴击率提升
                case 3: 
                    var add:number = PlayerLocalService.PlayerData.CritRate * (_data.effect / 100);
                    PlayerLocalService.PlayerData.critRate = Number(PlayerLocalService.PlayerData.critRate)+Number(add);
                    egret.setTimeout(() => {
                        PlayerLocalService.PlayerData.critRate = Number(PlayerLocalService.PlayerData.critRate) - Number(add);
                        _onCallback();
                    },this,duringTime*1000);
                    break;
                    
                //所有挚友攻击速度提升
                case 4:
                    var add:number=10*_data.effect/100;
                    PlayerLocalService.PlayerData.friendFrameRate=add;
                    egret.setTimeout(() => {
                        PlayerLocalService.PlayerData.friendFrameRate = 0;
                        _onCallback();
                    },this,duringTime * 1000);
                    break;
                    
                //点击伤害提升
                case 5: 
                    //增加伤害
                    var add = PlayerLocalService.PlayerData.dy.clickDamage * (_data.effect / 100);
                    PlayerLocalService.PlayerData.dy.clickDamage += add;
                    _onCallback();
                    egret.setTimeout(() => {
                        //持续时间过后减少加成伤害
                        PlayerLocalService.PlayerData.dy.clickDamage -= add;
                        _onCallback();
                    },this,duringTime*1000);
                    break;
                    
                    
                //每次点击获得15%敌人铜币
                case 6: 
                    var skillEffect=()=>{
                        var goldAdd = Math.floor(Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].dropMoney * _data.effect / 100);//获取当前怪物掉钱数量
                        var goldAddAndUnit = Model.MainLocalService.toUnitConversion(goldAdd);
                        _onCallback(goldAdd,goldAddAndUnit);
                    }
                    Main.singleton.mainGameVM.clickBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,skillEffect,this);
                    egret.setTimeout(()=>{
                        Main.singleton.mainGameVM.clickBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,skillEffect,this);
                    },this,duringTime*1000);
                    break;
                default:
                    alert("技能使用错误请联系管理员");
                    break;
                return _data;
            }
        }
        
        
        /**
         * @技能加速CD
         * @by cai_haotian 2016.3.7.
         */ 
        public static reduceCD(_data?: PlayerSkillData,_onCallBack?:Function){
            WebService.CleanSkillCD(_data.st.id,()=>{
                if(WebServiceBase.isDebug){
                    console.log("cai_haotian cleanSkillCD success!!!");
                }
                PlayerLocalService.PlayerData.dy.treasure -= _data.st.removeCdCost;
                _data.dy.cdTime = 0;
                _onCallBack();
                return _data;    
            },()=>{
                if(WebServiceBase.isDebug) {
                    console.log("cai_haotian cleanSkillCD fail!!!!!!!!");    
                }
            });
        }
        
        /********by cai_haotian 2016.3.2 end*********/
    }
}
