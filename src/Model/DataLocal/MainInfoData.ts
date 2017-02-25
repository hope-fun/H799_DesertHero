module Model {
	/**
	 * @Data:组织VM所需要的数据.
	 * @author: zhu_jun 
	 * @date: 2016.01.05.
	 */
	export class MainInfoData {
		public constructor() {

		}
		
		/**
		 * @获取技能动态列表.
		 */ 
		public get getSkillDyList():SkillDyModel[]{
		    return WebValue.dataDyModel.skillModelList;
		}
		
		/**
		 * @获取技能静态列表.
		 */ 
		public get getSkillStList():SkillStModel[]{
		    return WebValue.dataStModel.skillList;
		}
	}
}
