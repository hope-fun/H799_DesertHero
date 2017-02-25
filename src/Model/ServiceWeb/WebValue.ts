module Model {
    /**
     * @主角技能枚举.
     * @by zhu_jun,2016.01.17.
     * @破风剑诀	SKILL_EFFECT_CLICK_MULTIPLE
     * @寒冰心法	SKILL_EFFECT_SHADOW_ATTACK
     * @破空霸拳	SKILL_EFFECT_CRIT_PROBABILITY
     * @寂灭雷决	SKILL_EFFECTL_FRIEND_ACCELERATE
     * @凝神屏息	SKILL_EFFECT_CLICK_INCREASE
     * @招财进宝	SKILL_EFFECT_CLICK_COIN
     */
    export enum PlayerSkillType {
        SKILL_EFFECT_CLICK_MULTIPLE,
        SKILL_EFFECT_SHADOW_ATTACK,
        SKILL_EFFECT_CRIT_PROBABILITY,
        SKILL_EFFECTL_FRIEND_ACCELERATE,
        SKILL_EFFECT_CLICK_INCREASE,
        SKILL_EFFECT_CLICK_COIN
    }

    /**
     * @挚友类型.
     * @挚友	      FRIEND_TYPE_FRIEND
     * @挚友技能	FRIEND_TYPE_SKILL
     */
    export enum FriendType {
        FRIEND_TYPE_FRIEND,
        FRIEND_TYPE_SKILL
    }
    
    /**
     * @货币类型.
     * by zhu_jun,2016.01.17.
     * @铜币	MONEY_TYPE_COIN
     * @元宝	MONEY_TYPE_YB
     * @灵石	MONEY_TYPE_JEWEL
     */
    export enum MoneyType {
        MONEY_TYPE_COIN,
        MONEY_TYPE_YB,
        MONEY_TYPE_JEWEL
    }
    
    /**
     * @挚友技能层数效果类型
     * @提升本技能伤害	FRIEND_SKILL_TYPE_SLEF
     * @提升所有伤害	FRIEND_SKILL_TYPE_ALL
     * @提升暴击伤害	FRIEND_SKILL_TYPE_CRIT
     * @提升暴击率	FRIEND_SKILL_TYPE_CRIT_PROBABILITY
     * @提升点击伤害	FRIEND_SKILL_TYPE_CLICK
     * @提升铜币掉落数量	FRIEND_SKILL_TYPE_COIN
     * @提升宝箱铜币掉落数量	FRIEND_SKILL_TYPE_BOX_COIN
     * @提升对BOSS的伤害	FRIEND_SKILL_TYPE_BOSS
     */
    export enum SkillFloorType {
        FRIEND_SKILL_TYPE_SLEF,
        FRIEND_SKILL_TYPE_ALL,
        FRIEND_SKILL_TYPE_CRIT,
        FRIEND_SKILL_TYPE_CRIT_PROBABILITY,
        FRIEND_SKILL_TYPE_CLICK,
        FRIEND_SKILL_TYPE_COIN,
        FRIEND_SKILL_TYPE_BOX_COIN,
        FRIEND_SKILL_TYPE_BOSS
    }

    /**
     * @神兵效果类型
     * @增加挚友伤害	WEAPON_TYPE_ADD_COMMON
     * @减少关卡需要击杀的敌人数量	WEAPON_TYPE_CUT_ENEMY_COUNT
     * @增加游戏离线时的金币	WEAPON_TYPE_ADD_OFFLINE_COIN
     * @减少武学解除封印时间	WEAPON_TYPE_CUT_SKILL_SEAL_TIME
     * @减少破风剑诀技能冷却时间	WEAPON_TYPE_CUT_ID1_SKILL_CD
     * @提升获得铜币数量	WEAPON_TYPE_ADD_COIN
     * @减少boss血量	WEAPON_TYPE_CUT_BOSS_HP
     * @增加破空霸拳技能的持续时间	WEAPON_TYPE_ADD_ID3_SKILL_TIME
     * @增加暴击伤害	WEAPON_TYPE_ADD_CRIT_DAMAGE
     * @增加破风剑诀技能的伤害	WEAPON_TYPE_ADD_ID1_SKILL_DAMAGE
     * @增加寒冰心法技能持续时间	WEAPON_TYPE_ADD_ID2_SKILL_TIME
     * @减少寂灭雷决技能冷却时间	WEAPON_TYPE_CUT_ID4_SKILL_CD
     * @减少破空霸拳技能冷却时间	WEAPON_TYPE_CUT_ID3_SKILL_CD
     * @增加所有武学伤害	WEAPON_TYPE_ADD_ALL_SKILL_DAMAGE
     * @增加凝神屏息技能持续时间	WEAPON_TYPE_ADD_ID5_SKILL_TIME
     * @增加宝箱敌人掉金币数量	WEAPON_TYPE_ADD_BOX_COIN
     * @增加点击伤害	WEAPON_TYPE_ADD_CLICK_DAMAGE
     * @增加暴击率	WEAPON_TYPE_ADD_CRIT_CHANCE
     * @减少寒冰心法技能冷却时间	WEAPON_TYPE_CUT_ID2_SKILL_CD
     * @减少武学禁用几率	WEAPON_TYPE_CUT_SKILL_USELESS_CHANCE
     * @减少升级费用	WEAPON_TYPE_CUT_UPLEVEL_MONEY
     * @增加宝箱敌人出现几率	WEAPON_TYPE_ADD_CHEST_CHANCE
     * @减少凝神屏息技能冷却时间	WEAPON_TYPE_CUT_ID5_SKILL_CD
     * @减少点石成金技能冷却时间	WEAPON_TYPE_CUT_ID6_SKILL_CD
     * @增加寂灭雷决技能持续时间	WEAPON_TYPE_ADD_ID4_SKILL_TIME
     * @增加的打boss时间	WEAPON_TYPE_ADD_BOSS_TIME
     * @增加的boss掉落铜币	WEAPON_TYPE_ADD_BOSS_COIN
     * @有一定概率获得10倍铜币	WEAPON_TYPE_ADD_MUCH_COIN_CHANCE
     */
    export enum MagicWeaponEffectType {
        WEAPON_TYPE_ADD_COMMON,
        WEAPON_TYPE_CUT_ENEMY_COUNT,
        WEAPON_TYPE_ADD_OFFLINE_COIN,
        WEAPON_TYPE_CUT_SKILL_SEAL_TIME,
        WEAPON_TYPE_CUT_ID1_SKILL_CD,
        WEAPON_TYPE_ADD_COIN,
        WEAPON_TYPE_CUT_BOSS_HP,
        WEAPON_TYPE_ADD_ID3_SKILL_TIME,
        WEAPON_TYPE_ADD_CRIT_DAMAGE,
        WEAPON_TYPE_ADD_ID1_SKILL_DAMAGE,
        WEAPON_TYPE_ADD_ID2_SKILL_TIME,
        WEAPON_TYPE_CUT_ID4_SKILL_CD,
        WEAPON_TYPE_CUT_ID3_SKILL_CD,
        WEAPON_TYPE_ADD_ALL_SKILL_DAMAGE,
        WEAPON_TYPE_ADD_ID5_SKILL_TIME,
        WEAPON_TYPE_ADD_BOX_COIN,
        WEAPON_TYPE_ADD_CLICK_DAMAGE,
        WEAPON_TYPE_ADD_CRIT_CHANCE,
        WEAPON_TYPE_CUT_ID2_SKILL_CD,
        WEAPON_TYPE_CUT_SKILL_USELESS_CHANCE,
        WEAPON_TYPE_CUT_UPLEVEL_MONEY,
        WEAPON_TYPE_ADD_CHEST_CHANCE,
        WEAPON_TYPE_CUT_ID5_SKILL_CD,
        WEAPON_TYPE_CUT_ID6_SKILL_CD,
        WEAPON_TYPE_ADD_ID4_SKILL_TIME,
        WEAPON_TYPE_ADD_BOSS_TIME,
        WEAPON_TYPE_ADD_BOSS_COIN,
        WEAPON_TYPE_ADD_MUCH_COIN_CHANCE
    }
    
    /**
     * @家族效果类型.
     * @所有伤害提升	CLAN_TYPE_ALL
     * @点击伤害提升	CLAN_TYPE_CLICK
     * @暴击伤害提升	CLAN_TYPE_CRIT
     * @技能CD减少	CLAN_TYPE_CUT_SKILL_CD
     */
    export enum FamliyType {
        CLAN_TYPE_ALL,
        CLAN_TYPE_CLICK,
        CLAN_TYPE_CRIT,
        CLAN_TYPE_CUT_SKILL_CD
    }
    
    /**
     * @成就类型.
     * @击杀敌人	   ACHIEVEMENT_TYPE_KILL_ENEMY
	 * @获得铜币	   ACHIEVEMENT_TYPE_GET_COIN
	 * @到达关卡	   ACHIEVEMENT_TYPE_ARRIVE_SCENE
	 * @获得灵石	   ACHIEVEMENT_TYPE_GET_JEWEL
	 * @获得神器	   ACHIEVEMENT_TYPE_GET_MAGIC_WEAPON
	 * @挚友秒伤	   ACHIEVEMENT_TYPE_FRIEND_DAMAGE
	 * @获得挚友	   ACHIEVEMENT_TYPE_GET_FRIEND
	 * @获得仙女礼物  ACHIEVEMENT_TYPE_GET_GIFT
	 * @击杀聚宝盆数量 ACHIEVEMENT_TYPE_GET_BOX
	 * @击杀BOSS数量  ACHIEVEMENT_TYPE_KILL_BOSS
	 * @使用技能1     ACHIEVEMENT_TYPE_USE_SKILL1
	 * @使用技能2     ACHIEVEMENT_TYPE_USE_SKILL2
	 * @使用技能3     ACHIEVEMENT_TYPE_USE_SKILL3
	 * @使用技能4     ACHIEVEMENT_TYPE_USE_SKILL4
	 * @使用技能5     ACHIEVEMENT_TYPE_USE_SKILL5
	 * @使用技能6     ACHIEVEMENT_TYPE_USE_SKILL6
     */
    export enum AchievementType {
        ACHIEVEMENT_TYPE_KILL_ENEMY,
        ACHIEVEMENT_TYPE_GET_COIN,
        ACHIEVEMENT_TYPE_ARRIVE_SCENE,
        ACHIEVEMENT_TYPE_GET_JEWEL,
        ACHIEVEMENT_TYPE_GET_MAGIC_WEAPON,
        ACHIEVEMENT_TYPE_FRIEND_DAMAGE,
        ACHIEVEMENT_TYPE_GET_FRIEND,
        ACHIEVEMENT_TYPE_GET_GIFT,
        ACHIEVEMENT_TYPE_GET_BOX,
        ACHIEVEMENT_TYPE_KILL_BOSS,
        ACHIEVEMENT_TYPE_USE_SKILL1,
        ACHIEVEMENT_TYPE_USE_SKILL2,
        ACHIEVEMENT_TYPE_USE_SKILL3,
        ACHIEVEMENT_TYPE_USE_SKILL4,
        ACHIEVEMENT_TYPE_USE_SKILL5,
        ACHIEVEMENT_TYPE_USE_SKILL6
    }
    
    /**
     * @普通怪物	MONSTER_TYPE_PERSON
     * @聚宝盆	MONSTER_TYPE_BOX
     * @BOSS	      MONSTER_TYPE_BOSS
     */ 
    export enum MonsterType{
        MONSTER_TYPE_PERSON,
        MONSTER_TYPE_BOX,
	    MONSTER_TYPE_BOSS
    }
    
    /**
     * @购买类型 
     * @by cai_haotian 2016.2.26
     * @增加钱 SHOP_TYPE_COIN
     * @购买的技能 SHOP_TYPE_SKILL
     * @商城购买元宝 SHOP_TYPE_YB
     */ 
    export enum ShopType{
        SHOP_TYPE_COIN,
        SHOP_TYPE_SKILL,
        SHOP_TYPE_YB
    }
    
    /**
     * @每日充值奖励类型
     * @by cai_haotian 2016.3.23
     * @奖励类型为元宝 MONEY_TYPE_YB
     * @奖励类型为灵石 MONEY_TYPE_JEWEL
     */ 
    export enum RewardType{
        MONEY_TYPE_YB,
        MONEY_TYPE_JEWEL,
        REWARD_TYPE_USE_SKILL_DSTQ,
        REWARD_TYPE_CUT_BAGDROP_TIME
    }
    
    /**
     * @每日挑战奖励类型
     * @by cai_haotian 2016.4.18.
     * @奖励类型为元宝 MONEY_TYPE_YB
     * @奖励类型为灵石 MONEY_TYPE_JEWEL
     * @奖励类型为免费试用丹书铁卷 REWARD_TYPE_USE_SKILL_DSTQ
     * @小飞箱出现概率 REWARD_TYPE_CUT_BAGDROP_TIME
     */ 
    export enum DailyChallengeType{
        MONEY_TYPE_YB,
        MONEY_TYPE_JEWEL,
        REWARD_TYPE_CUT_BAGDROP_TIME,
        REWARD_TYPE_USE_SKILL_DSTQ
    }
    

	/**
	 * @author: zhu_jun
	 * @date: 2016.01.05.
	 */
    export class WebValue {
        public constructor() {
        }

        /**
         * @9G特殊要求
         */ 
        public static is9G:boolean=false;
        /**
         * @是否是繁体版
         */ 
        public static isTraditional:boolean=false;
        
		/**
		 * @是否发送网络请求.
		 */
        public static isWebService: boolean = false;
		/**
         * @玩家token.
         */
        public static webServiceHeader: string = "H008";
		/**
		 * @版本号.
		 */
        public static appVer: string = "v1.0.0";
        /**
         * @app名字.
         */
        public static appName: string = "云中歌点击版";
		/**
		 * @账号信息.
		 */
        public static accountM: AccountModel = new AccountModel();        
        /**
         * @动态数据对象.
         */
        public static dataDyModel: DataDyModel = new DataDyModel();
//        /**
//         * @获取网络层提交数据.
//         */ 
//        public static get DataDyModel(){
//            WebValue.dataDyModel = new DataDyModel(PlayerLocalService.PlayerData.dy,
//            SceneLocalService.SceneData.dy,null,null,null,null,null);
//            return WebValue.dataDyModel;
//        }
        
        /**
         * @静态数据对象.
         */
        public static dataStModel: DataStModel = new DataStModel();
    }
}
