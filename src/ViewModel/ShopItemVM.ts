module ViewModel {
    /**
     *
     * @author: by cai_haotian 2015.12.23.
     */
    export class ShopItemVM extends eui.Component {
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
        private sData: Model.ShopData;
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
         * @商品描述
         */
        private goodsDes: eui.Label;
        /**
         * @背景 用于绑定事件
         */
        private bg: eui.Image;
        /**
         * @花费多少人民币
         */
        private costRmb: eui.Label;

        /**
         * @设置标示是否免费
         */
        private isFree: boolean = false;

        public constructor(_uiGroup: eui.Group, _onCallback?: Function) {
            super();
            this.skinName = "View.ShopItem";
            this.uiGroup = _uiGroup;
            this.onCallback = _onCallback;
            this.uiGroup.addChild(this);
        }

        protected createChildren() {
            super.createChildren();
        }


        /**
         * @设置商城元宝按钮
         * @by cai_haotian 2016.3.22.
         */
        public setYBItem() {
            this.goodsIcon.source = "Icon_shangcheng_png";
            this.goodsName.text = Model.WebValue.isTraditional ? "海量福利等妳來領！" : "海量福利等你来领！";
            this.goodsDesOne.text = Model.WebValue.isTraditional ? "聽說賣完這批元寶就回家種田了！" : "听说卖完这批元宝就回家种田了！";
            this.goodsBtn.y = -7;
            this.goodsBtn.setYBBtn();
            this.goodsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setYBBtn, this);
        }

        /**
         * @设置商城item数据
         * @by cai_haotian 2016.2.26
         */
        public setSData(_data: Model.ShopData) {
            this.sData = _data;
            if (_data.st.description.length >= 16) {
                this.goodsName.y = 5;
            }

            this.goodsName.text = _data.st.name;
            this.goodsIcon.source = _data.Icon;
            if (_data.Type == Model.ShopType.SHOP_TYPE_COIN) {
                this.goodsDesOne.text = _data.st.description.replace("{}", _data.goldAndUnit);
            } else {
                this.goodsDesOne.text = _data.st.description;
            }

            var isDisabled = true;
            if (_data.Type == Model.ShopType.SHOP_TYPE_YB) {
                this.goodsBtn.y = -7;
                this.goodsBtn.setYBBuy(_data.st.costRmb, true);
                this.costRmb.text = _data.st.costRmb + "元";
            } else {
                this.goodsBtn.setSBuy(_data.st.cost, true);
            }
            this.goodsBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onUpgradeMEvent, this);

            if (_data.st.id == 4) {
                //判断是否可以免费释放
                var myDate = new Date();
                var currentTime = myDate.getTime() / 1000;
                if (currentTime - Model.PlayerLocalService.PlayerData.dy.freeSkillTime <= 86400) {
                    this.goodsBtn.setFreeSkill();
                    this.isFree = true;
                } else {
                    this.isFree = false;
                }


                //判断技能是否处在持续时间
                if (_data.dy) {
                    var myDate = new Date();
                    var currentTime = myDate.getTime() / 1000;
                    var TimeOver = currentTime - _data.dy.lastShopTime <= 86400;//判断是否小于一天
                    if (TimeOver) {
                        this.goodsBtn.skillUsing();
                    }
                }
            }
        }

        /**
         * @商城购买事件
         * @by cai_haotian
         */
        private onUpgradeMEvent() {
            if (this.onCallback) {
                this.onCallback(this.sData, this.isFree);
            }
        }

        /**
         * @购买元宝按钮
         * @by cai_haotian 2016.3.22.
         */
        private setYBBtn() {
            if (this.onCallback) {
                this.onCallback();
            }
        }
    }
}