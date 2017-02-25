module Model {
	/**
	 * @author: zhu_jun 
	 * @date: 2015.12.26.
	 */
	export class DataStModel {
    	
		public constructor(){
    		
		}
		/**
		 * @系统配置表.
		 */ 
        public sysConfigModel : SystemConfigStModel;
        /**
         * @数量级单位.
         */ 
        public magnitudeList: Array<MagnitudeStModel>;
        /**
         * @玩家技能.
         */ 
        public skillList: Array<SkillStModel>;
        /**
         * @挚友、技能.
         */ 
        public friendSkillList: Array<FriendStModel>=new Array<FriendStModel>();
        /**
         * @神兵.
         */ 
        public magicWeaponList: Array<MagicWeaponStModel>;
        /**
         * @怪物.
         */ 
        public monsterList: Array<MonsterStModel>;
        /**
         * @关卡.
         */ 
        public sceneList: Array<SceneStModel>;
        /**
         * @商城
         * @by cai_haotian 2016.2.26.
         */ 
		public shopList:Array<ShopStModel>;
		/**
		 * @飞箱掉落物品 
		 */ 
        public bagdropList:Array<BagDropStModel>;
        /**
         * @成就
         * @by cai_haotian 2016.4.1
         */ 
        public achievementList:Array<AchievementStModel>
        /**
         * @家族
         * @by cai_haotian 2016.3.21.
         */ 
        public clanList:Array<ClanStModel>;
        /**
         * @每日挑战
         * @by cai_haotian 2016.4.14.
         */ 
		public challengeList:Array<ChallengeStModel>;
	}
}
