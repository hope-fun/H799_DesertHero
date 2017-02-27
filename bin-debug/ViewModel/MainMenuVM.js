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
     * @author: zhu_jun.
     * @date: 2015.12.25.
     */
    var MainMenuVM = (function (_super) {
        __extends(MainMenuVM, _super);
        function MainMenuVM(_uiLayer, _onCallBack, pageName) {
            var _this = _super.call(this) || this;
            _this.skinName = View.MainMenuView;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
            _this.uiLayer.addChildAt(_this, 1);
            if (Model.WebServiceBase.isDebug)
                console.log("zhujun: add main menu vm to ui layer !　");
            return _this;
        }
        MainMenuVM.prototype.onComplete = function () {
            if (Model.WebServiceBase.isDebug) {
                console.log("onComplete");
            }
        };
        MainMenuVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        MainMenuVM.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initEventList();
            this.initMenuPopup();
            this.initBtnTop();
            this.initBtnBottomEvent();
            this.initBtnBottomGroupUI();
            // this.updateKeyMenuEvent(Model.WebValue.menuEventConfig.bossBtn["rightEvent"]);
        };
        /**
         * @初始化事件列表.
         */
        MainMenuVM.prototype.initEventList = function () {
            var _this = this;
            Model.WebValue.eventList.Set("onSetting", function () { new ViewModel.SettingsVM(_this.uiLayer, null); });
            Model.WebValue.eventList.Set("onAchievement", function () { new ViewModel.AchievementVM(_this.uiLayer, null); });
            Model.WebValue.eventList.Set("onSkill", function () {
                Model.WebService.commitData(Model.WebValue.dataDyModel, function () {
                    if (Model.WebServiceBase.isDebug) {
                        console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                    }
                }, function () {
                    if (Model.WebValue.isTraditional) {
                        alert("數據提交失敗請聯繫管理員！！！！");
                    }
                    else {
                        alert("数据提交失败请联系管理员！！！！");
                    }
                });
                _this.menuPopupGroup.visible = false;
                _this.currentPage = PageName.MainInfo;
            });
            Model.WebValue.eventList.Set("onProtagonist", function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setPData();
                _this.currentPage = PageName.Player;
            });
            Model.WebValue.eventList.Set("onBosomFriend", function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setBFData();
                _this.currentPage = PageName.Friend;
            });
            Model.WebValue.eventList.Set("onArtifact", function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setAData();
                _this.currentPage = PageName.MagicWeapon;
            });
            Model.WebValue.eventList.Set("onMall", function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setMData();
                _this.currentPage = PageName.Mall;
            });
        };
        // private initKeyMenuEvent() {
        // }
        /**
         * @初始化键盘菜单事件.
         * @_btnName:按钮事件的key.
         */
        MainMenuVM.prototype.updateKeyMenuEvent = function (_btnName) {
            //根据方向键取到_btnName.
            Model.KeyEventTool.onOK = Model.WebValue.eventList[_btnName];
        };
        /**
         * @主页面顶部按钮事件初始化.
         */
        MainMenuVM.prototype.initBtnTop = function () {
            this.btnTop.btnSetting.addEventListener(egret.TouchEvent.TOUCH_TAP, Model.WebValue.eventList.Get("onSetting"), this);
            this.btnTop.btnAchievement.addEventListener(egret.TouchEvent.TOUCH_TAP, Model.WebValue.eventList.Get("onAchievement"), this);
        };
        /**
         * @初始化菜单弹窗.
         */
        MainMenuVM.prototype.initMenuPopup = function () {
            this.menuPopupGroup.visible = false;
        };
        /**
         * @主页底部按钮事件初始化.
         */
        MainMenuVM.prototype.initBtnBottomEvent = function () {
            this.btnSkill.addEventListener(egret.TouchEvent.TOUCH_TAP, Model.WebValue.eventList.Get("onSkill"), this);
            this.btnProtagonist.addEventListener(egret.TouchEvent.TOUCH_TAP, Model.WebValue.eventList.Get("onProtagonist"), this);
            this.btnBosomFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, Model.WebValue.eventList.Get("onBosomFriend"), this);
            this.btnArtifact.addEventListener(egret.TouchEvent.TOUCH_TAP, Model.WebValue.eventList.Get("onArtifact"), this);
            this.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP, Model.WebValue.eventList.Get("onMall"), this);
        };
        /**
         * @初始化按钮组
         * @by cai_haotian 2016.3.28
         * @by zhu_jun,2017.02.19.
         * @只有触摸屏时候有效.
         */
        MainMenuVM.prototype.initBtnBottomGroupUI = function () {
            this.btnBottomGroup = [this.btnProtagonist, this.btnBosomFriend, this.btnArtifact, this.btnMall];
            this.btnSkill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnProtagonist.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnBosomFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnArtifact.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnSkill.currentState = "down"; //设置当前按钮状态.
            //关闭newMark
            this.btnProtagonist.btnNewMark.visible = false;
            this.btnBosomFriend.btnNewMark.visible = false;
            this.btnArtifact.btnNewMark.visible = false;
            this.btnMall.btnNewMark.visible = false;
        };
        /**
         * @根据点击转换按钮状态
         * @by cai_haotian 2016.3.28
         * @by zhu_jun,2017.02.19.
         */
        MainMenuVM.prototype.btnBottomChange = function (evt) {
            if (evt.target == this.btnSkill) {
                this.btnSkill.currentState = "down";
                this.btnSkill.enabled = false;
            }
            else {
                this.btnSkill.currentState = "up";
                this.btnSkill.enabled = true;
            }
            for (var i = 0; i < this.btnBottomGroup.length; i++) {
                if (evt.target == this.btnBottomGroup[i]) {
                    this.btnBottomGroup[i].currentState = "down";
                    this.btnBottomGroup[i].enabled = false;
                    this.btnBottomGroup[i].btnWordImage.source = this.btnBottomGroup[i].btnWordSourceDown;
                }
                else {
                    this.btnBottomGroup[i].currentState = "up";
                    this.btnBottomGroup[i].enabled = true;
                    this.btnBottomGroup[i].btnWordImage.source = this.btnBottomGroup[i].btnWordSource;
                }
            }
        };
        /**
         * @刷新界面.
         */
        MainMenuVM.prototype.refreshMenu = function () {
            switch (this.currentPage) {
                case PageName.Player:
                    this.menuPopup.setPData();
                    break;
                case PageName.Friend:
                    this.menuPopup.setBFData();
                    break;
                case PageName.MagicWeapon:
                    this.menuPopup.setAData();
                    break;
                case PageName.Mall:
                    this.menuPopup.setMData();
                    break;
                default:
                    break;
            }
        };
        return MainMenuVM;
    }(eui.Component));
    ViewModel.MainMenuVM = MainMenuVM;
    __reflect(MainMenuVM.prototype, "ViewModel.MainMenuVM");
})(ViewModel || (ViewModel = {}));
