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
     * @author cai_haotian
     * @date 2016.1.18.
     *
     */
    var AnnouncementMsgVM = (function (_super) {
        __extends(AnnouncementMsgVM, _super);
        function AnnouncementMsgVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.AnnouncementMsg;
            _this.uiLayer = _uiLayer;
            _this.uiLayer.addChild(_this);
            _this.onCallBack = _onCallBack;
            return _this;
        }
        AnnouncementMsgVM.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            this.setInfo();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.uiLayer.removeChild(_this);
            }, this);
        };
        /**
         * @设置信息
         */
        AnnouncementMsgVM.prototype.setInfo = function () {
        };
        return AnnouncementMsgVM;
    }(eui.Component));
    ViewModel.AnnouncementMsgVM = AnnouncementMsgVM;
    __reflect(AnnouncementMsgVM.prototype, "ViewModel.AnnouncementMsgVM");
})(ViewModel || (ViewModel = {}));
