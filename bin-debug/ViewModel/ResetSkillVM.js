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
     * @date 2016.2.24.
     *
     */
    var ResetSkillVM = (function (_super) {
        __extends(ResetSkillVM, _super);
        function ResetSkillVM(_uiGroup, _data, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = "View.ResetSkillView";
            _this.uiGroup = _uiGroup;
            _this.skillData = _data;
            _this.onCallBack = _onCallBack;
            _this.uiGroup.addChild(_this);
            return _this;
        }
        ResetSkillVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initBtn();
            this.setResetMoney();
            this.confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEvent, this);
        };
        /**
         * @重置所有按钮
         */
        ResetSkillVM.prototype.initBtn = function () {
            var _this = this;
            this.confirm.costIcon.visible = false;
            this.closeBtn.costIcon.visible = false;
            this.confirm.costNum.visible = false;
            this.closeBtn.costNum.visible = false;
            this.confirm.description.text = "是";
            this.closeBtn.description.text = "否";
            var isDisabled = Model.PlayerLocalService.isEnoughSycee(this.skillData.st.removeCdCost);
            this.confirm.setReduceCD(isDisabled);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.uiGroup.removeChild(_this);
            }, this);
        };
        /**
         * @设置重置钱数
         */
        ResetSkillVM.prototype.setResetMoney = function () {
            if (Model.WebValue.isTraditional) {
                this.resetCost.text = "妳想要花" + this.skillData.st.removeCdCost + "元寶重置此技能冷卻麼？";
            }
            else {
                this.resetCost.text = "你想要花" + this.skillData.st.removeCdCost + "元宝重置此技能冷却么？";
            }
        };
        /**
         * @确定按钮
         */
        ResetSkillVM.prototype.touchEvent = function () {
            if (this.onCallBack) {
                this.onCallBack(this.skillData);
                this.uiGroup.removeChild(this);
            }
        };
        return ResetSkillVM;
    }(eui.Component));
    ViewModel.ResetSkillVM = ResetSkillVM;
    __reflect(ResetSkillVM.prototype, "ViewModel.ResetSkillVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=ResetSkillVM.js.map