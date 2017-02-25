module Model { 
    /**
     *
     * @author by cai_haotian 
     * @date 2015.12.24.
     *
     */
    export class SystemConfigStModel {

        public constructor() {
        }
        /**
         * @主角头像.
         */
        public leadHead: string;
        /**
         * @技能开启第一重等级.
         */
        public openFriendSkillLevelFirst: string;
        /**
         * @技能开启第二重等级.
         */
        public openFriendSkillLevelSecond: string;
        /**
         * @技能开启第三重等级.
         */
        public openFriendSkillLevelThird: string;
        /**
         * @技能开启第四重等级.
         */
        public openFriendSkillLevelFourth: string;
        /**
         * @技能开启第五重等级.
         */
        public openFriendSkillLevelFifth: string;
        /**
         * @技能开启第六重等级.
         */
        public openFriendSkillLevelSixth: string;
        /**
         * @技能开启第七重等级.
         */
        public openFriendSkillLevelSeventh: string;
        /**
         * @技能第一重图标.
         */
        public friendSkillIconFirst: string;
        /**
         * @技能第二重图标.
         */
        public friendSkillIconSecond: string;
        /**
         * @技能第三重图标.
         */
        public friendSkillIconThird: string;
        /**
        * @技能第四重图标.
         */ 
        public friendSkillIconFourth: string;
        /**
        * @技能第五重图标.
         */ 
        public friendSkillIconFifth: string;
        /**
        * @技能第六重图标.
         */ 
        public friendSkillIconSixth: string;
        /**
        * @技能第七重图标.
         */ 
        public friendSkillIconSeventh: string;
        /**
        * @神兵主图标.
         */ 
        public magicWeaponIcon: string;
        /**
        * @关卡敌人数量.
         */ 
        public sceneMonsterNumber: string;
        /**
        * @点击伤害系数.
         */ 
        public clickHurtRatio: string;
        /**
        * @怪物伤害系数.
         */ 
        public monsterHpRatio: string;
        /**
          @主角升级消耗系数.
         */ 
        public leadCostRatio: string;
        /**
         * @Bss默认倒计时(秒).
         */ 
        public timeBOSS: string;
        /**
         * @主角特效.
         */ 
        public playerEffect:string;
        /**
         * @主角骨架名称.
         */
        public playerDragonBones:string;
        /**
         * @攻击音效.
         */
        public playerAttackAudio: string;
        /**
         * @BOSS封印挚友技能概率(万分之)
         */ 
        public bossSkillFriendProbability: number; //1000
        /**
         * @BOSS封印挚友技能持续时间下限(秒)
         */
        public bossSkillFriendTimeMin: number;//600
        /**
         * @BOSS封印挚友技能持续时间上限(秒)
         */
        public bossSkillFriendTimeMax: number;//172800
        /**
         * @BOSS掉落灵石概率(万分之)
         */ 
        public bossDropJewelProbability:number;
        /**
         * @BOSS掉落灵石数量
         */ 
        public bossDropJewelCount:number;
        /**
         * @小飞箱出现时间间隔(秒)
         */ 
        public bagAppearTimeInterval:number;
        /**
         * @基础暴击伤害倍数.
         */ 
        public baseCritDamageMultiple:number;
        /**
         * @基础暴击率.
         */ 
        public baseCritProbability:number;
        /**
         * @动画出手下限时间(秒)
         */ 
        public effectTimeMax:number;
        /**
         * @动画出手下限时间(秒)
         */
        public effectTimeMin: number;
        /**
         * @加速倍数(倍数)
         */ 
        public effectAccelerateMultiple:number;
        /**
         * @主角描述
         */ 
        public playerDescription:string;
        /**
         * @101关开始随机地图.
         */ 
        public startScene:number;
        /**
         * @80关开始随机出现挚友封印.
         */ 
        public dieSceneCount:number;
        /**
         * @每日充值活动开关
         */ 
        public everydayRechargeSwitch:number;
        /**
         * @累计充值活动开关
         */ 
        public cumulativeRechargeSwitch:number;
        /**
         * @每日充值活动积累金额(大陆)
         */ 
        public everydayRechargeAmountChina:number;
        /**
         * @每日挑战登录描述
         */ 
        public everydayChallenge:string;
        /**
         * @每日挑战倒计时(秒)
         */ 
        public everydayCD:number;
    }
}