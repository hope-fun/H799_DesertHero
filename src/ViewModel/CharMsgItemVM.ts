module ViewModel { 
    /**
     *
     * @author by cai_haotian 2015.12.24. 
     *
     */
    export class CharMsgItemVM extends eui.Component{
        /**
         * @技能图标
         */ 
        public skillIcon: eui.Image;
        
        
        /**
         * @主角技能表述组
         */ 
        public zhujueDetail: eui.Group;
        /**
         * @主角技能名
         */ 
        public skillName: eui.Label;
        /**
         * @主角技能描述
         */ 
        public skillResult: eui.Label;
        /**
         * @主句技能冷却时间以及持续时间
         */ 
        public skillDetail: eui.Label;
        
        
        /**
         * @挚友技能详情
         */ 
        public friendDetail: eui.Group;
        /**
         * @挚友技能重数
         */ 
        public skillLevel: eui.Label;
        /**
         * @挚友技能效果
         */ 
        public skillEffect: eui.Label;
        
        
        /**
         * @技能遮罩层
         */ 
        public Mask: eui.Group;
        /**
         * @遮罩层上的文字
         */ 
        public MaskWord: eui.Label;
        
        public constructor() {
            super();
            this.skinName = View.CharMsgItem;
            
            /**
             * @挚友赋值 主角的显示为false
             */ 
//            this.friendDetail.visible = true;
//            this.skillLevel.text = "第" + "二" + "重";
//            this.skillEffect.text = "一拳致死！one punch hero";
            
            
            /**
             * @主角赋值 挚友的显示为false
             */ 
//            this.zhujueDetail.visible = true;
//            this.skillName.text = "一拳";
//            this.skillIcon.source = "iconAtlas_json.active_skill_4";
//            this.skillResult.text = "巴拉巴拉巴拉巴拉....";
//            this.skillDetail.text = "持续时间：30s        冷却时间1800s";
        }
        
        protected createChildren() { 
            super.createChildren();
        }
    }
}