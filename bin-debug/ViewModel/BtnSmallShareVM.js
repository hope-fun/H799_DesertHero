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
     * @author by cai_haotian 2015.12.23.
     *
     */
    var BtnSmallShareVM = (function (_super) {
        __extends(BtnSmallShareVM, _super);
        function BtnSmallShareVM() {
            var _this = _super.call(this) || this;
            _this.skinName = View.BtnSmallShareItem;
            return _this;
        }
        BtnSmallShareVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                Model.AudioService.Shared().PlaySound("YX-002_mp3");
            }, this);
        };
        /**
         * @挚友10,100连升
         * @by cai_haotian 2016.2.25.
         */
        BtnSmallShareVM.prototype.setFriendIcon = function (count, cost) {
            this.friend.visible = true;
            this.describe.text = "+" + count;
            this.costNum.text = cost;
        };
        /**
         * @主角10,100连升
         * @by cai_haotian 2016.2.25.
         */
        BtnSmallShareVM.prototype.setCharIcon = function (count, cost) {
            this.zhujue.visible = true;
            this.describe.text = "+" + count;
            this.costNum.text = cost;
        };
        return BtnSmallShareVM;
    }(eui.Button));
    ViewModel.BtnSmallShareVM = BtnSmallShareVM;
    __reflect(BtnSmallShareVM.prototype, "ViewModel.BtnSmallShareVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=BtnSmallShareVM.js.map