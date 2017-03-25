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
     * @author fangchao
     * @date 2015.12.30
     *
     */
    var BtnMusicVM = (function (_super) {
        __extends(BtnMusicVM, _super);
        function BtnMusicVM() {
            var _this = _super.call(this) || this;
            _this.skinName = View.BtnMusicView;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.currentState === "up") {
                    _this.currentState = "down";
                }
                else {
                    _this.currentState = "up";
                }
            }, _this);
            return _this;
        }
        BtnMusicVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return BtnMusicVM;
    }(eui.Button));
    ViewModel.BtnMusicVM = BtnMusicVM;
    __reflect(BtnMusicVM.prototype, "ViewModel.BtnMusicVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=BtnMusicVM.js.map