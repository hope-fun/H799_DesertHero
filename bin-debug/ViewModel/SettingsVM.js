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
    var SettingsVM = (function (_super) {
        __extends(SettingsVM, _super);
        function SettingsVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            if (Model.WebValue.is9G) {
                _this.skinName = View.SettingsView_9G;
            }
            else {
                _this.skinName = View.SettingsView;
            }
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChild(_this);
            return _this;
        }
        SettingsVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initWindow();
        };
        /**
         * @初始化窗口
         * @by cai_haotian 2016.3.10
         */
        SettingsVM.prototype.initWindow = function () {
            var _this = this;
            egret.Tween.get(this.maskBlackSettings).to({ alpha: 0.7 }, 700, egret.Ease.circIn);
            egret.Tween.get(this.window).to({ y: 0 }, 700, egret.Ease.backOut);
            this.LGCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                egret.Tween.get(_this.maskBlackSettings).to({ alpha: 0 }, 700, egret.Ease.circIn);
                egret.Tween.get(_this.window).to({ y: -550 }, 700, egret.Ease.backIn).call(function () {
                    _this.uiLayer.removeChild(_this);
                });
            }, this);
            this.music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.BGMBtn, this);
            this.sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.soundEffectBtn, this);
            this.personalMsg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.personalInfo, this);
            this.updateButtonState();
        };
        /**
         * @音效开关
         * @by cai_haotian 2016.3.10
         */
        SettingsVM.prototype.soundEffectBtn = function () {
            Model.AudioService.Shared().IsSound = !Model.AudioService.Shared().IsSound;
            this.updateButtonState();
        };
        /**
         * @背景音乐开关
         * @by cai_haotian 2016.3.10.
         */
        SettingsVM.prototype.BGMBtn = function () {
            Model.AudioService.Shared().IsMusic = !Model.AudioService.Shared().IsMusic;
            this.updateButtonState();
        };
        /**
         * @根据音乐是否播放实现按钮状态
         * @by cai_haotian 2016.3.18.
         */
        SettingsVM.prototype.updateButtonState = function () {
            this.music.currentState = Model.AudioService.Shared().IsMusic ? "up" : "down";
            this.sound.currentState = Model.AudioService.Shared().IsSound ? "up" : "down";
        };
        /**
         * @个人信息
         * @by cai_haotian 2016.3.18
         */
        SettingsVM.prototype.personalInfo = function () {
            new ViewModel.PersonalMsgVM(this.uiLayer, function () {
            });
        };
        return SettingsVM;
    }(eui.Component));
    ViewModel.SettingsVM = SettingsVM;
    __reflect(SettingsVM.prototype, "ViewModel.SettingsVM");
})(ViewModel || (ViewModel = {}));
