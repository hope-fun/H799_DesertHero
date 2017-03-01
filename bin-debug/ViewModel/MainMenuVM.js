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
            /**
             * @是否菜单状态.by zhu_jun,2017.02.28.
             */
            _this.isKeyMenu = true;
            /****************************************************************playerSkill_MainInfo*************************************/
            /**
             * @主信息数据.
             */
            _this.mData = null;
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
            var _this = this;
            _super.prototype.childrenCreated.call(this);
            Main.singleton.mainGameVM = new ViewModel.MainGameVM(this.uiLayer, function () {
                if (Model.WebServiceBase.isDebug) {
                    console.log("zhujun: main game vm call back successed ! ");
                }
                _this.refreshMenu();
            });
            this.onCallBack();
            this.initEventList();
            this.initKeyMenuEvent();
            this.initMenuPopup();
            this.initBtnTop();
            this.initBtnBottomEvent();
            this.initBtnBottomGroupUI();
            this.initMainInfo();
            this.goldIcon();
            // this.updateKeyMenuEvent(Model.WebValue.eventList.Get("onClickBtn"));
        };
        /**
         * @初始化事件列表.
         */
        MainMenuVM.prototype.initEventList = function () {
            var _this = this;
            Model.WebValue.eventList.Set("onSetting", function () { new ViewModel.SettingsVM(_this.uiLayer, null); });
            Model.WebValue.btnList.Set("btnSetting", this.btnSetting);
            Model.WebValue.eventList.Set("onAchievement", function () { new ViewModel.AchievementVM(_this.uiLayer, null); });
            Model.WebValue.btnList.Set("btnAchievement", this.btnAchievement);
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
            Model.WebValue.btnList.Set("btnSkill", this.btnSkill);
            Model.WebValue.eventList.Set("onProtagonist", function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setPData();
                _this.currentPage = PageName.Player;
            });
            Model.WebValue.btnList.Set("btnProtagonist", this.btnProtagonist);
            Model.WebValue.eventList.Set("onBosomFriend", function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setBFData();
                _this.currentPage = PageName.Friend;
            });
            Model.WebValue.btnList.Set("btnBosomFriend", this.btnBosomFriend);
            Model.WebValue.eventList.Set("onArtifact", function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setAData();
                _this.currentPage = PageName.MagicWeapon;
            });
            Model.WebValue.btnList.Set("btnArtifact", this.btnArtifact);
            Model.WebValue.eventList.Set("onMall", function () {
                _this.menuPopupGroup.visible = true;
                _this.menuPopup.setMData();
                _this.currentPage = PageName.Mall;
            });
            Model.WebValue.btnList.Set("btnMall", this.btnMall);
        };
        /**
         * @初始化按键菜单,默认战斗状态.
         */
        MainMenuVM.prototype.initKeyMenuEvent = function () {
            var _this = this;
            Model.WebValue.currentBtn = Model.WebValue.menuEventConfig.btnSetting;
            Model.KeyEventTool.onBack = function () {
                if (_this.isKeyMenu) {
                    console.log("click module ! ");
                    _this.isKeyMenu = false; //关菜单事件.
                    Model.KeyEventTool.onDirectionDown = function (_direction) {
                        console.log("zhujun: onDirectionDown is close ! " + _direction);
                    };
                    Model.KeyEventTool.onDirectionUp = function () {
                        console.log("zhujun: onDirectionUp is close ! ");
                    };
                    Model.KeyEventTool.onOK = Model.WebValue.eventList.Get("onClickBtn"); //战斗状态,点击中键扣血事件.
                }
                else {
                    console.log("menu module ! ");
                    _this.isKeyMenu = true;
                    Model.KeyEventTool.onDirectionDown = function (_direction) {
                        console.log("onDirectionDown");
                        switch (_direction) {
                            case Model.Direction.UP:
                                console.log("zhujun : topBtn btn " + Model.WebValue.currentBtn.topBtn);
                                Model.WebValue.currentBtn = Model.WebValue.menuEventConfig[Model.WebValue.currentBtn.topBtn];
                                break;
                            case Model.Direction.DOWN:
                                console.log("zhujun : bottom btn " + Model.WebValue.currentBtn.bottomBtn);
                                Model.WebValue.currentBtn = Model.WebValue.menuEventConfig[Model.WebValue.currentBtn.bottomBtn];
                                break;
                            case Model.Direction.LEFT:
                                console.log("zhujun : left btn " + Model.WebValue.currentBtn.leftBtn);
                                Model.WebValue.currentBtn = Model.WebValue.menuEventConfig[Model.WebValue.currentBtn.leftBtn]; //Model.WebValue.eventList[Model.WebValue.currentBtn.leftBtn];
                                break;
                            case Model.Direction.RIGHT:
                                console.log("zhujun : right btn " + Model.WebValue.currentBtn.rightBtn);
                                Model.WebValue.currentBtn = Model.WebValue.menuEventConfig[Model.WebValue.currentBtn.rightBtn]; //找到当前btn.比如btnAchievement.
                                // Model.WebValue.currentBtn = Model.WebValue.eventList[Model.WebValue.currentBtn.rightBtn];
                                break;
                            default:
                                break;
                        }
                        console.log("zhujun: Model.WebValue.menuEventConfig " + JSON.stringify(Model.WebValue.menuEventConfig));
                        console.log("zhujun: Model.WebValue.currentBtn " + JSON.stringify(Model.WebValue.currentBtn));
                    };
                    Model.KeyEventTool.onOK = function () {
                        console.log("zhujun: event btn event sure ! ");
                        if (Model.WebValue.currentBtn)
                            Model.WebValue.eventList.Get(Model.WebValue.currentBtn.middleEvent)();
                    };
                }
            };
            // this.isKeyMenu = true;
            Model.KeyEventTool.onBack(); //执行切换到战斗的事件.
        };
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
            this.btnSetting.addEventListener(egret.TouchEvent.TOUCH_TAP, Model.WebValue.eventList.Get("onSetting"), this);
            this.btnAchievement.addEventListener(egret.TouchEvent.TOUCH_TAP, Model.WebValue.eventList.Get("onAchievement"), this);
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
        /**
         * @设置主信息数据,并初始化.
         */
        MainMenuVM.prototype.initMainInfo = function () {
            this.tapDps.text = Model.PlayerLocalService.PlayerData.ClickDamageAndUnit;
            this.friendDps.text = Model.PlayerLocalService.PlayerData.FriendDamageAndUnit;
            this.currentDps.text = Model.PlayerLocalService.PlayerData.CurrentDpsAndUnit;
            //获得主角技能列表
            var pSDatas = Model.PlayerSkillLocalService.PlayerSkillList;
            this.setSkillItem(pSDatas);
        };
        /**
         * @设置当前dps.
         */
        MainMenuVM.prototype.setCurrentDps = function (_value) {
            this.currentDps.text = _value;
        };
        /**
         * @设置点击伤害.
         */
        MainMenuVM.prototype.setTapDamage = function (_value) {
            this.tapDps.text = _value;
        };
        MainMenuVM.prototype.setFriendDps = function (_value) {
            this.friendDps.text = _value;
        };
        /**
         * @设置主角6个技能
         * @by cai_haotian 2016.2.1.
         */
        MainMenuVM.prototype.setSkillItem = function (_data) {
            var _this = this;
            var skillItem;
            for (var i = 0; i < _data.length; i++) {
                skillItem = this.skillGroup.getChildAt(i);
                if (skillItem.currentState != "during" && skillItem.currentState != "disabled") {
                    //初始化技能
                    skillItem.onCallBack = function (_data, _item) {
                        Model.WebService.ReleaseSkillCD(_data.st.id, function () {
                            if (Model.WebServiceBase.isDebug) {
                                console.log("cai_haotian releaseSkill Success!!!!!");
                            }
                            //通过item的状态来实现不同函数
                            if (_item.currentState == "disabled" && _data.dy.cdTime != 0) {
                                _this.resetCD(_data, _item);
                            }
                            else if (_item.currentState == "enabled") {
                                _this.skillAnimel(_data, _item);
                            }
                        }, function () {
                            if (Model.WebValue.isTraditional) {
                                alert("釋放技能失敗！請聯繫管理員");
                            }
                            else {
                                alert("释放技能失败！请联系管理员！");
                            }
                            if (Model.WebServiceBase.isDebug) {
                                console.log("cai_haotian releaseSkill failed!!!!!!");
                            }
                        });
                    };
                }
                //初始化技能信息
                skillItem.initSkill(_data[i]);
            }
        };
        /**
         * @技能动画
         * @by cai_haotian 2016.3.15.
         */
        MainMenuVM.prototype.skillAnimel = function (_data, _item, _flag, _onCallBack) {
            var _this = this;
            if (_flag === void 0) { _flag = true; }
            var mc;
            var mcItem;
            var armature;
            var duringTime = _flag ? _data.continueTime : 15;
            var cd = null;
            var enemyHit = function () { Main.singleton.mainGameVM.enemyHit(); };
            if (_flag) {
                _item.touchEnabled = false;
                _item.currentState = "during";
                _item.counterCD.text = Model.PlayerSkillLocalService.timeDes(duringTime);
            }
            else {
                _item.touchEnabled = false;
                if (_item.currentState == "enabled") {
                    _item.currentState = "disabled";
                    egret.setTimeout(function () {
                        _item.currentState = "enabled";
                    }, this, duringTime);
                }
                if (_onCallBack) {
                    _onCallBack(_data, duringTime);
                }
            }
            //技能特效
            switch (_data.st.id) {
                case 1:
                    //技能1 是单次点击后直接播放 并且开始计时cd
                    //3秒后实现攻击
                    egret.setTimeout(function () {
                        mcItem = new Model.MovieClipService(Main.singleton.mainGameVM.yungeFrontSkill);
                        mc = mcItem.initMovieClip("Tx_zhujue_0" + _data.st.id + "_json", "Tx_zhujue_0" + _data.st.id + "_png", "Tx_zhujue_0" + _data.st.id, 1, function () {
                            Main.singleton.mainGameVM.yungeFrontSkill.removeChild(mcItem.movieClip);
                        });
                        duringTime = 0;
                        Model.AudioService.Shared().PlaySound("YX-007_mp3");
                        Model.PlayerSkillLocalService.PlayerSkillEffect(_data, function () {
                            Main.singleton.mainGameVM.cutHp(true);
                        }, _flag);
                    }, this, duringTime * 1000);
                    if (_flag) {
                        //调用成就 by cai_haotian 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL1, 1);
                    }
                    //调用技能逻辑效果
                    break;
                case 2:
                    mcItem = new Model.MovieClipService(Main.singleton.mainGameVM.yungeFrontSkill);
                    mc = mcItem.initMovieClip("Tx_zhujue_0" + _data.st.id + "_json", "Tx_zhujue_0" + _data.st.id + "_png", "Tx_zhujue_0" + _data.st.id, -1, function () { });
                    mc.addEventListener(egret.Event.LOOP_COMPLETE, enemyHit, this);
                    if (_flag) {
                        //调用成就 by cai_haotian 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL2, 1);
                    }
                    //调用技能逻辑效果
                    Model.PlayerSkillLocalService.PlayerSkillEffect(_data, function () {
                        Main.singleton.mainGameVM.cutHp(true);
                    }, _flag);
                    break;
                case 3:
                    var particleEffects = new Model.Particles(Main.singleton.mainGameVM.yungeFrontSkill, "Tx_zhujue_03_particle_png", "Tx_zhujue_03_particle_json");
                    var partcleObject = particleEffects.setParticlesPos(272, 280);
                    partcleObject.start();
                    if (_flag) {
                        //调用成就 by cai_haotian 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL3, 1);
                    }
                    // by zhu_jun,2017.02.21.,技能特效.
                    var skill3DB = new Model.DragonBones(Main.singleton.mainGameVM.yungeFrontSkill, "Tx_zhujue_03_json", "Tx_zhujue_03_part_json", "Tx_zhujue_03_part_png", "Tx_zhujue_03", 720, 360);
                    skill3DB.play("Tx_zhujue_03");
                    Model.PlayerSkillLocalService.PlayerSkillEffect(_data, function () {
                    }, _flag);
                    break;
                case 4:
                    mcItem = new Model.MovieClipService(Main.singleton.mainGameVM.yungeSkill0);
                    mc = mcItem.initMovieClip("Tx_zhujue_04_json", "Tx_zhujue_04_png", "Tx_zhujue_04", -1, function () { });
                    if (_flag) {
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL4, 1);
                    }
                    Model.PlayerSkillLocalService.PlayerSkillEffect(_data, function () {
                    }, _flag);
                    break;
                case 5:
                    this.bufferAnimel(Main.singleton.mainGameVM.yungeFrontSkill, function () {
                        var skill3DB = new Model.DragonBones(Main.singleton.mainGameVM.yungeSkill0, //by zhu_jun,2017.02.21.
                        "Tx_zhujue_05_json", "Tx_zhujue_05_part_json", "Tx_zhujue_05_part_png", "Tx_zhujue_05", 720, 360);
                        skill3DB.play("Tx_zhujue_05");
                    });
                    if (_flag) {
                        //调用成就 by cai_haotian 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL5, 1);
                    }
                    Model.PlayerSkillLocalService.PlayerSkillEffect(_data, function () {
                    }, _flag);
                    break;
                case 6:
                    //最后一个特效为粒子特效
                    var particleEffects = new Model.Particles(Main.singleton.mainGameVM.yungeFrontSkill, "Tx_zhujue_06_2_png", "Tx_zhujue_06_2_json");
                    var partcleObject = particleEffects.setParticlesPos(272, 142);
                    if (_flag) {
                        //调用成就 by cai_haotian 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_USE_SKILL6, 1);
                    }
                    Model.PlayerSkillLocalService.PlayerSkillEffect(_data, function (_gold, _goldAndunit) {
                        Main.singleton.mainGameVM.onGoldAnimel(_gold, _goldAndunit);
                    }, _flag);
                    break;
                default:
                    alert("主角技能使用出错！请联系管理员！！");
            }
            //技能处在持续时间中
            var during = egret.setInterval(function () {
                duringTime--;
                if (_flag) {
                    _item.counterCD.text = Model.PlayerSkillLocalService.timeDes(duringTime);
                }
                if (_onCallBack) {
                    _onCallBack(_data, duringTime);
                }
                //技能持续时间过完
                if (duringTime <= 0) {
                    egret.clearInterval(during);
                    _item.touchEnabled = true;
                    switch (_data.st.id) {
                        case 1:
                            //移除技能1的监听事件
                            //                            Main.singleton.mainGameVM.clickBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,skillOncAnimate,this);
                            break;
                        case 2:
                            Main.singleton.mainGameVM.yungeFrontSkill.removeChild(mc);
                            mc.removeEventListener(egret.Event.LOOP_COMPLETE, enemyHit, _this);
                            break;
                        case 3:
                            Main.singleton.mainGameVM.yungeFrontSkill.removeChild(armature.display);
                            Main.singleton.mainGameVM.yungeFrontSkill.removeChild(partcleObject);
                            break;
                        case 4:
                            Main.singleton.mainGameVM.yungeSkill0.removeChild(mc);
                            break;
                        case 5:
                            //此层级在后面
                            Main.singleton.mainGameVM.yungeSkill0.removeChild(armature.display);
                            break;
                        case 6:
                            //粒子动画特效移除
                            Main.singleton.mainGameVM.yungeFrontSkill.removeChild(partcleObject);
                            break;
                        default:
                            alert("主角技能使用出错！请联系管理员！！");
                    }
                    if (_flag) {
                        _item.currentState = "disabled";
                        _item.initSkillCD(_data);
                    }
                }
            }, this, 1000);
        };
        /**
         * @缓冲动画
         * @by cai_haotian 2016.2.19.
         * @by zhu_jun,2017.02.22.
         */
        MainMenuVM.prototype.bufferAnimel = function (_uiGroup, _onCallBack) {
            if (_onCallBack === void 0) { _onCallBack = null; }
            var db = new Model.DragonBones(_uiGroup, "Tx_zhujue_hc0405_ske_json", "Tx_zhujue_hc0405_tex_json", "Tx_zhujue_hc0405_tex_png", "Tx_zhujue_hc0405", 640, 360); //1280,720//640,360
            db.play("Tx_zhujue_hc0405", 1, function (evt) {
                _uiGroup.removeChild(evt.armature.display);
                dragonBones.WorldClock.clock.remove(evt.armature);
                evt.armature.dispose();
                if (_onCallBack != null)
                    _onCallBack();
            });
            //TODO: by zhu_jun可能要加帧事件.
            // bufferArmature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT,(evt: dragonBones.FrameEvent) => {
            //     _uiGroup.removeChild(bufferArmature.display);
            //     _onCallback();
            // },this);
        };
        /**
         * @重置技能cd
         * @by cai_haotian 2016.2.24.
         */
        MainMenuVM.prototype.resetCD = function (_data, _item) {
            var _this = this;
            var resetCD = new ViewModel.ResetSkillVM(Main.singleton, _data, function (_data) {
                Model.PlayerSkillLocalService.reduceCD(_data, function () {
                    _this.initMainInfo();
                    egret.clearInterval(_item.cd);
                });
            });
        };
        /**
         *@播放金币呼吸动画
        */
        MainMenuVM.prototype.goldIcon = function () {
            var mcData = new egret.MovieClipDataFactory(RES.getRes("jinbi_json"), RES.getRes("jinbi_png"));
            this.goldAnimel = new egret.MovieClip(mcData.generateMovieClipData("jinbi"));
            this.addChild(this.goldAnimel);
        };
        /**
         * @开始播放金币动画
         */
        MainMenuVM.prototype.goldAnimelStart = function () {
            if (this.goldAnimel.currentFrame == this.goldAnimel.totalFrames) {
                this.goldAnimel.gotoAndPlay(0);
            }
            else {
                this.goldAnimel.play();
            }
        };
        return MainMenuVM;
    }(eui.Component));
    ViewModel.MainMenuVM = MainMenuVM;
    __reflect(MainMenuVM.prototype, "ViewModel.MainMenuVM");
})(ViewModel || (ViewModel = {}));
