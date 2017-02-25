module ViewModel { 
    /**
     *
     * @author by cai_haotian 2015.12.24.
     *
     */
    export class CharDetailMsgVM extends eui.Component {
        /**
         * @窗口关闭按钮
         */
        private closeBtn: eui.Button;

        /**
         * @技能图标最上的
         */
        private skillIcon: eui.Image;
        /**
         * @技能id，也可以为玩家id
         */
        private skillId: eui.Label;
        /**
         * @技能详情 等级/描述
         */
        private skillDetail: eui.Label;
        /**
         * @技能或者人物描述
         */
        private skillDes: eui.Label;
        
        
        /**
         * @主角详情列表
         */
        private playerSkillList: eui.Group;
        
        /**
         * @挚友详情列表
         */
        private friendSkillList: eui.Group;
        
        /**
         * @父节点
         */
        private uiLayer: egret.DisplayObjectContainer;
        
        /**
         * @回调方法
         */ 
        private onCallBack:Function;
        
        /**
         * @主角信息
         */ 
        private PData:Model.PlayerData;
        
        /**
         * @挚友信息
         */ 
        private FData:Model.FriendData;

        public constructor(_uiLayer?: egret.DisplayObjectContainer,_onCallBack?:Function) {
            super();
            this.skinName = View.CharDetailMsg;
            this.uiLayer = _uiLayer;
            this.onCallBack=_onCallBack;
            this.uiLayer.addChild(this);
        }

        protected createChildren() {
            super.createChildren();
            /**
             * @添加按钮关闭事件
             */
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                this.uiLayer.removeChild(this);
            },this);
        }
        
        /**
         * @初始化主角数据
         */ 
        public initPData(){
            if(Model.PlayerLocalService.PlayerData.dy.nickName === undefined){
                
                if(Model.WebValue.isTraditional){
                    this.skillId.text = "新用戶" + Model.Mathf.random(1,9999);
                }else{
                    this.skillId.text = "新用户" + Model.Mathf.random(1,9999);
                }
                
                
                Model.PlayerLocalService.PlayerData.dy.nickName = this.skillId.text;
            }else{
                this.skillId.text = Model.PlayerLocalService.PlayerData.dy.nickName;
            }
            
            //获取主角技能列表
            var pSDatas: Model.PlayerSkillData[] = Model.PlayerSkillLocalService.PlayerSkillList;
            if(Model.WebValue.isTraditional){
                this.skillDetail.text = "Lv." + Model.WebValue.dataDyModel.playerModel.level + "           " + "秒傷:" + Model.PlayerLocalService.PlayerData.ClickDamageAndUnit;
            }else{
                this.skillDetail.text = "Lv." + Model.WebValue.dataDyModel.playerModel.level + "           " + "秒伤:" + Model.PlayerLocalService.PlayerData.ClickDamageAndUnit;
            }
            
            
            this.skillDes.text = "    " + Model.PlayerLocalService.PlayerData.st.playerDescription;
            this.skillIcon.source = Model.WebValue.dataStModel.sysConfigModel.leadHead;
            this.playerSkillList.visible = true;
            var char: ViewModel.CharMsgItemVM;
            for(var i = 0;i < this.playerSkillList.numElements;i++) {
                char = <CharMsgItemVM>this.playerSkillList.getChildAt(i);
                char.zhujueDetail.visible = true;
                char.skillIcon.source = pSDatas[i].st.icon;
                char.skillName.text = pSDatas[i].st.name;
                
                if(pSDatas[i].dy){
                    var skillEffectDes = pSDatas[i].effect;//Model.PlayerSkillLocalService.skillEffect(pSDatas[i].st.skillEffectValue,pSDatas[i].st.skillEffectAdd,pSDatas[i].dy.level);
                }else{
                    var skillEffectDes = pSDatas[i].effect;//Model.PlayerSkillLocalService.skillEffect(pSDatas[i].st.skillEffectValue,pSDatas[i].st.skillEffectAdd,1);
                    char.Mask.visible=true;
                    char.MaskWord.text="Lv:"+pSDatas[i].st.openLevel;
                }
                
                char.skillResult.text = pSDatas[i].Description;//st.description.replace("{}",skillEffectDes.toString());
                
                if(Model.WebValue.isTraditional){
                    if(i == 0) {
                        char.skillDetail.text = "持續時間：" + pSDatas[i].continueTime + "s   冷卻時間：" + pSDatas[i].cdTime + "s";
                    } else {
                        char.skillDetail.text = "持續時間：" + pSDatas[i].continueTime + "s   冷卻時間：" + pSDatas[i].cdTime + "s";
                    }
                }else{
                    if(i == 0) {
                        char.skillDetail.text = "持续时间：" + pSDatas[i].continueTime + "s   冷却时间：" + pSDatas[i].cdTime + "s";
                    } else {
                        char.skillDetail.text = "持续时间：" + pSDatas[i].continueTime + "s   冷却时间：" + pSDatas[i].cdTime + "s";
                    }
                }
                
                
            }
        }
        
        /**
         * @初始化挚友数据
         */ 
        public initFData(_fData?: Model.FriendData){
            this.skillId.text = _fData.st.name;
            
            if(Model.WebValue.isTraditional){
                if(_fData.dy) {
                    this.skillDetail.text = "Lv." + _fData.dy.level + "           " + "秒傷:" + _fData.DpsAndUnit;
                } else {
                    this.skillDetail.text = "Lv." + 0 + "           " + "秒傷:" + 0;
                }
            }else{
                if(_fData.dy) {
                    this.skillDetail.text = "Lv." + _fData.dy.level + "           " + "秒伤:" + _fData.DpsAndUnit;
                } else {
                    this.skillDetail.text = "Lv." + 0 + "           " + "秒伤:" + 0;
                }
            }
            
            

            this.skillDes.text = _fData.st.description;
            this.skillIcon.source = _fData.st.icon;
            this.friendSkillList.visible = true;
            var friendList: ViewModel.CharMsgItemVM;

            var arr = ["一","二","三","四","五","六","七"];
            
            
            var type:string[] = new Array();
            type["FRIEND_SKILL_TYPE_SLEF"] = Model.WebValue.isTraditional ? "提升{}本技能傷害":"提升{}本技能伤害";
            type["FRIEND_SKILL_TYPE_ALL"] = Model.WebValue.isTraditional ?"提升{}所有傷害":"提升{}所有伤害";
            type["FRIEND_SKILL_TYPE_CRIT"] = Model.WebValue.isTraditional ?"提升{}暴擊傷害":"提升{}暴击伤害";
            type["FRIEND_SKILL_TYPE_CRIT_PROBABILITY"] = Model.WebValue.isTraditional ?"提升{}暴擊率":"提升{}暴击率";
            type["FRIEND_SKILL_TYPE_CLICK"] = Model.WebValue.isTraditional ? "提升{}點擊傷害":"提升{}点击伤害";
            type["FRIEND_SKILL_TYPE_COIN"] = Model.WebValue.isTraditional ? "提升{}銅幣掉落數量":"提升{}铜币掉落数量";
            type["FRIEND_SKILL_TYPE_BOX_COIN"] = Model.WebValue.isTraditional ?"提升{}寶箱銅幣掉落數量":"提升{}宝箱铜币掉落数量";
            type["FRIEND_SKILL_TYPE_BOSS"] = Model.WebValue.isTraditional ? "提升{}對BOSS的傷害":"提升{}对BOSS的伤害";
                
            var lockLevel = [Model.WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFirst,Model.WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSecond,
                Model.WebValue.dataStModel.sysConfigModel.openFriendSkillLevelThird,Model.WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFourth,
                Model.WebValue.dataStModel.sysConfigModel.openFriendSkillLevelFifth,Model.WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSixth,
                Model.WebValue.dataStModel.sysConfigModel.openFriendSkillLevelSeventh];
            for(var i = 0;i < this.friendSkillList.numElements;i++) {
                friendList = <CharMsgItemVM>this.friendSkillList.getChildAt(i);
                friendList.friendDetail.visible = true;
                var j = i + 1;
                friendList.skillIcon.source = "layer_0" + j + "_l";
                
                if(Model.WebValue.isTraditional){
                    friendList.skillLevel.text = "第" + arr[i] + "重";
                }else{
                    friendList.skillLevel.text = "第" + arr[i] + "重";
                }
                
                
                
                if(!_fData.dy || (_fData.dy.layerId<i+1)){
                    friendList.Mask.visible = true;
                    friendList.MaskWord.text = "Lv:" + lockLevel[i];
                }
                
                
                switch(i) {
                    case 0:
                        friendList.skillEffect.text = type[_fData.st.firstLayerType].replace("{}",_fData.st.firstLayerValue+"%");
                        break;
                    case 1:
                        friendList.skillEffect.text = type[_fData.st.secondLayerType].replace("{}",_fData.st.secondLayerValue + "%");
                        break;
                    case 2:
                        friendList.skillEffect.text = type[_fData.st.thirdLayerType].replace("{}",_fData.st.thirdLayerValue + "%");
                        break;
                    case 3:
                        friendList.skillEffect.text = type[_fData.st.fourthLayerType].replace("{}",_fData.st.fourthLayerValue + "%");
                        break;
                    case 4:
                        friendList.skillEffect.text = type[_fData.st.fifthLayerType].replace("{}",_fData.st.fifthLayerValue + "%");
                        break;
                    case 5:
                        friendList.skillEffect.text = type[_fData.st.sixthLayerType].replace("{}",_fData.st.sixthLayerValue + "%");
                        break;
                    case 6:
                        friendList.skillEffect.text = type[_fData.st.seventhLayerType].replace("{}",_fData.st.seventhLayerValue + "%");
                        break;
                    default: alert("数据出错！请联系管理员！");
                }
            }
        }
        
    }
}