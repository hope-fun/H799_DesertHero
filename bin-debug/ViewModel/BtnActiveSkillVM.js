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
     *@by cai_haotian 2016.2.1
     */
    var BtnActiveSkillVM = (function (_super) {
        __extends(BtnActiveSkillVM, _super);
        function BtnActiveSkillVM(_skillNum, _onCallBack) {
            var _this = _super.call(this) || this;
            _this.skinName = View.BtnActiveSkillView;
            _this.onCallBack = _onCallBack;
            _this.setSkinPart("skillIconSource", _this.skillIconSource);
            return _this;
        }
        BtnActiveSkillVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        BtnActiveSkillVM.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * @设置技能初始数据
         */
        BtnActiveSkillVM.prototype.initSkill = function (_data) {
            this.skillData = _data;
            //这里应该是判断技能是否达到可以显示状态 目前为了方便测试写的<=应该是写>=
            if (Model.PlayerLocalService.PlayerData.dy.level >= _data.st.openLevel) {
                if (_data.dy && _data.dy.cdTime == 0 && _data.dy.level >= 1) {
                    this.currentState = "enabled";
                    this.touchEnabled = true;
                }
                else if (this.currentState != "disabled" && this.currentState != "during" && _data.dy && _data.dy.cdTime != 0) {
                    this.initSkillCD(_data);
                }
            }
            else {
                this.currentState = "locked";
                this.touchEnabled = false;
            }
            this.skillIcon.source = _data.st.icon;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.usingSkill, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                Model.AudioService.Shared().PlaySound("YX-001_mp3");
            }, this);
        };
        /**
         * @初始化技能cd
         * @by cai_haotian 2016.3.7.
         */
        BtnActiveSkillVM.prototype.initSkillCD = function (_data) {
            var _this = this;
            this.counterCD.text = Model.PlayerSkillLocalService.timeDes(_data.dy.cdTime);
            if (_data.dy && _data.dy.cdTime > 0) {
                //进来先判断是否在cd状态
                this.currentState = "disabled";
                this.cd = egret.setInterval(function () {
                    _this.counterCD.text = Model.PlayerSkillLocalService.timeDes(--_data.dy.cdTime);
                    if (_data.dy.cdTime == 0) {
                        _this.currentState = "enabled";
                        egret.clearInterval(_this.cd);
                    }
                }, this, 1000);
            }
        };
        /**
         * @使用技能
         * @by cai_haotian 2016.3.2.
         */
        BtnActiveSkillVM.prototype.usingSkill = function () {
            if (this.onCallBack) {
                this.onCallBack(this.skillData, this);
            }
        };
        return BtnActiveSkillVM;
    }(eui.Button));
    ViewModel.BtnActiveSkillVM = BtnActiveSkillVM;
    __reflect(BtnActiveSkillVM.prototype, "ViewModel.BtnActiveSkillVM");
})(ViewModel || (ViewModel = {}));
//# sourceMappingURL=BtnActiveSkillVM.js.map