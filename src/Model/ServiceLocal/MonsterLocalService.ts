module Model {
	/**
	 * @author: zhu_jun
	 * @date: 2016.02.03.
	 */
    export class MonsterLocalService {
    	/**
    	 * @怪物数据.
    	 */
        private static monsterList: MonsterData[] = null;
    	/**
    	 * @怪物数据.
    	 */
        public static get MonsterList(): MonsterData[] {
            return MonsterLocalService.monsterList;
        }

        public constructor() {

        }
        
		/**
		 * @怪物初始化要在场景好了之后.
		 * @怪物数量由公式决定.
		 * @这里只提供给initAllData调用.
		 */
        public static setMonsterList(isEscape: boolean = false) {
            if(MonsterLocalService.monsterList){
                if(Model.WebServiceBase.isDebug) {
                    console.log("怪物列表已经有了,这里只管长度是否改变.");
                }
                
                var delta = MonsterLocalService.monsterList.length -SceneLocalService.SceneData.monsterCount;
//                if(delta > 0){
                    for(var i = 0; i< delta;i++){
                        MonsterLocalService.monsterList.shift();
                    }
//                }
            }else{
                MonsterLocalService.setMonsterData(isEscape);
            }
            return MonsterLocalService.monsterList;
        }
        
        /**
         * @构造下一个关卡怪物.
         */ 
        public static setMonsterData(isEscape: boolean = false){
           MonsterLocalService.monsterList = [];
           var normalStList: MonsterStModel[] = null;
           var bossStList: MonsterStModel[] = null;
           normalStList = Enumerable.From(WebValue.dataStModel.monsterList).
               Where(x=> x.monsterType == MonsterType[MonsterType.MONSTER_TYPE_BOSS]).ToArray();
           bossStList = Enumerable.From(WebValue.dataStModel.monsterList).
               Where(x=> x.monsterType == MonsterType[MonsterType.MONSTER_TYPE_BOX] || x.monsterType == MonsterType[MonsterType.MONSTER_TYPE_PERSON]).ToArray();
           var st: MonsterStModel = null;
           for(var i = 0;i < SceneLocalService.SceneData.monsterCount;i++) {//这边初始化要按照关卡怪物数量来进行.
               if(!isEscape && i == SceneLocalService.SceneData.monsterCount - 1) {//在box和普通里面随机普通怪
                   st = normalStList[Mathf.random(0,normalStList.length)];
               } else {//在boss里面随机boss。
                   st = bossStList[Mathf.random(0,bossStList.length)];
               }
               var data: MonsterData = new MonsterData(st);
               MonsterLocalService.setMonsterHp(data);
               MonsterLocalService.setMonsterDropMoney(data);
               MonsterLocalService.setBossLeftTime(data);
               MonsterLocalService.monsterList.push(data);
           }
       }
       
       /**
        * @设置刷怪模式怪物数据.
        */ 
       public static setFarmMonsterData(){
          MonsterLocalService.monsterList =  [];
          var stList :MonsterStModel[] = Enumerable.From(WebValue.dataStModel.monsterList).
               Where(x=> x.monsterType != MonsterType[MonsterType.MONSTER_TYPE_BOSS]).ToArray();
          var st:MonsterStModel = null;
          for(var i = 0;i<SceneLocalService.SceneData.monsterCount;i ++){
             st = stList[Mathf.random(0,stList.length)];
             var data: MonsterData = new MonsterData(st);
             MonsterLocalService.setMonsterHp(data);
             MonsterLocalService.setMonsterDropMoney(data);
             MonsterLocalService.setBossLeftTime(data);
             MonsterLocalService.monsterList.push(data);
          }
       }
       
		/**
		 * @非BOSS血量= ROUNDUP（monsterHpRatio^关卡序号，0）
		 * @BOSS血量= ROUNDUP（monsterHpRatio^关卡序号*5*（1- WEAPON_TYPE_CUT_BOSS_HP)，0）
		 * @monsterHpRatio在st_system_config里，WEAPON_TYPE_CUT_BOSS_HP在st_magic_weapon里
		 */
        public static setMonsterHp(_data: MonsterData) {
            _data.hp = Math.ceil(Math.pow(parseFloat(PlayerLocalService.PlayerData.st.monsterHpRatio),SceneLocalService.SceneData.sceneId));
            if(_data.MonsterType == MonsterType.MONSTER_TYPE_BOSS) {
                _data.hp = Math.ceil(_data.hp * 5 * (1 - MagicWeaponService.CutBossHp/100));
            }
            _data.hpMax = _data.hp;
        }
		
		/**
		 * @怪物区分来源于st_monster的monster_type字段
         * @ BOSS掉钱= ROUNDUP（怪物血量/4*（1+BOSS掉落加成），0）
         * @ BOSS掉落加成包括神兵效果里的
         * @ 在非Boss的基础上，增加的boss掉落铜币（WEAPON_TYPE_ADD_BOSS_COIN）
         * @BOX怪物掉钱= ROUNDUP（怪物血量*1.25*（1+宝箱铜币掉落加成），0）
         * @宝箱铜币加成包括挚友技能效果里的
         * @提升宝箱铜币掉落数量（FRIEND_SKILL_TYPE_BOX_COIN）
         * @神兵效果里的
         * @提升宝箱铜币掉落数量(WEAPON_TYPE_ADD_BOX_COIN)
         * @非BOX怪物掉钱= ROUNDUP（怪物血量/4*（1+铜币掉落加成），0）
         * @铜币掉落加成包括挚友技能效果里的
         * @提升铜币掉落数量（FRIEND_SKILL_TYPE_COIN）
         * @神兵效果里的
         * @提升获得铜币数量（WEAPON_TYPE_ADD_COIN）
		 */
        public static setMonsterDropMoney(_data: MonsterData) {
            if(_data.MonsterType == MonsterType.MONSTER_TYPE_BOSS) {
                _data.dropMoney = Math.ceil(_data.hp / 4 * (1 + FriendLocalService.FriendSkillTypeCoin / 100 + MagicWeaponService.AddCoin / 100 + MagicWeaponService.AddBossCoin / 100));
            } else if(_data.MonsterType == MonsterType.MONSTER_TYPE_BOX) {
                _data.dropMoney = Math.ceil(_data.hp * 1.25 * (1 + FriendLocalService.FriendSkillTypeBoxCoin / 100 + MagicWeaponService.AddBoxCoin / 100));
            } else {
                _data.dropMoney = Math.ceil(_data.hp / 4 * (1 + FriendLocalService.FriendSkillTypeCoin / 100 + MagicWeaponService.AddCoin / 100));
            }
        }
		
		/**
		 * @BOSS倒计时=timeBOSS*（1+ WEAPON_TYPE_ADD_BOSS_TIME）
		 * @timeBOSS来源st_system_config
		 * @WEAPON_TYPE_ADD_BOSS_TIME是神兵的加成
		 */
        public static setBossLeftTime(_data: MonsterData) {
            _data.leftTime = parseFloat(PlayerLocalService.PlayerData.st.timeBOSS) * (1 + MagicWeaponService.AddBossTime / 100);
        }
    }
}
