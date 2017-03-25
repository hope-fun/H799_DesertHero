module ViewModel { 
    /**
     *
     * @author: by cai_haotian 2015.12.23.
     * @modification: by zhu_jun,2016.01.17.
     * @by zhu_jun,2017.02.19.
     */
    export class MagicWeaponItemVM extends eui.Component {
        /**
         * @上级父节点
         */
        public uiGroup: eui.Group;
        /**   
         * @回调函数
         */
        public onCallback: Function;
        /**
         * @神器数据.
         */
        private mWData: Model.MagicWeaponData;
        /**
         * @商城数据
         * @by cai_haotian
         */ 
        private sData:Model.ShopData;
        /**
         * @商品组
         */
        private goods: eui.Group;
        /**
         * @商品升级组
         */
        private levelUpBtn: eui.Group;
        /**
         * @商品升级钱
         */
        private costNum: eui.Label;
        /**
         * @商品升级单位(元宝或者金币)
         */
        private costIcon: eui.Image;
        
        /**
         * @商品升级按钮
         */
        private goodsBtn: ViewModel.BtnShareVM;
        /**
         * @商品图标
         */
        private goodsIcon: eui.Image;
        /**
         * @商品名称
         */
        private goodsName: eui.Label;
        /**
         * @商品描述1.
         */
        private goodsDesOne: eui.Label;
        /**
         * @商品描述2.
         */
        private goodsDesTwo: eui.Label;
        /**
         * @商品等级
         */ 
        private goodsLevel:eui.Label;
        /**
         * @背景 用于绑定事件
         */
        private bg: eui.Image;
        /**
         * @全部解锁后展示图片.
         */ 
        private finishImage:eui.Image;

        public constructor(_uiGroup: eui.Group,_onCallback?: Function) {
            super();
            this.skinName = View.MagicWeaponItem;
            this.uiGroup = _uiGroup;
            this.onCallback = _onCallback;
            this.uiGroup.addChild(this);
        }

        protected createChildren() {
            super.createChildren();
        }
        
        /**
         * @设置神器购买item数据.
         */
        public setMWBuyData() {
            if(Model.WebValue.isTraditional){
                this.goodsName.text = "神器";
            }else{
                this.goodsName.text = "神器";
            }
            
            
            this.goodsName.top = 15;
            if(Model.MagicWeaponService.isFull()){
                this.goodsBtn.visible = false;
                this.finishImage.visible = true;
            }else{
                this.goodsIcon.source = Model.WebValue.dataStModel.sysConfigModel.magicWeaponIcon;
                this.goodsDesOne.top = 40;
                if(Model.WebValue.isTraditional){
                    this.goodsDesOne.text = "隨機激活一把新神兵";
                }else{
                    this.goodsDesOne.text = "随机激活一把新神兵";
                }
                
                
                var isDisable = Model.PlayerLocalService.PlayerData.dy.jewel < Model.MagicWeaponService.BuyCost;
                this.goodsBtn.setMWBuy(Model.MagicWeaponService.BuyCost,isDisable);
                this.goodsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBuyMWEvent,this);
                //by cai_haotian 2016.1.30.
                this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.createBuyPop,this);
            }
        }
        
        /**
         * @购买二级菜单
         * @by cai_haotian 2016.2.1.
         */ 
        private createBuyPop(){
            if(this.onCallback) {
                new ViewModel.MagicWeaponBuyDetailVM(Main.sington,() => { });
            }
        }
        
        /**
         * @按钮回调事件.
         */
        private onBuyMWEvent() {
            if(this.onCallback) {
                this.onCallback();
            }
        }
        
        /**
         * @设置神器item数据.
         */
        public setMWData(_data: Model.MagicWeaponData) {
            if(!_data || !_data.st) {
                alert("数据错误，请重新加载 ! ");
                return;
            }
            this.mWData = _data;
            this.goodsName.text = _data.st.name;
            this.goodsIcon.source = _data.Icon;
            this.goodsDesOne.text = _data.st.descriptionFirst.replace("{}",_data.effectFirst.toString());
            this.goodsDesTwo.text = _data.st.descriptionSecond.replace("{}",_data.effectSecond.toString()); 
            if(_data.dy) {
                var isDisable = Model.PlayerLocalService.PlayerData.dy.jewel < _data.upgradeCost;
                this.goodsBtn.setMWUnlock(_data.upgradeCost,isDisable);
                this.goodsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onUpgradeMWEvent,this);
                this.goodsLevel.visible = true;
                this.goodsLevel.text = "Lv." + _data.dy.level;
                //by cai_haotian 2016.1.30.
                this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.createPop,this); 
            } else {
                this.goodsBtn.setMWLock(_data.upgradeCost);
            }
        }
        
        
        /**
         * @神器item二级弹窗
         * @by cai_haotian 2016.2.1.
         */ 
        private createPop(){
            if(this.onCallback){
                var item: ViewModel.MagicWeaponDetailVM = new ViewModel.MagicWeaponDetailVM(Main.sington,() => { });
                item.setMWData(this.mWData);
            }
        }
        
        /**
         * @神器升级事件.
         */
        private onUpgradeMWEvent() {
            if(this.onCallback)this.onCallback(this.mWData);
        }
        
    }
}