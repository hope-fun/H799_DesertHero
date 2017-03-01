module ViewModel {
    export class CharItemVM extends eui.Component {
        /**
         * @主角技能描述Label
         */
        private skillDes: eui.Label;
        /**
         * @技能图标
         */
        private skillIcon: eui.Image;
        /**
         * @技能名称
         */
        private skillName: eui.Label;
        /**
         * @技能等级
         */
        private skillLevel: eui.Label;
        /**
         * @背景.
         */
        private bgImage: eui.Image;
        /**
         * @挚友相关Group.
         */
        private friendGroup: eui.Group;
        /**
         * @层级group.
         */
        private layerGroup: eui.Group;
        /**
         * @招募条件相关group
         */
        private recruitGroup: eui.Group;
        /**
         * @招募条件
         */
        private recruitDemand: eui.Label;
        /**
         * @未解锁: 未招募
         * @已解锁: 秒伤.
         */
        private friendDps: eui.Label;
        /**
         * @技能升级单位(元宝 金币)
         */
        private costIcon: eui.Image;
        /**
         * @技能升级钱
         */
        private costNum: eui.Label;

        /**
         * @技能小伙伴死亡遮罩层 默认隐藏
         */
        private dead: eui.Group;

        /**
         * @层级匹配背景层
         */
        private layerBgImage: eui.Image

        /**
         * @技能按钮1
         */
        private levelBtn: ViewModel.BtnShareVM;
        /**
         * @技能按钮2
         */
        private levelBtn0: ViewModel.BtnSmallShareVM;
        /**
         * @技能按钮3
         */
        private levelBtn1: ViewModel.BtnSmallShareVM;
        /**
         * @新技能标示
         */
        private newSkill: eui.Image;
        /**
        * @上级父节点
        */
        public uiGroup: eui.Group;
        /**   
         * @回调函数
         */
        public onCallback: Function;
        /**
         * @主角个人信息.
         */
        private pData: Model.PlayerData;
        /**
         * @主角技能数据
         */
        private pSData: Model.PlayerSkillData;
        /**
         * @挚友数据.
         */
        public fData: Model.FriendData;
        /**
         * @升级技能的特效
         */
        private levelUpDB: Model.DragonBones;
        /**
         *@判断是否五次从而显示+10 +100
         */
        private flag: number = 1;
        /**
         * @10连按钮关闭时间
         */
        private tenBtn: number = null;
        /**
         * @100连关闭时间
         */
        private hundredBtn: number = null;

        public constructor(_uiGroup: eui.Group, _onCallback?: Function) {
            super();
            this.skinName = View.CharItem;
            this.uiGroup = _uiGroup;
            this.onCallback = _onCallback;
            this.uiGroup.addChild(this);
        }

        protected createChildren() {
            super.createChildren();
            this.levelUpAnimel();
        }
        /***************************设置三个模块的信息*************************/
        /**
         * @设置主角信息
         */
        public setPData(_data: Model.PlayerData) {
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
            if (_data.dy) {//主角肯定是激活状态,有空则是数据异常.
                if (Model.WebValue.isTraditional) {
                    this.skillName.text = _data.dy.nickName ? _data.dy.nickName : "新用戶";
                    this.skillDes.text = String("點擊傷害： " + _data.ClickDamageAndUnit);
                } else {
                    this.skillName.text = _data.dy.nickName ? _data.dy.nickName : "新用户";
                    this.skillDes.text = String("点击伤害： " + _data.ClickDamageAndUnit);
                }


                this.skillLevel.text = _data.dy.level.toString();
                this.skillIcon.source = _data.st.leadHead;
                var isEnough: boolean = Model.PlayerLocalService.PlayerData.dy.gold > _data.upgradeCost;
                this.levelBtn.setPUpgrade(_data.UpgradeCostAndUnit, _data.ClickDamageDeltaUnit, isEnough);
                this.levelBtn0.setCharIcon(10, this.pData.TenUpgradeCostAndUnit)//设置+10显示价格 by cai_haotian 2016.3.8
                this.levelBtn1.setCharIcon(100, this.pData.HundredUpgradeCostAndUnit)//设置+100显示价格 by cai_haotian 2016.3.8
            } else {//主角动态数据不可能没有!
                alert("主角动态数据错误，请重新加载 ! ");
            }
        }

        /**
         * @设置主角技能item.
         */
        public setPSData(_data: Model.PlayerSkillData) {
            if (!_data || !_data.st) {
                alert("主角技能数据错误，请重新加载 ! ");
                return;
            }
            this.pSData = _data;
            this.friendGroup.visible = false;
            this.bgImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createCharPop, this);
            this.levelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayerSkillEvent, this);
            this.levelBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerSkillBtnTenUp, this);//by cai_haotian 十连升事件
            this.levelBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerSkillBtnHundredUp, this);//by cai_haotian 百连升事件
            this.skillName.text = _data.st.name;
            if (_data.dy) {//dy非null则说明已经解锁.
                this.skillLevel.text = _data.dy.level.toString();
                this.skillDes.text = _data.Description;
                this.skillIcon.source = _data.st.icon;
                var isEnough: boolean = Model.PlayerLocalService.PlayerData.dy.gold > _data.cost;
                this.levelBtn.setPSUnlock(_data.CostAndUnit, _data.effectDelta.toString(), isEnough);
                if (_data.dy.level > 0) {
                    this.levelBtn0.setCharIcon(10, _data.TenUpgradeCostAndUnit)//设置+10显示价格 by cai_haotian 2016.3.8
                    //                this.levelBtn1.setCharIcon(100,_data.HundredUpgradeCostAndUnit)//设置+100显示价格 by cai_haotian 2016.3.8
                }
            } else {//主角技能未解锁,则显示一级时候的属性.
                this.skillLevel.text = "0";
                this.skillDes.text = _data.Description;
                this.skillIcon.source = _data.st.icon;
                this.levelBtn.setPSLock(_data.CostAndUnit, _data.st.openLevel);
            }
        }

        /**
         * @设置挚友技能item.
         * @
         */
        public setBFData(_data: Model.FriendData): boolean {
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
            if (_data && _data.st && _data.dy) {//dy非null则说明已经解锁.(已招募)

                if (_data.dy.sealCD != 0) {
                    this.dead.visible = true;
                } else {
                    this.dead.visible = false;
                }

                for (var i = 0; i < _data.dy.layerId; i++) {
                    this.layerGroup.getChildAt(i).visible = true;
                }
                this.levelBtn0.setFriendIcon(10, this.fData.TenUpgradeCostAndUnit)//by cai_haotian 2016.3.9
                this.levelBtn1.setFriendIcon(100, this.fData.hundredUpgradeCostAndUnit)//by cai_haotian 2016.3.9
                this.skillLevel.text = _data.dy.level.toString();

                if (Model.WebValue.isTraditional) {
                    this.friendDps.text = String("秒傷:" + _data.DpsAndUnit);
                } else {
                    this.friendDps.text = String("秒伤:" + _data.DpsAndUnit);
                }


                if (_data.dy.layerId < _data.layerMatchLevel) {//当前可解锁层级大于当前已经解锁层级，显示层级解锁按钮.
                    this.layerBgImage.visible = true;//by cai_haotian 2016.3.10. 显示层级背景
                    this.levelBtn.setFUpgrade(_data.LayerCostAndUnit, _data.DpsDeltaUnit, Model.PlayerLocalService.PlayerData.dy.gold > _data.layerCost, _data.LayerStr);
                } else {
                    this.layerBgImage.visible = false;//by cai_haotian 2016.3.10. 隐藏层级背景
                    this.levelBtn.setFUpgrade(_data.UpgradeCostAndUnit, _data.DpsDeltaUnit, Model.PlayerLocalService.PlayerData.dy.gold > _data.upgradeCost);
                }





            } else {//主角技能未解锁,则显示一级时候的属性.(未招募)
                if (_data.reachRecruit) {
                    this.recruitGroup.visible = false;
                    this.visible = true;
                    this.includeInLayout = true;
                    this.skillLevel.text = "0";//未解锁等级统一为0.

                    if (Model.WebValue.isTraditional) {
                        this.friendDps.text = "未解鎖";
                    } else {
                        this.friendDps.text = "未解锁";
                    }


                    this.levelBtn.visible = true;
                    this.newSkill.visible = true;
                    //by cai_haotian 元宝解锁的不管够不够都能点 
                    if (_data.RecruitMoneyType == Model.MoneyType.MONEY_TYPE_YB) {
                        this.levelBtn.setFLock(_data.RecruitMoneyType, _data.RecruitCostAndUnit, _data.DpsAndUnit, true);
                    } else {
                        this.levelBtn.setFLock(_data.RecruitMoneyType, _data.RecruitCostAndUnit, _data.DpsAndUnit, _data.IsEnoughRecruit);
                    }
                } else {
                    this.visible = _data.isShow;
                    this.includeInLayout = _data.isShow;
                    if (_data.isShow) {
                        this.recruitGroup.visible = true;

                        if (Model.WebValue.isTraditional) {
                            this.recruitDemand.text = "招募條件：  " + _data.RecruitDemand;
                        } else {
                            this.recruitDemand.text = "招募条件：  " + _data.RecruitDemand;
                        }

                        this.levelBtn.visible = false;
                    }
                }
            }
        }
        /***************************二级菜单*************************/
        /**
         * @挚友二级菜单
         */
        private createFriendPop() {
            if (this.onCallback) {
                var item: ViewModel.CharDetailMsgVM = new ViewModel.CharDetailMsgVM(Main.singleton, () => { });
                item.initFData(this.fData);
            }
        }

        /**
         * @主角二级菜单
         */
        private createCharPop() {
            if (this.onCallback) {
                var item: ViewModel.CharDetailMsgVM = new ViewModel.CharDetailMsgVM(Main.singleton, () => { });
                item.initPData();
            }
        }
        /***************************按钮绑定事件*************************/

        /**
         * @主角个人回调函数
         * @单次升级
         */
        private onPlayerEvent() {
            if (this.onCallback) {
                this.onCallback(this.pData, 1);

                this.playerShowBtn();
            }
        }

        /**
         * @十连主角升按钮事件.
         * @by cai_haotian 2016.3.14.
         */
        private playerBtnTenUp() {
            //            Model.Tools.repeatedExecute(this.onBuyFEvent,10);
            if (this.onCallback) {
                this.onCallback(this.pData, 10);
                this.playerShowBtn(true);
            }
        }
        /**
         * @百连主角升按钮事件.
         * @by cai_haotian 2016.3.14.
         */
        private playerBtnHundredUp() {
            //            Model.Tools.repeatedExecute(this.onBuyFEvent,100);
            if (this.onCallback) {
                this.onCallback(this.pData, 100);
                this.playerShowBtn(true);
            }
        }

        /**
         * @判断主角+10 +100是否出现
         */
        private playerShowBtn(_case: boolean = false) {
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
                } else {
                    this.flag++;
                    if (this.flag == 5) {
                        var tenFlag = Model.PlayerLocalService.PlayerData.dy.gold > this.pData.tenUpgradeCost;
                        var hundredFlag = Model.PlayerLocalService.PlayerData.dy.gold > this.pData.hundredUpgradeCost;
                        this.setBtnShow(tenFlag, hundredFlag);
                        this.flag = 0;
                    } else {
                        var tenClose = Model.PlayerLocalService.PlayerData.dy.gold <= this.pData.tenUpgradeCost;
                        var hundredClose = Model.PlayerLocalService.PlayerData.dy.gold <= this.pData.hundredUpgradeCost;
                        this.setBtnClose(tenClose, hundredClose);
                    }
                }
            } else {
                this.levelBtn0.visible = false;
                this.levelBtn1.visible = false;
            }

            this.levelUpCharAnimel();
        }

        /**
         * @主角技能回调函数
         */
        private onPlayerSkillEvent() {
            if (this.onCallback) {
                this.onCallback(this.pSData, 1);
            }
        }

        /**
         * @十连主角技能升按钮事件.
         * @by cai_haotian 2016.2.25.
         */
        private playerSkillBtnTenUp() {
            if (this.onCallback) {
                this.onCallback(this.pSData, 10);
            }
        }
        /**
         * @百连主角技能升按钮事件.
         * @by cai_haotian 2016.2.25.
         */
        private playerSkillBtnHundredUp() {
            if (this.onCallback) {
                this.onCallback(this.pSData, 100);
            }
        }


        /**
         * @挚友回调事件.
         */
        private onBuyFEvent() {
            if (this.onCallback) {
                //小伙伴显示 by cai_haotian 2016.2.22    
                this.onCallback(this.fData, 1);
                if (this.fData.dy) {
                    this.friendShowBtn();
                }
            }
        }

        /**
         * @十连挚友升按钮事件.
         * @by cai_haotian 2016.2.25.
         */
        private friendBtnTenUp() {
            if (this.onCallback) {
                //小伙伴显示 by cai_haotian 2016.2.22    
                this.onCallback(this.fData, 10);
                if (this.fData.dy) {
                    this.friendShowBtn(true);
                }
            }
        }

        /**
         * @百连挚友升按钮事件.
         * @by cai_haotian 2016.2.25.
         */
        private friendBtnHundredUp() {
            //小伙伴显示 by cai_haotian 2016.2.22    
            this.onCallback(this.fData, 100);
            if (this.fData.dy) {
                this.friendShowBtn(true);
            }
        }

        /**
         * @挚友死亡按钮回调事件
         * @by cai_haotian 2016.4.18.
         */
        private friendDead() {
            this.onCallback(this.fData, 1);
        }

        /**
         * @挚友升级特效以及+10 +100判断显示
         * @by cai_haotian 2016.3.14
         */
        private friendShowBtn(_case: boolean = false) {
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
                } else {
                    this.flag++;
                    if (this.flag == 5) {
                        //10连升
                        var tenFlag = Model.PlayerLocalService.PlayerData.dy.gold > this.fData.tenUpgradeCost;
                        var hundredFlag = Model.PlayerLocalService.PlayerData.dy.gold > this.fData.hundredUpgradeCost;
                        this.setBtnShow(tenFlag, hundredFlag);
                        this.flag = 0;
                    } else {
                        var tenClose = Model.PlayerLocalService.PlayerData.dy.gold <= this.fData.tenUpgradeCost;
                        var hundredClose = Model.PlayerLocalService.PlayerData.dy.gold <= this.fData.hundredUpgradeCost;
                        this.setBtnClose(tenClose, hundredClose);
                    }

                }
            } else {
                this.levelBtn0.visible = false;
                this.levelBtn1.visible = false;
            }
        }

        /**
         * @设置按钮显示
         */
        private setBtnShow(_tenBtn: boolean, _hundredBtn: boolean) {
            this.levelBtn0.visible = _tenBtn;
            this.levelBtn1.visible = _hundredBtn;
            this.tenBtn = egret.setTimeout(() => {
                this.levelBtn0.visible = false;
            }, this, 3000);
            this.hundredBtn = egret.setTimeout(() => {
                this.levelBtn1.visible = false;
            }, this, 3000);
        }

        /**
         * @连续点击后若不点击定时消失
         */
        private setBtnClose(_tenBtn: boolean, _hundredBtn: boolean) {
            if (_tenBtn) {
                this.levelBtn0.visible = false;
            } else {
                this.tenBtn = egret.setTimeout(() => {
                    this.levelBtn0.visible = false;
                }, this, 3000);
            }

            if (_hundredBtn) {
                this.levelBtn1.visible = false;
            } else {
                this.hundredBtn = egret.setTimeout(() => {
                    this.levelBtn1.visible = false;
                }, this, 3000);
            }
        }

        /***************************特效函数***************************/
        /**
         * @升级特效
         * @by cai_haotian 2016.2.15
         * @by zhu_jun,2017.02.26.
         */
        private levelUpAnimel() {
            this.levelUpDB = new Model.DragonBones(this, "Tx_shengji_02_ske_json",
                "Tx_shengji_02_tex_json", "Tx_shengji_02_tex_png", "Tx_shengji_02", 47, 36);
            // this.levelUpDB.setActive(false);
        }

        /**
         * @播放item上的升级特效
         * @ by cai_haotian 2016.3.14.
         */
        private playlevelUpAnieml() {
            //by cai_haotian 2016.2.15.
            this.levelUpDB.setActive(true);
            this.levelUpDB.play("Tx_shengji_02", 1, () => {
                this.levelUpDB.setActive(false);//动画完成后隐藏
            });
            if (this.fData.Type == Model.FriendType.FRIEND_TYPE_FRIEND) {
                this.levelUpCharAnimel(this.fData.st.id);
            }
        }

        private effectDiskJson: string = "dipan_json";
        private effectDiskPng: string = "dipan_png";
        private effectDisk: string = "dipan";
        /**
         * @升级人物特效
         */
        private levelUpCharAnimel(id: number = 0) {
            //光特效
            var light: Model.MovieClipService = new Model.MovieClipService(Main.singleton.mainGameVM.levelUpLight);
            var mcLight: egret.MovieClip = light.initMovieClip("guangxian_json", "guangxian_png", "guangxian", 1, () => {
                Main.singleton.mainGameVM.levelUpLight.removeChild(mcLight);
            });
            switch (id) {
                case 0:
                    var groud: Model.MovieClipService = new Model.MovieClipService(Main.singleton.mainGameVM.yungeLevelUp);
                    var mc: egret.MovieClip = groud.initMovieClip(this.effectDiskJson, this.effectDiskPng, this.effectDisk, 1, () => {
                        Main.singleton.mainGameVM.yungeLevelUp.removeChild(mc);
                    });
                    mc.x = 268;
                    mc.y = 415;

                    mcLight.x = 269;
                    mcLight.y = 413.45;
                    break;
                case 1:
                    var groud: Model.MovieClipService = new Model.MovieClipService(Main.singleton.mainGameVM.baiheLevelUp);
                    var mc: egret.MovieClip = groud.initMovieClip(this.effectDiskJson, this.effectDiskPng, this.effectDisk, 1, () => {
                        Main.singleton.mainGameVM.baiheLevelUp.removeChild(mc);
                    });
                    mc.x = 190;
                    mc.y = 465;

                    mcLight.x = 191;
                    mcLight.y = 463.45;

                    break;
                case 7:
                    var groud: Model.MovieClipService = new Model.MovieClipService(Main.singleton.mainGameVM.bingyiLevelUp);
                    var mc: egret.MovieClip = groud.initMovieClip(this.effectDiskJson, this.effectDiskPng, this.effectDisk, 1, () => {
                        Main.singleton.mainGameVM.bingyiLevelUp.removeChild(mc);
                    });
                    mc.x = 91;
                    mc.y = 503;

                    mcLight.x = 92;
                    mcLight.y = 501.45;
                    break;
                case 13:
                    var groud: Model.MovieClipService = new Model.MovieClipService(Main.singleton.mainGameVM.xupingjunLevelUp);
                    var mc: egret.MovieClip = groud.initMovieClip(this.effectDiskJson, this.effectDiskPng, this.effectDisk, 1, () => {
                        Main.singleton.mainGameVM.xupingjunLevelUp.removeChild(mc);
                    });
                    mc.x = 201;
                    mc.y = 352;

                    mcLight.x = 202;
                    mcLight.y = 350.45;
                    break;
                case 19:
                    var groud: Model.MovieClipService = new Model.MovieClipService(Main.singleton.mainGameVM.mengjueLevelUp);
                    var mc: egret.MovieClip = groud.initMovieClip(this.effectDiskJson, this.effectDiskPng, this.effectDisk, 1, () => {
                        Main.singleton.mainGameVM.mengjueLevelUp.removeChild(mc);
                    });
                    mc.x = 96;
                    mc.y = 310;

                    mcLight.x = 97;
                    mcLight.y = 308.45;
                    break;
                case 25:
                    var groud: Model.MovieClipService = new Model.MovieClipService(Main.singleton.mainGameVM.liufulingLevelUp);
                    var mc: egret.MovieClip = groud.initMovieClip(this.effectDiskJson, this.effectDiskPng, this.effectDisk, 1, () => {
                        Main.singleton.mainGameVM.liufulingLevelUp.removeChild(mc);
                    });
                    mc.x = 78;
                    mc.y = 397;

                    mcLight.x = 79;
                    mcLight.y = 395.45;
                    break;
                default: alert("升级特效出错！请联系管理员！");
            }
        }
    }
}