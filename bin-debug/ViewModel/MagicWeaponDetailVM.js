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
     * @author  fangchao
     * @date 2015.12.30
     *
     */
    var MagicWeaponDetailVM = (function (_super) {
        __extends(MagicWeaponDetailVM, _super);
        function MagicWeaponDetailVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.MagicWeaponDetailView;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        MagicWeaponDetailVM.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            /**
             * @添加按钮关闭事件
             */
            this.magicCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.uiLayer.removeChild(_this);
            }, this);
        };
        /**
         * @设置按钮内容
         */
        MagicWeaponDetailVM.prototype.setMWData = function (_mWData) {
            this.mWData = _mWData;
            //            console.log("cai_haotian mwData is" + JSON.stringify(this.mWData));
            this.magicWeapon.source = this.mWData.Icon;
            this.weaponName.text = this.mWData.st.name;
            if (this.mWData.dy) {
                this.weaponLevel.text = "Lv." + this.mWData.dy.level;
            }
            else {
                this.weaponLevel.text = "Lv.0";
            }
            this.weaponAddNow.text = this.mWData.st.descriptionFirst.replace("{}", this.mWData.effectFirst + "");
            this.weaponRemoveNow.text = this.mWData.st.descriptionSecond.replace("{}", this.mWData.effectSecond + "");
            this.weaponAddNext.text = this.mWData.st.descriptionFirst.replace("{}", this.mWData.effectFirstNext + "");
            this.weaponRemoveNext.text = this.mWData.st.descriptionSecond.replace("{}", this.mWData.effectSecondNext + "");
        };
        return MagicWeaponDetailVM;
    }(eui.Component));
    ViewModel.MagicWeaponDetailVM = MagicWeaponDetailVM;
    __reflect(MagicWeaponDetailVM.prototype, "ViewModel.MagicWeaponDetailVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=MagicWeaponDetailVM.js.map