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
     * @author cai_haotian 2016.1.7.
     *
     */
    var CutHpItemVM = (function (_super) {
        __extends(CutHpItemVM, _super);
        function CutHpItemVM(_group) {
            var _this = _super.call(this) || this;
            _this.enabled = false;
            _this.group = _group;
            _this.skinName = View.CutHpItem;
            _this.group.addChild(_this);
            return _this;
        }
        CutHpItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
       * @设置普攻时口血量
       */
        CutHpItemVM.prototype.setNoramlAttack = function (_data, _damage) {
            this.data = _data;
            this.damage = _damage;
            this.normalAttack.font = RES.getRes("normal-font_fnt");
            this.normalAttack.smoothing = true;
            this.normalAttack.text = _data;
            this.TweenAnimate(100);
            //更新目前dps by cai_haotian 2016.2.23.
            //            Main.singleton.mainMenuVM.mainInfo.setMIData(Number(_data));
        };
        /**
         * @设置暴击时扣血量
         */
        CutHpItemVM.prototype.setCriticalAttack = function (_data, _damage) {
            var _this = this;
            this.data = _data;
            this.damage = _damage;
            this.criticalAttack.font = RES.getRes("critical-font_fnt");
            this.criticalAttack.smoothing = true;
            this.criticalAttack.text = _data;
            this.criticalAttack.y = 10;
            //更新目前dps by cai_haotian 2016.2.23.
            //            Main.singleton.mainMenuVM.mainInfo.setMIData(Number(_data));
            egret.setTimeout(function () {
                _this.TweenAnimate(50);
            }, this, 200);
        };
        /**
       * @渐淡动画
       */
        CutHpItemVM.prototype.TweenAnimate = function (num) {
            var _this = this;
            var groupAlphaTween = egret.Tween.get(this);
            groupAlphaTween.to({ alpha: 0, y: this.y - num }, 1000).call(function () {
                //更新目前dps by cai_haotian 2016.2.23.
                //                Main.singleton.mainMenuVM.mainInfo.setMIData(-Number(this.data));
                Model.PlayerLocalService.setPerSecondTapDamage(-_this.damage);
                alert("remove cut hp item");
                _this.group.removeChild(_this);
            });
        };
        return CutHpItemVM;
    }(eui.Component));
    ViewModel.CutHpItemVM = CutHpItemVM;
    __reflect(CutHpItemVM.prototype, "ViewModel.CutHpItemVM");
})(ViewModel || (ViewModel = {}));
