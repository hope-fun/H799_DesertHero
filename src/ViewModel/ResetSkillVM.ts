module ViewModel {
	/**
     *
     * @author cai_haotian
     * @date 2016.2.24.
     *
     */
   export class ResetSkillVM extends eui.Component{
       /**
        * @重置钱数
        */ 
       private resetCost:eui.Label;
       
       /**
        * @确定按钮
        */ 
       private confirm:ViewModel.BtnShareVM;
       
       /**
        * @取消按钮
        */
       private closeBtn: ViewModel.BtnShareVM;
       
       /**
        * @父节点
        */ 
       private uiGroup:eui.UILayer;
       /**
        * @回调函数
        */ 
       private onCallBack:Function;
       
       /**
        * @技能数据
        */ 
       private skillData:Model.PlayerSkillData;
       
       public constructor(_uiGroup: eui.UILayer,_data: Model.PlayerSkillData,_onCallBack:Function) {
            super();
            this.skinName ="View.ResetSkillView";
            this.uiGroup=_uiGroup;
            this.skillData=_data;
            this.onCallBack=_onCallBack;
            this.uiGroup.addChild(this);
        }
        
        protected createChildren(){
            super.createChildren();
            this.initBtn();
            this.setResetMoney();
            this.confirm.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchEvent,this);
        }
        
        /**
         * @重置所有按钮
         */ 
        private initBtn(){
            this.confirm.costIcon.visible=false;
            this.closeBtn.costIcon.visible = false;
            
            this.confirm.costNum.visible = false;
            this.closeBtn.costNum.visible = false;
            
            this.confirm.description.text="是";
            this.closeBtn.description.text = "否";
            
            var isDisabled = Model.PlayerLocalService.isEnoughSycee(this.skillData.st.removeCdCost);
            this.confirm.setReduceCD(isDisabled);
            
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                this.uiGroup.removeChild(this);
            },this)
        }
        
        /**
         * @设置重置钱数
         */ 
        public setResetMoney(){
            if(Model.WebValue.isTraditional){
                this.resetCost.text = "妳想要花" + this.skillData.st.removeCdCost + "元寶重置此技能冷卻麼？";
            }else{
                this.resetCost.text = "你想要花" + this.skillData.st.removeCdCost + "元宝重置此技能冷却么？";
            }
        }
        
        /**
         * @确定按钮
         */ 
        private touchEvent(){
            if(this.onCallBack){
                this.onCallBack(this.skillData);
                this.uiGroup.removeChild(this);
            }
        }
        
    }
}


