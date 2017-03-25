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
     * @modification: by zhu_jun,2016.01.17.
     * @by zhu_jun,2017.02.19.
     */
    var MagicWeaponItemVM = (function (_super) {
        __extends(MagicWeaponItemVM, _super);
        function MagicWeaponItemVM(_uiGroup, _onCallback) {
            var _this = _super.call(this) || this;
            _this.skinName = View.MagicWeaponItem;
            _this.uiGroup = _uiGroup;
            _this.onCallback = _onCallback;
            _this.uiGroup.addChild(_this);
            return _this;
        }
        MagicWeaponItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * @设置神器购买item数据.
         */
        MagicWeaponItemVM.prototype.setMWBuyData = function () {
            if (Model.WebValue.isTraditional) {
                this.goodsName.text = "神器";
            }
            else {
                this.goodsName.text = "神器";
            }
            this.goodsName.top = 15;
            if (Model.MagicWeaponService.isFull()) {
                this.goodsBtn.visible = false;
                this.finishImage.visible = true;
            }
            else {
                this.goodsIcon.source = Model.WebValue.dataStModel.sysConfigModel.magicWeaponIcon;
                this.goodsDesOne.top = 40;
                if (Model.WebValue.isTraditional) {
                    this.goodsDesOne.text = "隨機激活一把新神兵";
                }
                else {
                    this.goodsDesOne.text = "随机激活一把新神兵";
                }
                var isDisable = Model.PlayerLocalService.PlayerData.dy.jewel < Model.MagicWeaponService.BuyCost;
                this.goodsBtn.setMWBuy(Model.MagicWeaponService.BuyCost, isDisable);
                this.goodsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyMWEvent, this);
                //by cai_haotian 2016.1.30.
                this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createBuyPop, this);
            }
        };
        /**
         * @购买二级菜单
         * @by cai_haotian 2016.2.1.
         */
        MagicWeaponItemVM.prototype.createBuyPop = function () {
            if (this.onCallback) {
                new ViewModel.MagicWeaponBuyDetailVM(Main.singleton, function () { });
            }
        };
        /**
         * @按钮回调事件.
         */
        MagicWeaponItemVM.prototype.onBuyMWEvent = function () {
            if (this.onCallback) {
                this.onCallback();
            }
        };
        /**
         * @设置神器item数据.
         */
        MagicWeaponItemVM.prototype.setMWData = function (_data) {
            if (!_data || !_data.st) {
                alert("数据错误，请重新加载 ! ");
                return;
            }
            this.mWData = _data;
            this.goodsName.text = _data.st.name;
            this.goodsIcon.source = _data.Icon;
            this.goodsDesOne.text = _data.st.descriptionFirst.replace("{}", _data.effectFirst.toString());
            this.goodsDesTwo.text = _data.st.descriptionSecond.replace("{}", _data.effectSecond.toString());
            if (_data.dy) {
                var isDisable = Model.PlayerLocalService.PlayerData.dy.jewel < _data.upgradeCost;
                this.goodsBtn.setMWUnlock(_data.upgradeCost, isDisable);
                this.goodsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgradeMWEvent, this);
                this.goodsLevel.visible = true;
                this.goodsLevel.text = "Lv." + _data.dy.level;
                //by cai_haotian 2016.1.30.
                this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createPop, this);
            }
            else {
                this.goodsBtn.setMWLock(_data.upgradeCost);
            }
        };
        /**
         * @神器item二级弹窗
         * @by cai_haotian 2016.2.1.
         */
        MagicWeaponItemVM.prototype.createPop = function () {
            if (this.onCallback) {
                var item = new ViewModel.MagicWeaponDetailVM(Main.singleton, function () { });
                item.setMWData(this.mWData);
            }
        };
        /**
         * @神器升级事件.
         */
        MagicWeaponItemVM.prototype.onUpgradeMWEvent = function () {
            if (this.onCallback)
                this.onCallback(this.mWData);
        };
        return MagicWeaponItemVM;
    }(eui.Component));
    ViewModel.MagicWeaponItemVM = MagicWeaponItemVM;
    __reflect(MagicWeaponItemVM.prototype, "ViewModel.MagicWeaponItemVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=MagicWeaponItemVM.js.map