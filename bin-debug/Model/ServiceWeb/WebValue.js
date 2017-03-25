var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model;
(function (Model) {
    /**
     * @菜单区域类型.
     * @
     */
    var MenuAreaType;
    (function (MenuAreaType) {
        MenuAreaType[MenuAreaType["TopLeft"] = 0] = "TopLeft";
        MenuAreaType[MenuAreaType["TopRight"] = 1] = "TopRight";
        // BottomParent,
        MenuAreaType[MenuAreaType["GeneralMain"] = 2] = "GeneralMain";
        MenuAreaType[MenuAreaType["GeneralSecond"] = 3] = "GeneralSecond";
        MenuAreaType[MenuAreaType["GeneralSkill"] = 4] = "GeneralSkill";
        MenuAreaType[MenuAreaType["MagicWeapon"] = 5] = "MagicWeapon";
        MenuAreaType[MenuAreaType["Mall"] = 6] = "Mall";
    })(MenuAreaType = Model.MenuAreaType || (Model.MenuAreaType = {}));
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
    var PlayerSkillType;
    (function (PlayerSkillType) {
        PlayerSkillType[PlayerSkillType["SKILL_EFFECT_CLICK_MULTIPLE"] = 0] = "SKILL_EFFECT_CLICK_MULTIPLE";
        PlayerSkillType[PlayerSkillType["SKILL_EFFECT_SHADOW_ATTACK"] = 1] = "SKILL_EFFECT_SHADOW_ATTACK";
        PlayerSkillType[PlayerSkillType["SKILL_EFFECT_CRIT_PROBABILITY"] = 2] = "SKILL_EFFECT_CRIT_PROBABILITY";
        PlayerSkillType[PlayerSkillType["SKILL_EFFECTL_FRIEND_ACCELERATE"] = 3] = "SKILL_EFFECTL_FRIEND_ACCELERATE";
        PlayerSkillType[PlayerSkillType["SKILL_EFFECT_CLICK_INCREASE"] = 4] = "SKILL_EFFECT_CLICK_INCREASE";
        PlayerSkillType[PlayerSkillType["SKILL_EFFECT_CLICK_COIN"] = 5] = "SKILL_EFFECT_CLICK_COIN";
    })(PlayerSkillType = Model.PlayerSkillType || (Model.PlayerSkillType = {}));
    /**
     * @挚友类型.
     * @挚友	      FRIEND_TYPE_FRIEND
     * @挚友技能	FRIEND_TYPE_SKILL
     */
    var FriendType;
    (function (FriendType) {
        FriendType[FriendType["FRIEND_TYPE_FRIEND"] = 0] = "FRIEND_TYPE_FRIEND";
        FriendType[FriendType["FRIEND_TYPE_SKILL"] = 1] = "FRIEND_TYPE_SKILL";
    })(FriendType = Model.FriendType || (Model.FriendType = {}));
    /**
     * @货币类型.
     * by zhu_jun,2016.01.17.
     * @铜币	MONEY_TYPE_COIN
     * @元宝	MONEY_TYPE_YB
     * @灵石	MONEY_TYPE_JEWEL
     */
    var MoneyType;
    (function (MoneyType) {
        MoneyType[MoneyType["MONEY_TYPE_COIN"] = 0] = "MONEY_TYPE_COIN";
        MoneyType[MoneyType["MONEY_TYPE_YB"] = 1] = "MONEY_TYPE_YB";
        MoneyType[MoneyType["MONEY_TYPE_JEWEL"] = 2] = "MONEY_TYPE_JEWEL";
    })(MoneyType = Model.MoneyType || (Model.MoneyType = {}));
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
    var SkillFloorType;
    (function (SkillFloorType) {
        SkillFloorType[SkillFloorType["FRIEND_SKILL_TYPE_SLEF"] = 0] = "FRIEND_SKILL_TYPE_SLEF";
        SkillFloorType[SkillFloorType["FRIEND_SKILL_TYPE_ALL"] = 1] = "FRIEND_SKILL_TYPE_ALL";
        SkillFloorType[SkillFloorType["FRIEND_SKILL_TYPE_CRIT"] = 2] = "FRIEND_SKILL_TYPE_CRIT";
        SkillFloorType[SkillFloorType["FRIEND_SKILL_TYPE_CRIT_PROBABILITY"] = 3] = "FRIEND_SKILL_TYPE_CRIT_PROBABILITY";
        SkillFloorType[SkillFloorType["FRIEND_SKILL_TYPE_CLICK"] = 4] = "FRIEND_SKILL_TYPE_CLICK";
        SkillFloorType[SkillFloorType["FRIEND_SKILL_TYPE_COIN"] = 5] = "FRIEND_SKILL_TYPE_COIN";
        SkillFloorType[SkillFloorType["FRIEND_SKILL_TYPE_BOX_COIN"] = 6] = "FRIEND_SKILL_TYPE_BOX_COIN";
        SkillFloorType[SkillFloorType["FRIEND_SKILL_TYPE_BOSS"] = 7] = "FRIEND_SKILL_TYPE_BOSS";
    })(SkillFloorType = Model.SkillFloorType || (Model.SkillFloorType = {}));
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
    var MagicWeaponEffectType;
    (function (MagicWeaponEffectType) {
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_COMMON"] = 0] = "WEAPON_TYPE_ADD_COMMON";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_CUT_ENEMY_COUNT"] = 1] = "WEAPON_TYPE_CUT_ENEMY_COUNT";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_OFFLINE_COIN"] = 2] = "WEAPON_TYPE_ADD_OFFLINE_COIN";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_CUT_SKILL_SEAL_TIME"] = 3] = "WEAPON_TYPE_CUT_SKILL_SEAL_TIME";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_CUT_ID1_SKILL_CD"] = 4] = "WEAPON_TYPE_CUT_ID1_SKILL_CD";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_COIN"] = 5] = "WEAPON_TYPE_ADD_COIN";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_CUT_BOSS_HP"] = 6] = "WEAPON_TYPE_CUT_BOSS_HP";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_ID3_SKILL_TIME"] = 7] = "WEAPON_TYPE_ADD_ID3_SKILL_TIME";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_CRIT_DAMAGE"] = 8] = "WEAPON_TYPE_ADD_CRIT_DAMAGE";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_ID1_SKILL_DAMAGE"] = 9] = "WEAPON_TYPE_ADD_ID1_SKILL_DAMAGE";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_ID2_SKILL_TIME"] = 10] = "WEAPON_TYPE_ADD_ID2_SKILL_TIME";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_CUT_ID4_SKILL_CD"] = 11] = "WEAPON_TYPE_CUT_ID4_SKILL_CD";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_CUT_ID3_SKILL_CD"] = 12] = "WEAPON_TYPE_CUT_ID3_SKILL_CD";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_ALL_SKILL_DAMAGE"] = 13] = "WEAPON_TYPE_ADD_ALL_SKILL_DAMAGE";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_ID5_SKILL_TIME"] = 14] = "WEAPON_TYPE_ADD_ID5_SKILL_TIME";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_BOX_COIN"] = 15] = "WEAPON_TYPE_ADD_BOX_COIN";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_CLICK_DAMAGE"] = 16] = "WEAPON_TYPE_ADD_CLICK_DAMAGE";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_CRIT_CHANCE"] = 17] = "WEAPON_TYPE_ADD_CRIT_CHANCE";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_CUT_ID2_SKILL_CD"] = 18] = "WEAPON_TYPE_CUT_ID2_SKILL_CD";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_CUT_SKILL_USELESS_CHANCE"] = 19] = "WEAPON_TYPE_CUT_SKILL_USELESS_CHANCE";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_CUT_UPLEVEL_MONEY"] = 20] = "WEAPON_TYPE_CUT_UPLEVEL_MONEY";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_CHEST_CHANCE"] = 21] = "WEAPON_TYPE_ADD_CHEST_CHANCE";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_CUT_ID5_SKILL_CD"] = 22] = "WEAPON_TYPE_CUT_ID5_SKILL_CD";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_CUT_ID6_SKILL_CD"] = 23] = "WEAPON_TYPE_CUT_ID6_SKILL_CD";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_ID4_SKILL_TIME"] = 24] = "WEAPON_TYPE_ADD_ID4_SKILL_TIME";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_BOSS_TIME"] = 25] = "WEAPON_TYPE_ADD_BOSS_TIME";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_BOSS_COIN"] = 26] = "WEAPON_TYPE_ADD_BOSS_COIN";
        MagicWeaponEffectType[MagicWeaponEffectType["WEAPON_TYPE_ADD_MUCH_COIN_CHANCE"] = 27] = "WEAPON_TYPE_ADD_MUCH_COIN_CHANCE";
    })(MagicWeaponEffectType = Model.MagicWeaponEffectType || (Model.MagicWeaponEffectType = {}));
    /**
     * @家族效果类型.
     * @所有伤害提升	CLAN_TYPE_ALL
     * @点击伤害提升	CLAN_TYPE_CLICK
     * @暴击伤害提升	CLAN_TYPE_CRIT
     * @技能CD减少	CLAN_TYPE_CUT_SKILL_CD
     */
    var FamliyType;
    (function (FamliyType) {
        FamliyType[FamliyType["CLAN_TYPE_ALL"] = 0] = "CLAN_TYPE_ALL";
        FamliyType[FamliyType["CLAN_TYPE_CLICK"] = 1] = "CLAN_TYPE_CLICK";
        FamliyType[FamliyType["CLAN_TYPE_CRIT"] = 2] = "CLAN_TYPE_CRIT";
        FamliyType[FamliyType["CLAN_TYPE_CUT_SKILL_CD"] = 3] = "CLAN_TYPE_CUT_SKILL_CD";
    })(FamliyType = Model.FamliyType || (Model.FamliyType = {}));
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
    var AchievementType;
    (function (AchievementType) {
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_KILL_ENEMY"] = 0] = "ACHIEVEMENT_TYPE_KILL_ENEMY";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_GET_COIN"] = 1] = "ACHIEVEMENT_TYPE_GET_COIN";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_ARRIVE_SCENE"] = 2] = "ACHIEVEMENT_TYPE_ARRIVE_SCENE";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_GET_JEWEL"] = 3] = "ACHIEVEMENT_TYPE_GET_JEWEL";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_GET_MAGIC_WEAPON"] = 4] = "ACHIEVEMENT_TYPE_GET_MAGIC_WEAPON";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_FRIEND_DAMAGE"] = 5] = "ACHIEVEMENT_TYPE_FRIEND_DAMAGE";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_GET_FRIEND"] = 6] = "ACHIEVEMENT_TYPE_GET_FRIEND";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_GET_GIFT"] = 7] = "ACHIEVEMENT_TYPE_GET_GIFT";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_GET_BOX"] = 8] = "ACHIEVEMENT_TYPE_GET_BOX";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_KILL_BOSS"] = 9] = "ACHIEVEMENT_TYPE_KILL_BOSS";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_USE_SKILL1"] = 10] = "ACHIEVEMENT_TYPE_USE_SKILL1";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_USE_SKILL2"] = 11] = "ACHIEVEMENT_TYPE_USE_SKILL2";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_USE_SKILL3"] = 12] = "ACHIEVEMENT_TYPE_USE_SKILL3";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_USE_SKILL4"] = 13] = "ACHIEVEMENT_TYPE_USE_SKILL4";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_USE_SKILL5"] = 14] = "ACHIEVEMENT_TYPE_USE_SKILL5";
        AchievementType[AchievementType["ACHIEVEMENT_TYPE_USE_SKILL6"] = 15] = "ACHIEVEMENT_TYPE_USE_SKILL6";
    })(AchievementType = Model.AchievementType || (Model.AchievementType = {}));
    /**
     * @普通怪物	MONSTER_TYPE_PERSON
     * @聚宝盆	MONSTER_TYPE_BOX
     * @BOSS	      MONSTER_TYPE_BOSS
     */
    var MonsterType;
    (function (MonsterType) {
        MonsterType[MonsterType["MONSTER_TYPE_PERSON"] = 0] = "MONSTER_TYPE_PERSON";
        MonsterType[MonsterType["MONSTER_TYPE_BOX"] = 1] = "MONSTER_TYPE_BOX";
        MonsterType[MonsterType["MONSTER_TYPE_BOSS"] = 2] = "MONSTER_TYPE_BOSS";
    })(MonsterType = Model.MonsterType || (Model.MonsterType = {}));
    /**
     * @购买类型
     * @by cai_haotian 2016.2.26
     * @增加钱 SHOP_TYPE_COIN
     * @购买的技能 SHOP_TYPE_SKILL
     * @商城购买元宝 SHOP_TYPE_YB
     */
    var ShopType;
    (function (ShopType) {
        ShopType[ShopType["SHOP_TYPE_COIN"] = 0] = "SHOP_TYPE_COIN";
        ShopType[ShopType["SHOP_TYPE_SKILL"] = 1] = "SHOP_TYPE_SKILL";
        ShopType[ShopType["SHOP_TYPE_YB"] = 2] = "SHOP_TYPE_YB";
    })(ShopType = Model.ShopType || (Model.ShopType = {}));
    /**
     * @每日充值奖励类型
     * @by cai_haotian 2016.3.23
     * @奖励类型为元宝 MONEY_TYPE_YB
     * @奖励类型为灵石 MONEY_TYPE_JEWEL
     */
    var RewardType;
    (function (RewardType) {
        RewardType[RewardType["MONEY_TYPE_YB"] = 0] = "MONEY_TYPE_YB";
        RewardType[RewardType["MONEY_TYPE_JEWEL"] = 1] = "MONEY_TYPE_JEWEL";
        RewardType[RewardType["REWARD_TYPE_USE_SKILL_DSTQ"] = 2] = "REWARD_TYPE_USE_SKILL_DSTQ";
        RewardType[RewardType["REWARD_TYPE_CUT_BAGDROP_TIME"] = 3] = "REWARD_TYPE_CUT_BAGDROP_TIME";
    })(RewardType = Model.RewardType || (Model.RewardType = {}));
    /**
     * @每日挑战奖励类型
     * @by cai_haotian 2016.4.18.
     * @奖励类型为元宝 MONEY_TYPE_YB
     * @奖励类型为灵石 MONEY_TYPE_JEWEL
     * @奖励类型为免费试用丹书铁卷 REWARD_TYPE_USE_SKILL_DSTQ
     * @小飞箱出现概率 REWARD_TYPE_CUT_BAGDROP_TIME
     */
    var DailyChallengeType;
    (function (DailyChallengeType) {
        DailyChallengeType[DailyChallengeType["MONEY_TYPE_YB"] = 0] = "MONEY_TYPE_YB";
        DailyChallengeType[DailyChallengeType["MONEY_TYPE_JEWEL"] = 1] = "MONEY_TYPE_JEWEL";
        DailyChallengeType[DailyChallengeType["REWARD_TYPE_CUT_BAGDROP_TIME"] = 2] = "REWARD_TYPE_CUT_BAGDROP_TIME";
        DailyChallengeType[DailyChallengeType["REWARD_TYPE_USE_SKILL_DSTQ"] = 3] = "REWARD_TYPE_USE_SKILL_DSTQ";
    })(DailyChallengeType = Model.DailyChallengeType || (Model.DailyChallengeType = {}));
    /**
     * @author: zhu_jun
     * @date: 2016.01.05.
     */
    var WebValue = (function () {
        function WebValue() {
        }
        return WebValue;
    }());
    /**
     * @9G特殊要求
     */
    WebValue.is9G = false;
    /**
     * @是否是繁体版
     */
    WebValue.isTraditional = false;
    /**
     * @是否发送网络请求.
     */
    WebValue.isWebService = false;
    /**
     * @玩家token.
     */
    WebValue.webServiceHeader = "H008";
    /**
     * @版本号.
     */
    WebValue.appVer = "v1.0.0";
    /**
     * @app名字.
     */
    WebValue.appName = "云中歌点击版";
    /**
     * @账号信息.
     */
    WebValue.accountM = new Model.AccountModel();
    /**
     * @动态数据对象.
     */
    WebValue.dataDyModel = new Model.DataDyModel();
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
    WebValue.dataStModel = new Model.DataStModel();
    /**
     * @按钮.
     */
    WebValue.menuAreaStatus = {
        areaId: MenuAreaType.GeneralSkill,
        btnId: 1
    };
    /**********************菜单事件系统配置***************************/
    /**
     * @菜单事件配置,每个按钮四个方向的事件.
     */
    WebValue.menuEventConfig = {
        bossBtn: {
            middleEvent: "onBoss",
            topBtn: null,
            // topEvent: null,
            bottomBtn: null,
            // bottomEvent: null,
            leftBtn: null,
            // leftEvent: null,
            rightBtn: "btnSetting",
        },
        btnSetting: {
            // middleBtn:"btnSetting",
            middleEvent: "onSetting",
            topBtn: null,
            // topEvent: null,
            bottomBtn: "btnAchievement",
            // bottomEvent: "onAchievement",
            leftBtn: "bossBtn",
            // leftEvent: "onBoss",
            rightBtn: null,
        },
        btnAchievement: {
            middleEvent: "onAchievement",
            topBtn: "btnSetting",
            // topEvent: "onSetting",
            bottomBtn: null,
            // bottomEvent: null,
            leftBtn: "bossBtn",
            // leftEvent: "onBoss",
            rightBtn: null,
        }
    };
    /**
     * @当前光标在哪个按钮上面,要写在声明后面.
     */
    WebValue.currentBtn = { middleEvent: "", topBtn: "", bottomBtn: "", leftBtn: "", rightBtn: "" };
    /**
     * @事件列表.
     */
    WebValue.eventList = new Model.HashMap();
    /**
     * @按钮控件map.
     */
    WebValue.btnList = new Model.HashMap();
    Model.WebValue = WebValue;
    __reflect(WebValue.prototype, "Model.WebValue");
})(Model || (Model = {}));
//# sourceMappingURL=WebValue.js.map