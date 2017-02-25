var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewModel;
(function (ViewModel) {
    /**
     *
     * @author: by cai_haotian 2015.12.23.
     */
    var ShopItemVM = (function (_super) {
        __extends(ShopItemVM, _super);
        function ShopItemVM(_uiGroup, _onCallback) {
            var _this = _super.call(this) || this;
            /**
             * @设置标示是否免费
             */
            _this.isFree = false;
            _this.skinName = "View.ShopItem";
            _this.uiGroup = _uiGroup;
            _this.onCallback = _onCallback;
            _this.uiGroup.addChild(_this);
            return _this;
        }
        ShopItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * @设置商城元宝按钮
         * @by cai_haotian 2016.3.22.
         */
        ShopItemVM.prototype.setYBItem = function () {
            this.goodsIcon.source = "Icon_shangcheng_png";
            this.goodsName.text = Model.WebValue.isTraditional ? "海量福利等妳來領！" : "海量福利等你来领！";
            this.goodsDesOne.text = Model.WebValue.isTraditional ? "聽說賣完這批元寶就回家種田了！" : "听说卖完这批元宝就回家种田了！";
            this.goodsBtn.y = -7;
            this.goodsBtn.setYBBtn();
            this.goodsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setYBBtn, this);
        };
        /**
         * @设置商城item数据
         * @by cai_haotian 2016.2.26
         */
        ShopItemVM.prototype.setSData = function (_data) {
            this.sData = _data;
            if (_data.st.description.length >= 16) {
                this.goodsName.y = 5;
            }
            this.goodsName.text = _data.st.name;
            this.goodsIcon.source = _data.Icon;
            if (_data.Type == Model.ShopType.SHOP_TYPE_COIN) {
                this.goodsDesOne.text = _data.st.description.replace("{}", _data.goldAndUnit);
            }
            else {
                this.goodsDesOne.text = _data.st.description;
            }
            var isDisabled = true;
            if (_data.Type == Model.ShopType.SHOP_TYPE_YB) {
                this.goodsBtn.y = -7;
                this.goodsBtn.setYBBuy(_data.st.costRmb, true);
                this.costRmb.text = _data.st.costRmb + "元";
            }
            else {
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
                }
                else {
                    this.isFree = false;
                }
                //判断技能是否处在持续时间
                if (_data.dy) {
                    var myDate = new Date();
                    var currentTime = myDate.getTime() / 1000;
                    var TimeOver = currentTime - _data.dy.lastShopTime <= 86400; //判断是否小于一天
                    if (TimeOver) {
                        this.goodsBtn.skillUsing();
                    }
                }
            }
        };
        /**
         * @商城购买事件
         * @by cai_haotian
         */
        ShopItemVM.prototype.onUpgradeMEvent = function () {
            if (this.onCallback) {
                this.onCallback(this.sData, this.isFree);
            }
        };
        /**
         * @购买元宝按钮
         * @by cai_haotian 2016.3.22.
         */
        ShopItemVM.prototype.setYBBtn = function () {
            if (this.onCallback) {
                this.onCallback();
            }
        };
        return ShopItemVM;
    }(eui.Component));
    ViewModel.ShopItemVM = ShopItemVM;
    __reflect(ShopItemVM.prototype, "ViewModel.ShopItemVM");
})(ViewModel || (ViewModel = {}));
