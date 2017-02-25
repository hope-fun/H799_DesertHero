module Model {
	/**
	 *
	 * @author: zhu_jun
	 * @date: 2016.03.04.
	 */
    export class DataDyModel {
        public constructor(_playerModel: PlayerDyModel = null,_sceneModel: SceneDyModel=null,_skillModelList: Array<SkillDyModel>=null,_friendModelList: Array<FriendDyModel>=null,
            _magicWeaponModelList: Array<MagicWeaponDyModel> = null,_achievementModelList: Array<AchievementDyModel> = null,_shopModelList: Array<ShopDyModel>=null,_clanModelList:Array<ClanDyModel>=null) {
        }
        
		/**
		 * @玩家相关信息
		 */
        public playerModel: PlayerDyModel;
        /**
		 * @关卡信息列表
		 */
        public sceneModel: SceneDyModel;
        /**
		 * @玩家技能信息列表
		 */
        public skillModelList: Array<SkillDyModel>;
        /**
		 * @小伙伴列表
		 */
        public friendModelList: Array<FriendDyModel>;
        /**
		 * @装备神器
		 */
        public magicWeaponModelList: Array<MagicWeaponDyModel>;
        /**
		 * @成就信息（待定）
		 */
        public achievementModelList: Array<AchievementDyModel>;
        /**
         * @商城动态数据
         */ 
        public shopModelList:Array<ShopDyModel>;
        /**
         * @家族动态数据
         */ 
        public clanModelList:Array<ClanDyModel>;
    }
}

