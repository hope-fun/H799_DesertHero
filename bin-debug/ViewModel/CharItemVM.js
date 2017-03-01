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
    var CharItemVM = (function (_super) {
        __extends(CharItemVM, _super);
        function CharItemVM(_uiGroup, _onCallback) {
            var _this = _super.call(this) || this;
            /**
             *@判断是否五次从而显示+10 +100
             */
            _this.flag = 1;
            /**
             * @10连按钮关闭时间
             */
            _this.tenBtn = null;
            /**
             * @100连关闭时间
             */
            _this.hundredBtn = null;
            _this.effectDiskJson = "dipan_json";
            _this.effectDiskPng = "dipan_png";
            _this.effectDisk = "dipan";
            _this.skinName = View.CharItem;
            _this.uiGroup = _uiGroup;
            _this.onCallback = _onCallback;
            _this.uiGroup.addChild(_this);
            return _this;
        }
        CharItemVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.levelUpAnimel();
        };
        /***************************设置三个模块的信息*************************/
        /**
         * @设置主角信息
         */
        CharItemVM.prototype.setPData = function (_data) {
            if (!_data || !_data.st) {
                alert("主角数据错误，请重新加载 ! ");
                return;
            }
            this.pData = _data;
            this.friendGroup.visible = false;
            this.bgImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createCharPop, this);
            this.levelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayerEvent, this);
            this.levelBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerBtnTenUp, this);
            this.levelBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerBtnHundredUp, this);
            if (_data.dy) {
                if (Model.WebValue.isTraditional) {
                    this.skillName.text = _data.dy.nickName ? _data.dy.nickName : "新用戶";
                    this.skillDes.text = String("點擊傷害： " + _data.ClickDamageAndUnit);
                }
                else {
                    this.skillName.text = _data.dy.nickName ? _data.dy.nickName : "新用户";
                    this.skillDes.text = String("点击伤害： " + _data.ClickDamageAndUnit);
                }
                this.skillLevel.text = _data.dy.level.toString();
                this.skillIcon.source = _data.st.leadHead;
                var isEnough = Model.PlayerLocalService.PlayerData.dy.gold > _data.upgradeCost;
                this.levelBtn.setPUpgrade(_data.UpgradeCostAndUnit, _data.ClickDamageDeltaUnit, isEnough);
                this.levelBtn0.setCharIcon(10, this.pData.TenUpgradeCostAndUnit); //设置+10显示价格 by cai_haotian 2016.3.8
                this.levelBtn1.setCharIcon(100, this.pData.HundredUpgradeCostAndUnit); //设置+100显示价格 by cai_haotian 2016.3.8
            }
            else {
                alert("主角动态数据错误，请重新加载 ! ");
            }
        };
        /**
         * @设置主角技能item.
         */
        CharItemVM.prototype.setPSData = function (_data) {
            if (!_data || !_data.st) {
                alert("主角技能数据错误，请重新加载 ! ");
                return;
            }
            this.pSData = _data;
            this.friendGroup.visible = false;
            this.bgImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createCharPop, this);
            this.levelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayerSkillEvent, this);
            this.levelBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerSkillBtnTenUp, this); //by cai_haotian 十连升事件
            this.levelBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerSkillBtnHundredUp, this); //by cai_haotian 百连升事件
            this.skillName.text = _data.st.name;
            if (_data.dy) {
                this.skillLevel.text = _data.dy.level.toString();
                this.skillDes.text = _data.Description;
                this.skillIcon.source = _data.st.icon;
                var isEnough = Model.PlayerLocalService.PlayerData.dy.gold > _data.cost;
                this.levelBtn.setPSUnlock(_data.CostAndUnit, _data.effectDelta.toString(), isEnough);
                if (_data.dy.level > 0) {
                    this.levelBtn0.setCharIcon(10, _data.TenUpgradeCostAndUnit); //设置+10显示价格 by cai_haotian 2016.3.8
                }
            }
            else {
                this.skillLevel.text = "0";
                this.skillDes.text = _data.Description;
                this.skillIcon.source = _data.st.icon;
                this.levelBtn.setPSLock(_data.CostAndUnit, _data.st.openLevel);
            }
        };
        /**
         * @设置挚友技能item.
         * @
         */
        CharItemVM.prototype.setBFData = function (_data) {
            if (!_data || !_data.st) {
                alert("数据错误，请重新加载 ! ");
                return;
            }
            //            if(_data.Type==Model.FriendType.FRIEND_TYPE_SKILL){
            //                this.bgImage.source ="bg_huadongtiao2";
            //            }
            this.newSkill.visible = false;
            this.fData = _data;
            this.skillName.text = _data.st.name;
            this.friendDps.visible = true;
            this.skillIcon.source = _data.Icon;
            this.levelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyFEvent, this);
            this.levelBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.friendBtnTenUp, this);
            this.levelBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.friendBtnHundredUp, this);
            this.bgImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createFriendPop, this);
            this.layerBgImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createFriendPop, this);
            this.dead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.friendDead, this);
            if (_data && _data.st && _data.dy) {
                if (_data.dy.sealCD != 0) {
                    this.dead.visible = true;
                }
                else {
                    this.dead.visible = false;
                }
                for (var i = 0; i < _data.dy.layerId; i++) {
                    this.layerGroup.getChildAt(i).visible = true;
                }
                this.levelBtn0.setFriendIcon(10, this.fData.TenUpgradeCostAndUnit); //by cai_haotian 2016.3.9
                this.levelBtn1.setFriendIcon(100, this.fData.hundredUpgradeCostAndUnit); //by cai_haotian 2016.3.9
                this.skillLevel.text = _data.dy.level.toString();
                if (Model.WebValue.isTraditional) {
                    this.friendDps.text = String("秒傷:" + _data.DpsAndUnit);
                }
                else {
                    this.friendDps.text = String("秒伤:" + _data.DpsAndUnit);
                }
                if (_data.dy.layerId < _data.layerMatchLevel) {
                    this.layerBgImage.visible = true; //by cai_haotian 2016.3.10. 显示层级背景
                    this.levelBtn.setFUpgrade(_data.LayerCostAndUnit, _data.DpsDeltaUnit, Model.PlayerLocalService.PlayerData.dy.gold > _data.layerCost, _data.LayerStr);
                }
                else {
                    this.layerBgImage.visible = false; //by cai_haotian 2016.3.10. 隐藏层级背景
                    this.levelBtn.setFUpgrade(_data.UpgradeCostAndUnit, _data.DpsDeltaUnit, Model.PlayerLocalService.PlayerData.dy.gold > _data.upgradeCost);
                }
            }
            else {
                if (_data.reachRecruit) {
                    this.recruitGroup.visible = false;
                    this.visible = true;
                    this.includeInLayout = true;
                    this.skillLevel.text = "0"; //未解锁等级统一为0.
                    if (Model.WebValue.isTraditional) {
                        this.friendDps.text = "未解鎖";
                    }
                    else {
                        this.friendDps.text = "未解锁";
                    }
                    this.levelBtn.visible = true;
                    this.newSkill.visible = true;
                    //by cai_haotian 元宝解锁的不管够不够都能点 
                    if (_data.RecruitMoneyType == Model.MoneyType.MONEY_TYPE_YB) {
                        this.levelBtn.setFLock(_data.RecruitMoneyType, _data.RecruitCostAndUnit, _data.DpsAndUnit, true);
                    }
                    else {
                        this.levelBtn.setFLock(_data.RecruitMoneyType, _data.RecruitCostAndUnit, _data.DpsAndUnit, _data.IsEnoughRecruit);
                    }
                }
                else {
                    this.visible = _data.isShow;
                    this.includeInLayout = _data.isShow;
                    if (_data.isShow) {
                        this.recruitGroup.visible = true;
                        if (Model.WebValue.isTraditional) {
                            this.recruitDemand.text = "招募條件：  " + _data.RecruitDemand;
                        }
                        else {
                            this.recruitDemand.text = "招募条件：  " + _data.RecruitDemand;
                        }
                        this.levelBtn.visible = false;
                    }
                }
            }
        };
        /***************************二级菜单*************************/
        /**
         * @挚友二级菜单
         */
        CharItemVM.prototype.createFriendPop = function () {
            if (this.onCallback) {
                var item = new ViewModel.CharDetailMsgVM(Main.singleton, function () { });
                item.initFData(this.fData);
            }
        };
        /**
         * @主角二级菜单
         */
        CharItemVM.prototype.createCharPop = function () {
            if (this.onCallback) {
                var item = new ViewModel.CharDetailMsgVM(Main.singleton, function () { });
                item.initPData();
            }
        };
        /***************************按钮绑定事件*************************/
        /**
         * @主角个人回调函数
         * @单次升级
         */
        CharItemVM.prototype.onPlayerEvent = function () {
            if (this.onCallback) {
                this.onCallback(this.pData, 1);
                this.playerShowBtn();
            }
        };
        /**
         * @十连主角升按钮事件.
         * @by cai_haotian 2016.3.14.
         */
        CharItemVM.prototype.playerBtnTenUp = function () {
            //            Model.Tools.repeatedExecute(this.onBuyFEvent,10);
            if (this.onCallback) {
                this.onCallback(this.pData, 10);
                this.playerShowBtn(true);
            }
        };
        /**
         * @百连主角升按钮事件.
         * @by cai_haotian 2016.3.14.
         */
        CharItemVM.prototype.playerBtnHundredUp = function () {
            //            Model.Tools.repeatedExecute(this.onBuyFEvent,100);
            if (this.onCallback) {
                this.onCallback(this.pData, 100);
                this.playerShowBtn(true);
            }
        };
        /**
         * @判断主角+10 +100是否出现
         */
        CharItemVM.prototype.playerShowBtn = function (_case) {
            if (_case === void 0) { _case = false; }
            if (isFinite(this.pData.tenUpgradeCost) && isFinite(this.pData.hundredUpgradeCost)) {
                if (_case) {
                    if (this.tenBtn != null) {
                        egret.clearTimeout(this.tenBtn);
                        this.tenBtn = null;
                    }
                    if (this.hundredBtn != null) {
                        egret.clearTimeout(this.hundredBtn);
                        this.hundredBtn = null;
                    }
                    var tenClose = Model.PlayerLocalService.PlayerData.dy.gold <= this.pData.tenUpgradeCost;
                    var hundredClose = Model.PlayerLocalService.PlayerData.dy.gold <= this.pData.hundredUpgradeCost;
                    this.setBtnClose(tenClose, hundredClose);
                }
                else {
                    this.flag++;
                    if (this.flag == 5) {
                        var tenFlag = Model.PlayerLocalService.PlayerData.dy.gold > this.pData.tenUpgradeCost;
                        var hundredFlag = Model.PlayerLocalService.PlayerData.dy.gold > this.pData.hundredUpgradeCost;
                        this.setBtnShow(tenFlag, hundredFlag);
                        this.flag = 0;
                    }
                    else {
                        var tenClose = Model.PlayerLocalService.PlayerData.dy.gold <= this.pData.tenUpgradeCost;
                        var hundredClose = Model.PlayerLocalService.PlayerData.dy.gold <= this.pData.hundredUpgradeCost;
                        this.setBtnClose(tenClose, hundredClose);
                    }
                }
            }
            else {
                this.levelBtn0.visible = false;
                this.levelBtn1.visible = false;
            }
            this.levelUpCharAnimel();
        };
        /**
         * @主角技能回调函数
         */
        CharItemVM.prototype.onPlayerSkillEvent = function () {
            if (this.onCallback) {
                this.onCallback(this.pSData, 1);
            }
        };
        /**
         * @十连主角技能升按钮事件.
         * @by cai_haotian 2016.2.25.
         */
        CharItemVM.prototype.playerSkillBtnTenUp = function () {
            if (this.onCallback) {
                this.onCallback(this.pSData, 10);
            }
        };
        /**
         * @百连主角技能升按钮事件.
         * @by cai_haotian 2016.2.25.
         */
        CharItemVM.prototype.playerSkillBtnHundredUp = function () {
            if (this.onCallback) {
                this.onCallback(this.pSData, 100);
            }
        };
        /**
         * @挚友回调事件.
         */
        CharItemVM.prototype.onBuyFEvent = function () {
            if (this.onCallback) {
                //小伙伴显示 by cai_haotian 2016.2.22    
                this.onCallback(this.fData, 1);
                if (this.fData.dy) {
                    this.friendShowBtn();
                }
            }
        };
        /**
         * @十连挚友升按钮事件.
         * @by cai_haotian 2016.2.25.
         */
        CharItemVM.prototype.friendBtnTenUp = function () {
            if (this.onCallback) {
                //小伙伴显示 by cai_haotian 2016.2.22    
                this.onCallback(this.fData, 10);
                if (this.fData.dy) {
                    this.friendShowBtn(true);
                }
            }
        };
        /**
         * @百连挚友升按钮事件.
         * @by cai_haotian 2016.2.25.
         */
        CharItemVM.prototype.friendBtnHundredUp = function () {
            //小伙伴显示 by cai_haotian 2016.2.22    
            this.onCallback(this.fData, 100);
            if (this.fData.dy) {
                this.friendShowBtn(true);
            }
        };
        /**
         * @挚友死亡按钮回调事件
         * @by cai_haotian 2016.4.18.
         */
        CharItemVM.prototype.friendDead = function () {
            this.onCallback(this.fData, 1);
        };
        /**
         * @挚友升级特效以及+10 +100判断显示
         * @by cai_haotian 2016.3.14
         */
        CharItemVM.prototype.friendShowBtn = function (_case) {
            if (_case === void 0) { _case = false; }
            this.playlevelUpAnieml();
            //做容错 +10 +100很可能提前跳成infinite
            if (isFinite(this.fData.tenUpgradeCost) && isFinite(this.fData.hundredUpgradeCost)) {
                if (_case) {
                    if (this.tenBtn != null) {
                        egret.clearTimeout(this.tenBtn);
                        this.tenBtn = null;
                    }
                    if (this.hundredBtn != null) {
                        egret.clearTimeout(this.hundredBtn);
                        this.hundredBtn = null;
                    }
                    var tenClose = Model.PlayerLocalService.PlayerData.dy.gold <= this.fData.tenUpgradeCost;
                    var hundredClose = Model.PlayerLocalService.PlayerData.dy.gold <= this.fData.hundredUpgradeCost;
                    this.setBtnClose(tenClose, hundredClose);
                }
                else {
                    this.flag++;
                    if (this.flag == 5) {
                        //10连升
                        var tenFlag = Model.PlayerLocalService.PlayerData.dy.gold > this.fData.tenUpgradeCost;
                        var hundredFlag = Model.PlayerLocalService.PlayerData.dy.gold > this.fData.hundredUpgradeCost;
                        this.setBtnShow(tenFlag, hundredFlag);
                        this.flag = 0;
                    }
                    else {
                        var tenClose = Model.PlayerLocalService.PlayerData.dy.gold <= this.fData.tenUpgradeCost;
                        var hundredClose = Model.PlayerLocalService.PlayerData.dy.gold <= this.fData.hundredUpgradeCost;
                        this.setBtnClose(tenClose, hundredClose);
                    }
                }
            }
            else {
                this.levelBtn0.visible = false;
                this.levelBtn1.visible = false;
            }
        };
        /**
         * @设置按钮显示
         */
        CharItemVM.prototype.setBtnShow = function (_tenBtn, _hundredBtn) {
            var _this = this;
            this.levelBtn0.visible = _tenBtn;
            this.levelBtn1.visible = _hundredBtn;
            this.tenBtn = egret.setTimeout(function () {
                _this.levelBtn0.visible = false;
            }, this, 3000);
            this.hundredBtn = egret.setTimeout(function () {
                _this.levelBtn1.visible = false;
            }, this, 3000);
        };
        /**
         * @连续点击后若不点击定时消失
         */
        CharItemVM.prototype.setBtnClose = function (_tenBtn, _hundredBtn) {
            var _this = this;
            if (_tenBtn) {
                this.levelBtn0.visible = false;
            }
            else {
                this.tenBtn = egret.setTimeout(function () {
                    _this.levelBtn0.visible = false;
                }, this, 3000);
            }
            if (_hundredBtn) {
                this.levelBtn1.visible = false;
            }
            else {
                this.hundredBtn = egret.setTimeout(function () {
                    _this.levelBtn1.visible = false;
                }, this, 3000);
            }
        };
        /***************************特效函数***************************/
        /**
         * @升级特效
         * @by cai_haotian 2016.2.15
         * @by zhu_jun,2017.02.26.
         */
        CharItemVM.prototype.levelUpAnimel = function () {
            this.levelUpDB = new Model.DragonBones(this, "Tx_shengji_02_ske_json", "Tx_shengji_02_tex_json", "Tx_shengji_02_tex_png", "Tx_shengji_02", 47, 36);
            // this.levelUpDB.setActive(false);
        };
        /**
         * @播放item上的升级特效
         * @ by cai_haotian 2016.3.14.
         */
        CharItemVM.prototype.playlevelUpAnieml = function () {
            var _this = this;
            //by cai_haotian 2016.2.15.
            this.levelUpDB.setActive(true);
            this.levelUpDB.play("Tx_shengji_02", 1, function () {
                _this.levelUpDB.setActive(false); //动画完成后隐藏
            });
            if (this.fData.Type == Model.FriendType.FRIEND_TYPE_FRIEND) {
                this.levelUpCharAnimel(this.fData.st.id);
            }
        };
        /**
         * @升级人物特效
         */
        CharItemVM.prototype.levelUpCharAnimel = function (id) {
            if (id === void 0) { id = 0; }
            //光特效
            var light = new Model.MovieClipService(Main.singleton.mainGameVM.levelUpLight);
            var mcLight = light.initMovieClip("guangxian_json", "guangxian_png", "guangxian", 1, function () {
                Main.singleton.mainGameVM.levelUpLight.removeChild(mcLight);
            });
            switch (id) {
                case 0:
                    var groud = new Model.MovieClipService(Main.singleton.mainGameVM.yungeLevelUp);
                    var mc = groud.initMovieClip(this.effectDiskJson, this.effectDiskPng, this.effectDisk, 1, function () {
                        Main.singleton.mainGameVM.yungeLevelUp.removeChild(mc);
                    });
                    mc.x = 268;
                    mc.y = 415;
                    mcLight.x = 269;
                    mcLight.y = 413.45;
                    break;
                case 1:
                    var groud = new Model.MovieClipService(Main.singleton.mainGameVM.baiheLevelUp);
                    var mc = groud.initMovieClip(this.effectDiskJson, this.effectDiskPng, this.effectDisk, 1, function () {
                        Main.singleton.mainGameVM.baiheLevelUp.removeChild(mc);
                    });
                    mc.x = 190;
                    mc.y = 465;
                    mcLight.x = 191;
                    mcLight.y = 463.45;
                    break;
                case 7:
                    var groud = new Model.MovieClipService(Main.singleton.mainGameVM.bingyiLevelUp);
                    var mc = groud.initMovieClip(this.effectDiskJson, this.effectDiskPng, this.effectDisk, 1, function () {
                        Main.singleton.mainGameVM.bingyiLevelUp.removeChild(mc);
                    });
                    mc.x = 91;
                    mc.y = 503;
                    mcLight.x = 92;
                    mcLight.y = 501.45;
                    break;
                case 13:
                    var groud = new Model.MovieClipService(Main.singleton.mainGameVM.xupingjunLevelUp);
                    var mc = groud.initMovieClip(this.effectDiskJson, this.effectDiskPng, this.effectDisk, 1, function () {
                        Main.singleton.mainGameVM.xupingjunLevelUp.removeChild(mc);
                    });
                    mc.x = 201;
                    mc.y = 352;
                    mcLight.x = 202;
                    mcLight.y = 350.45;
                    break;
                case 19:
                    var groud = new Model.MovieClipService(Main.singleton.mainGameVM.mengjueLevelUp);
                    var mc = groud.initMovieClip(this.effectDiskJson, this.effectDiskPng, this.effectDisk, 1, function () {
                        Main.singleton.mainGameVM.mengjueLevelUp.removeChild(mc);
                    });
                    mc.x = 96;
                    mc.y = 310;
                    mcLight.x = 97;
                    mcLight.y = 308.45;
                    break;
                case 25:
                    var groud = new Model.MovieClipService(Main.singleton.mainGameVM.liufulingLevelUp);
                    var mc = groud.initMovieClip(this.effectDiskJson, this.effectDiskPng, this.effectDisk, 1, function () {
                        Main.singleton.mainGameVM.liufulingLevelUp.removeChild(mc);
                    });
                    mc.x = 78;
                    mc.y = 397;
                    mcLight.x = 79;
                    mcLight.y = 395.45;
                    break;
                default: alert("升级特效出错！请联系管理员！");
            }
        };
        return CharItemVM;
    }(eui.Component));
    ViewModel.CharItemVM = CharItemVM;
    __reflect(CharItemVM.prototype, "ViewModel.CharItemVM");
})(ViewModel || (ViewModel = {}));
