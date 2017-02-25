module Model {
	/**
	 *
	 * @author: zhu_jun
	 * @date: 2016.02.02.
	 *
	 */
	export class SkillDyModel {
        public constructor(_skillId: number,_level:number,_cdTime:number) {
    		this.skillId = _skillId;
    		this.level = _level;
    		this.cdTime = _cdTime;
		}
		/**
		 * @玩家技能ID
		 */ 
        public skillId: number;
        /**
		 * @玩家技能等级
		 */ 
        public level: number;
        /**
		 * @玩家技能CD时间（S）0：可用状态
		 */ 
        public cdTime: number;
	}
}
