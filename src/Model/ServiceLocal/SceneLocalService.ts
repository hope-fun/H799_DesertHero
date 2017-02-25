module Model {
	/**
	 *
	 * @author 
	 *
	 */
	export class SceneLocalService {
		
       /**
        * @场景列表数据.
        */
        private static sceneData: SceneData = null;
        
        public static get SceneData():SceneData{
            return SceneLocalService.sceneData;
        }
    	
    	public constructor() {
    		
		}
		
		/**
		 * @场景要在主角和神器之后初始化.
		 * @这边只提供给initAllData调用.
		 */ 
        public static setSceneData(monsterIndex : number = 0): SceneData {
            if(SceneLocalService.sceneData){
                SceneLocalService.setSceneMonsterCount(SceneLocalService.sceneData);
                if(Model.WebServiceBase.isDebug) {
                    console.log("场景信息已经有了,这里只会更新当前场景总怪物数量!");
                }
                
            }else{
//                var st: SceneStModel = Enumerable.From(WebValue.dataStModel.sceneList).Where(x=> x.clanId == WebValue.dataDyModel.sceneModel.scene).FirstOrDefault(null);
                var dySceneId: number = (WebValue.dataDyModel.playerModel.sceneId % (Number(PlayerLocalService.PlayerData.st.startScene) - 1));
                if(dySceneId == 0) {//如果关卡id能被系数整除,则为系数减一关卡.
                    dySceneId = Number(PlayerLocalService.PlayerData.st.startScene) - 1;
                }
                
                var st: SceneStModel = Enumerable.From(WebValue.dataStModel.sceneList).Where(x=> x.id == dySceneId).FirstOrDefault(null);
                if(Model.WebServiceBase.isDebug) {
                    console.log("zhujun scene data st " + JSON.stringify(st));
                }
                
//                SceneLocalService.sceneData = new SceneData(WebValue.dataDyModel.sceneModel,st);
                SceneLocalService.sceneData = new SceneData(WebValue.dataDyModel.playerModel.sceneId,st);
                SceneLocalService.sceneData.currentMonster = monsterIndex;
                SceneLocalService.setSceneMonsterCount(SceneLocalService.sceneData);
            }
            WebValue.dataDyModel.playerModel.sceneId = SceneLocalService.SceneData.sceneId;//设置网络层提交数据.
            return SceneLocalService.sceneData;
        }
        
        /**
         * @构造下一关卡信息.
         */ 
        public static setNextSceneData(){
            Model.WebValue.dataDyModel.playerModel.sceneId += 1;//场景id往后加.再初始化怪物.
            var dySceneId: number = (WebValue.dataDyModel.playerModel.sceneId % (Number(PlayerLocalService.PlayerData.st.startScene) - 1));
            if(dySceneId == 0){//如果关卡id能被系数整除,则为系数减一关卡.
                dySceneId = Number(PlayerLocalService.PlayerData.st.startScene) - 1;
            }
            var st: SceneStModel = Enumerable.From(WebValue.dataStModel.sceneList).Where(x=> x.id == dySceneId).FirstOrDefault(null);
            SceneLocalService.sceneData = new SceneData(WebValue.dataDyModel.playerModel.sceneId,st);
            SceneLocalService.sceneData.currentMonster = 0;
            SceneLocalService.setSceneMonsterCount(SceneLocalService.sceneData);
        }
        
        /**
         * @关卡怪物数量=sceneMonsterCount*（1- WEAPON_TYPE_CUT_ENEMY_COUNT）
         * @sceneMonsterCount来源st_system_config
         * @WEAPON_TYPE_CUT_ENEMY_COUNT是神兵的加成
         */ 
        public static setSceneMonsterCount(_data:SceneData){
            _data.monsterCount = Math.round(parseInt(PlayerLocalService.PlayerData.st.sceneMonsterNumber) * (1 - MagicWeaponService.CutEnemyCount / 100));
        }
	}
}
