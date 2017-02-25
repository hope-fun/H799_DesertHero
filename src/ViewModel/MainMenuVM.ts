module ViewModel {
	/**
	 * @author: zhu_jun.
	 * @date: 2015.12.25.
	 */
    export class MainMenuVM extends eui.Component {
    	/**
    	 * @舞台父节点.
    	 */
        private uiLayer: eui.UILayer;
        /**
         * @回调方法.
         */
        private onCallBack: Function;
        /**
         * @当前page.
         */
        public currentPage: PageName;
        /**
         * @列表弹窗父节点.
         */
        public menuPopupGroup: eui.Group;
        /**
         * @下方共用弹窗控件.
         */
        public menuPopup: MenuPopupVM;
        /**
         * @主页顶部按钮控件.
         */
        private btnTop: BtnTopVM;
        /**
         * @主页面底部按钮控件.
         */
        public btnBottom: BtnBottomVM;
        /**
         * @玩家主要信息控件.
         */
        public mainInfo: MainInfoVM;
        /**
         * @底部按钮组.
         * @by cai_haotian 2016.3.28.
         * @by zhu_jun 2017.02.19.
         */
        public btnBottomGroup: Array<BtnBottomItemVM>;

        public constructor(_uiLayer?: eui.UILayer, _onCallBack?: Function, pageName?: PageName) {
            super();
            this.skinName = View.MainMenuView;
            this.uiLayer = _uiLayer;
            this.onCallBack = _onCallBack;
            this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
            this.uiLayer.addChildAt(this, 1);
            if (Model.WebServiceBase.isDebug) console.log("zhujun: add main menu vm to ui layer !　");

        }

        private onComplete(): void {
            if (Model.WebServiceBase.isDebug) {
                console.log("onComplete");
            }
        }

        protected createChildren() {
            super.createChildren();
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.initMenuPopup();
            this.initBtnTop();
            this.initBtnBottomEvent();
            this.initBtnBottomGroupUI();
        }

        /**
         * @主页面顶部按钮事件初始化.
         */
        private initBtnTop() {
            this.btnTop.btnSetting.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                new ViewModel.SettingsVM(Main.singleton, () => { });
            }, this);
            this.btnTop.btnAchievement.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                new ViewModel.AchievementVM(Main.singleton, () => { });
            }, this);
        }

        /**
         * @初始化菜单弹窗.
         */
        private initMenuPopup() {
            this.menuPopupGroup.visible = false;
        }

        /**
         * @主页底部按钮事件初始化.
         */
        private initBtnBottomEvent() {
            this.btnBottom.btnSkill.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                Model.WebService.commitData(Model.WebValue.dataDyModel, () => {
                    if (Model.WebServiceBase.isDebug) {
                        console.log("cai_haotian: commitAuto success ! " + JSON.stringify(Model.WebValue.dataDyModel));
                    }
                }, () => {
                    if (Model.WebValue.isTraditional) {
                        alert("數據提交失敗請聯繫管理員！！！！");
                    } else {
                        alert("数据提交失败请联系管理员！！！！");
                    }
                });
                this.menuPopupGroup.visible = false;
                this.currentPage = PageName.MainInfo;
            }, this);

            this.btnBottom.btnProtagonist.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.menuPopupGroup.visible = true;
                this.menuPopup.setPData();
                this.currentPage = PageName.Player;
            }, this);
            this.btnBottom.btnBosomFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.menuPopupGroup.visible = true;
                this.menuPopup.setBFData();
                this.currentPage = PageName.Friend;
            }, this);
            this.btnBottom.btnArtifact.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.menuPopupGroup.visible = true;
                this.menuPopup.setAData();
                this.currentPage = PageName.MagicWeapon;
            }, this);
            this.btnBottom.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.menuPopupGroup.visible = true;
                this.menuPopup.setMData();
                this.currentPage = PageName.Mall;
            }, this);
        }

        /**
         * @初始化按钮组
         * @by cai_haotian 2016.3.28
         * @by zhu_jun,2017.02.19.
         */
        private initBtnBottomGroupUI() {//this.btnBottom.btnSkill是eui.Button.
            this.btnBottomGroup = [this.btnBottom.btnProtagonist, this.btnBottom.btnBosomFriend, this.btnBottom.btnArtifact, this.btnBottom.btnMall];
            this.btnBottom.btnSkill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnBottom.btnProtagonist.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnBottom.btnBosomFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnBottom.btnArtifact.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnBottom.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnBottomChange, this);
            this.btnBottom.btnSkill.currentState = "down";//设置当前按钮状态.
            //关闭newMark
            this.btnBottom.btnProtagonist.btnNewMark.visible = false;
            this.btnBottom.btnBosomFriend.btnNewMark.visible = false;
            this.btnBottom.btnArtifact.btnNewMark.visible = false;
            this.btnBottom.btnMall.btnNewMark.visible = false;
        }



        /**
         * @根据点击转换按钮状态
         * @by cai_haotian 2016.3.28
         * @by zhu_jun,2017.02.19.
         */
        public btnBottomChange(evt?: egret.Event) {//this.btnBottom.btnSkill是eui.Button.
            if(evt.target == this.btnBottom.btnSkill){
                this.btnBottom.btnSkill.currentState = "down";
                this.btnBottom.btnSkill.enabled = false;
            }else{
                this.btnBottom.btnSkill.currentState = "up";
                this.btnBottom.btnSkill.enabled = true;
            }
            for (var i = 0; i < this.btnBottomGroup.length; i++) {
                if (evt.target == this.btnBottomGroup[i]) {
                    this.btnBottomGroup[i].currentState = "down";
                    this.btnBottomGroup[i].enabled = false;
                    this.btnBottomGroup[i].btnWordImage.source = this.btnBottomGroup[i].btnWordSourceDown;
                } else {
                    this.btnBottomGroup[i].currentState = "up";
                    this.btnBottomGroup[i].enabled = true;
                    this.btnBottomGroup[i].btnWordImage.source = this.btnBottomGroup[i].btnWordSource;
                }
            }
        }

        /**
         * @刷新界面.
         */
        public refreshMenu() {
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
        }

    }
}
