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
     * @author by cai_haotian 2015.12.24.
     *
     */
    var CharMsgItemVM = (function (_super) {
        __extends(CharMsgItemVM, _super);
        function CharMsgItemVM() {
            var _this = _super.call(this) || this;
            _this.skinName = View.CharMsgItem;
            return _this;
            /**
             * @挚友赋值 主角的显示为false
             */
            //            this.friendDetail.visible = true;
            //            this.skillLevel.text = "第" + "二" + "重";
            //            this.skillEffect.text = "一拳致死！one punch hero";
            /**
             * @主角赋值 挚友的显示为false
             */
            //            this.zhujueDetail.visible = true;
            //            this.skillName.text = "一拳";
            //            this.skillIcon.source = "iconAtlas_json.active_skill_4";
            //            this.skillResult.text = "巴拉巴拉巴拉巴拉....";
            //            this.skillDetail.text = "持续时间：30s        冷却时间1800s";
        }
        CharMsgItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        return CharMsgItemVM;
    }(eui.Component));
    ViewModel.CharMsgItemVM = CharMsgItemVM;
    __reflect(CharMsgItemVM.prototype, "ViewModel.CharMsgItemVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=CharMsgItemVM.js.map