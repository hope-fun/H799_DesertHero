module Model {
	/**
	 * @author: zhu_jun
	 * @date: 2016.02.24.
	 * @场景动态信息是玩家属性,直接调用WebValue.
	 */
	export class SceneData {
		public constructor(_dy?:number, _st?:SceneStModel) {
    		this.sceneId = _dy;
    		this.st = _st;
		}
		
		/**
		 * @当前怪物index.
		 */ 
		public currentMonster:number = 0;
		
		/**
		 * @关卡怪物数量.
		 */ 
		public monsterCount:number = 0;
		
//		public get ScenePic():string{
//		    return String(this.st.scenePic + "_png");
//		}
		
//		/**
//		 * @怪物动态数据.
//		 */ 
//        public scene: number;
        /**
		 * @场景动态数据.
		 */
        public sceneId: number;
		/**
		 * @场景静态数据.
		 */ 
        public st: SceneStModel;
	}
}
