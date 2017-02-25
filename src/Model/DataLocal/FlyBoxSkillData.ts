module Model {
    /**
     *
     * @author cai_haotian 
     * @Date 2016.3.15
     *
     */
    export class FlyBoxSkillData {
        public constructor(_skillData: Model.PlayerSkillData,_skillItem: ViewModel.BtnActiveSkillVM) {
            this.skillData = _skillData;
            this.skillItem = _skillItem;
        }
    	
    	/**
    	 * @技能数据
    	 */
        public skillData: Model.PlayerSkillData;
    	
    	/**
    	 * @技能所在Item
    	 */
        public skillItem: ViewModel.BtnActiveSkillVM;
    }
}