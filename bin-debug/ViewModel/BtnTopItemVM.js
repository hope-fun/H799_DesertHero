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
     * @author: zhu_jun.
     * @date: 2015.12.25.
     */
    var BtnTopItemVM = (function (_super) {
        __extends(BtnTopItemVM, _super);
        function BtnTopItemVM(_onCallBack) {
            var _this = _super.call(this) || this;
            /**
             * @在exml里面给btnIcon字段赋值.
             */
            _this.btnIconSource = "";
            _this.skinName = View.BtnTopItem;
            _this.onCallBack = _onCallBack;
            return _this;
            //            this.setSkinPart("btnIconSource",this.btnIconSource);//TODO:这句好像加不加无所谓.
        }
        BtnTopItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        BtnTopItemVM.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.btnIcon.source = this.btnIconSource;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                Model.AudioService.Shared().PlaySound("YX-001_mp3");
            }, this);
        };
        return BtnTopItemVM;
    }(eui.Button));
    ViewModel.BtnTopItemVM = BtnTopItemVM;
    __reflect(BtnTopItemVM.prototype, "ViewModel.BtnTopItemVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=BtnTopItemVM.js.map