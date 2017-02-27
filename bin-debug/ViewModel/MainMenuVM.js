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
            this.initMenuPopup();
            this.initBtnTop();
            this.initBtnBottomEvent();
            this.initBtnBottomGroupUI();
            Model.WebValue.menuEventConfig.bossBtn["bottomEvent"]();
        };
        MainMenuVM.prototype.initKeyMenuEvent = function () {
        };
        /**
         * @初始化键盘菜单事件.
         */
        MainMenuVM.prototype.updateKeyMenuEvent = function (_areaId, _btnId) {
            if (_areaId === void 0) { _areaId = null; }
            if (_btnId === void 0) { _btnId = null; }
            var areaId = _areaId == null ? Model.WebValue.menuAreaStatus.areaId : _areaId;
            var btnId = _btnId == null ? Model.WebValue.menuAreaStatus.btnId : _btnId;
            // if(_areaId == Model.MenuAreaType.BottomChild)
            switch (areaId) {
                case Model.MenuAreaType.TopLeft:
                    //这个里面再判断btnId.看当前光标在哪个按钮上,就赋值哪个方法.
                    if (Model.WebValue.menuAreaStatus.btnId == 1) {
                        Model.KeyEventTool.onDirectionDown = function () {
                            console.log("这个是TopLeft区域，第1个按钮的方法!");
                        };
                    }
                    break;
                case Model.MenuAreaType.TopRight:
                    break;
                case Model.MenuAreaType.GeneralMain:
                    break;
                case Model.MenuAreaType.GeneralSecond:
                    break;
                case Model.MenuAreaType.GeneralSkill:
                    break;
                case Model.MenuAreaType.MagicWeapon:
                    break;
                case Model.MenuAreaType.Mall:
                    break;
                default:
                    break;
            }
        };
        /**
         * @主页面顶部按钮事件初始化.
         */
        MainMenuVM.prototype.initBtnTop = function () {
            this.btnTop.btnSetting.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                new ViewModel.SettingsVM(Main.singleton, function () { });
            }, this);
            this.btnTop.btnAchievement.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                new ViewModel.AchievementVM(Main.singleton, function () { });
            }, this);
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
            var _this = this;
            this.btnBottom.btnSkill.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
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
            }, this);
            this.btnBottom.btnProtagonist.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setPData();
                _this.currentPage = PageName.Player;
            }, this);
            this.btnBottom.btnBosomFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setBFData();
                _this.currentPage = PageName.Friend;
            }, this);
            this.btnBottom.btnArtifact.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setAData();
                _this.currentPage = PageName.MagicWeapon;
            }, this);
            this.btnBottom.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setMData();
                _this.currentPage = PageName.Mall;
            }, this);
        };
        /**
         * @初始化按钮组
         * @by cai_haotian 2016.3.28
         * @by zhu_jun,2017.02.19.
         */
        MainMenuVM.prototype.initBtnBottomGroupUI = function () {
            this.btnBottomGroup = [this.btnBottom.btnProtagonist, this.btnBottom.btnBosomFriend, this.btnBottom.btnArtifact, this.btnBottom.btnMall];
            this.btnBottom.btnSkill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnBottom.btnProtagonist.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnBottom.btnBosomFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnBottom.btnArtifact.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnBottom.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnBottom.btnSkill.currentState = "down"; //设置当前按钮状态.
            //关闭newMark
            this.btnBottom.btnProtagonist.btnNewMark.visible = false;
            this.btnBottom.btnBosomFriend.btnNewMark.visible = false;
            this.btnBottom.btnArtifact.btnNewMark.visible = false;
            this.btnBottom.btnMall.btnNewMark.visible = false;
        };
        /**
         * @根据点击转换按钮状态
         * @by cai_haotian 2016.3.28
         * @by zhu_jun,2017.02.19.
         */
        MainMenuVM.prototype.btnBottomChange = function (evt) {
            if (evt.target == this.btnBottom.btnSkill) {
                this.btnBottom.btnSkill.currentState = "down";
                this.btnBottom.btnSkill.enabled = false;
            }
            else {
                this.btnBottom.btnSkill.currentState = "up";
                this.btnBottom.btnSkill.enabled = true;
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
