module ViewModel {
	/**
	 *
	 * @author fangchao
	 *@by cai_haotian 2016.2.1
	 */
    export class BtnActiveSkillVM extends eui.Button {
    	/**
    	 * @按钮的回调函数
    	 */
        public onCallBack: Function;
        /**
         * @不同技能的序号
         */
        public skillNum: number;
        
        /**
         * @技能图标.
         */
        public skillIcon: eui.Image;
        /**
         * @技能图标名.
         */
        public skillIconSource:string;
        /**
         * @不同技能对应的图片
         */
        public skillState: eui.Image;
        /**
         * @技能冷却时的文本
         */
        public counterCD: eui.Label;
        /**
         * @cd描述
         */ 
        public cd:number;


        
        /**
         * @技能数据
         */
        private skillData: Model.PlayerSkillData;

        public constructor(_skillNum: number,_onCallBack?: Function) {
            super();
            this.skinName = View.BtnActiveSkillView;
            this.onCallBack = _onCallBack;
            this.setSkinPart("skillIconSource", this.skillIconSource);
        }
        protected createChildren() {
            super.createChildren();
        }

        protected childrenCreated(){
            super.childrenCreated();
            
        }
        
        /**
         * @设置技能初始数据
         */
        public initSkill(_data: Model.PlayerSkillData) {
            this.skillData = _data;
            //这里应该是判断技能是否达到可以显示状态 目前为了方便测试写的<=应该是写>=
            if(Model.PlayerLocalService.PlayerData.dy.level >= _data.st.openLevel ) {
                if(_data.dy&&_data.dy.cdTime==0&&_data.dy.level>=1){
                    this.currentState = "enabled";
                    this.touchEnabled = true;
                } else if(this.currentState != "disabled" && this.currentState !="during" && _data.dy && _data.dy.cdTime != 0){
                    this.initSkillCD(_data);
                }
            } else {
                this.currentState = "locked";
                this.touchEnabled = false;
            }
            this.skillIcon.source = _data.st.icon;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.usingSkill,this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                Model.AudioService.Shared().PlaySound("YX-001_mp3");
            },this);
        }
        
        /**
         * @初始化技能cd
         * @by cai_haotian 2016.3.7.
         */ 
        public initSkillCD(_data:Model.PlayerSkillData){
            this.counterCD.text = Model.PlayerSkillLocalService.timeDes(_data.dy.cdTime);
            if(_data.dy && _data.dy.cdTime > 0) {
                //进来先判断是否在cd状态
                this.currentState = "disabled"
                this.cd = egret.setInterval(() => {
                    this.counterCD.text = Model.PlayerSkillLocalService.timeDes(--_data.dy.cdTime);
                    if(_data.dy.cdTime == 0) {
                        this.currentState = "enabled"
                        egret.clearInterval(this.cd);
                    }
                },this,1000);
            }
        }
        
        /**
         * @使用技能
         * @by cai_haotian 2016.3.2.
         */ 
        private usingSkill(){
            if(this.onCallBack){
                this.onCallBack(this.skillData,this);
            }
        }
        
    }
}

