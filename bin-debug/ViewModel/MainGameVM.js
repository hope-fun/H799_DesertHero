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
    var Camp;
    (function (Camp) {
        Camp[Camp["Player"] = 0] = "Player";
        Camp[Camp["Opponent"] = 1] = "Opponent";
    })(Camp = ViewModel.Camp || (ViewModel.Camp = {}));
    var MainGameVM = (function (_super) {
        __extends(MainGameVM, _super);
        function MainGameVM(_uiLayer, _onCallBack) {
            var _this = _super.call(this) || this;
            /**
             * @扣血标示
             * @by cai_haotian 2016.3.8
             */
            _this.cutFlag = true;
            /**
             * @作弊标示
             * @by cai_haotian 2016.3.9
             */
            _this.cheatFlag = true;
            /**
             * @点击频率计数
             * @by cai_haotian 2016.3.8
             */
            _this.clickFrequence = 0;
            /**
             * @挚友的播放帧率
             */
            _this.friendFrameRate = 0;
            /**
             * @自动提交数据标示
             * @by cai_haotian 2016.3.30
             */
            _this.commitFlag = 0;
            /**
             * @boss倒计时结束事件.
             */
            _this.onTimeLeft = null;
            /**
             * @当前剩余时间.
             */
            _this.currentLeftTime = 0;
            _this.skinName = View.MainGameView;
            _this.uiLayer = _uiLayer;
            _this.onCallBack = _onCallBack;
            _this.uiLayer.addChildAt(_this, 0);
            return _this;
        }
        MainGameVM.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        MainGameVM.prototype.childrenCreated = function () {
            var _this = this;
            _super.prototype.childrenCreated.call(this);
            Model.AudioService.Shared().PlayBGM("bgm-003_mp3");
            //TODO: by zhu_jun,2017.02.20.
            this.initDragonBones();
            this.initSceneInfo();
            this.initPlayer();
            this.initFriend();
            this.initEnemy();
            this.initCheatingDetection();
            this.shockTool = new Model.ShockTools();
            Model.WebValue.eventList.Set("onClickBtn", function (evt) {
                _this.onClickBtn(evt);
            });
            this.clickBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Model.WebValue.eventList.Get("onClickBtn"), this);
            /***********************************SceneInfoInit****************************************/
            this.bossHp.labelDisplay.visible = false;
            this.bossInfoGroup.visible = false;
            this.initMainGameInfo();
        };
        MainGameVM.prototype.initDragonBones = function () {
            egret.startTick(this.onTicker, this);
        };
        /**
         * @龙骨时钟事件.
         */
        MainGameVM.prototype.onTicker = function (timeStamp) {
            if (!this._time) {
                this._time = timeStamp;
            }
            var now = timeStamp;
            var pass = now - this._time;
            this._time = now;
            //心跳时钟开启
            dragonBones.WorldClock.clock.advanceTime(pass / 1000);
            return false;
        };
        /**
         * @初始化监听是否作弊
         * @by cai_haotian 2016.3.9.
         */
        MainGameVM.prototype.initCheatingDetection = function () {
            var _this = this;
            var detection = egret.setInterval(function () {
                if (Model.MainLocalService.cheatingDetection(_this.clickFrequence)) {
                    _this.cheatFlag = false;
                    egret.clearInterval(detection);
                }
                _this.clickFrequence = 0;
            }, this, 1000);
        };
        /**
         * @初始化场景信息界面.
         */
        MainGameVM.prototype.initSceneInfo = function () {
            this.changeScene();
        };
        /**
         * @初始化玩家角色.
         */
        MainGameVM.prototype.initPlayer = function () {
            this.initPlayerIdle();
        };
        /**
         * @初始挚友.
         */
        MainGameVM.prototype.initFriend = function () {
            var _this = this;
            var fDatas = Model.FriendLocalService.FriendList;
            var hadFDatas = Enumerable.From(fDatas).Select(function (x) {
                if (x.dy != null) {
                    _this.switchFriend(x);
                    return x;
                }
            }).ToArray();
            this.onDpsEvent();
        };
        /**
         * @初始化敌人角色.
         * @by zhu_jun,2017.02.21.
         */
        MainGameVM.prototype.initEnemy = function () {
            this.enemyDB = new Model.DragonBones(this.enemyGroup, Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].DBJson, Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].DBPngJson, Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].DBPng, Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].st.dragonBones, 640, 360); //1280,720//640,360
            this.enemyDB.play(Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].Idle, 0);
        };
        /**
         * @点击按钮事件.
         */
        MainGameVM.prototype.onClickBtn = function (evt) {
            this.clickFrequence++;
            this.clickEffect(evt ? evt : null);
            this.initPlayerAttack(); //主角攻击,隐藏待机,回调关攻击,显示待机.
            Model.AudioService.Shared().PlaySound(Model.PlayerLocalService.PlayerData.st.playerAttackAudio);
            this.cutHp(true);
        };
        /**
         * @减血事件.
         * @触发点击伤害.
         * @减血.
         * @更新UI
         */
        MainGameVM.prototype.cutHp = function (_isClick) {
            var _this = this;
            if (_isClick === void 0) { _isClick = false; }
            // alert("this.cutFlag " + this.cutFlag);
            // alert("this.cheatFlag " + this.cheatFlag);
            if (this.cutFlag && this.cheatFlag) {
                this.cutHpAnim(_isClick, function (damage) {
                    //此段作为正常扣血
                    Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].AddHp = -damage; //model层扣血.
                    _this.setMonsterHp();
                    if (Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hp <= 0) {
                        // alert("enemyKilled ! ");
                        _this.enemyKilled(function () {
                            // alert("Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType " + Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType);
                            if (Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType == Model.MonsterType.MONSTER_TYPE_BOSS) {
                                _this.bossDeathEvent();
                                Model.SceneLocalService.setNextSceneData(); //更新关卡数据.
                                _this.setSceneIndex();
                                _this.changeScene();
                                Model.MonsterLocalService.setMonsterData();
                                //保护挚友 by cai_haotian 2016.3.21
                                if (!Model.PlayerLocalService.PlayerData.protectFriend) {
                                    Model.FriendLocalService.sealFriendAndSkills(); //判断是否触发挚友技能锁定。
                                }
                            }
                            else {
                                // alert("Model.SceneLocalService.SceneData.currentMonster " + Model.SceneLocalService.SceneData.currentMonster);
                                Model.SceneLocalService.SceneData.currentMonster++;
                            }
                        }); //先死后加index.
                    }
                    else {
                        if (Model.WebServiceBase.isDebug) {
                            console.log("zhujun: monster have been alive ! ");
                        }
                    }
                });
            }
        };
        /**
         * @改变场景.
         */
        MainGameVM.prototype.changeScene = function () {
            //            //判断当前关卡号.
            //            if(parseInt(Model.SceneLocalService.SceneData.sceneId.sceneId) >= Model.PlayerLocalService.PlayerData.st.startScene){
            //                //TODO:在这里改。
            ////                Model.SceneLocalService.
            //            }
            if (Model.SceneLocalService.SceneData.st.sceneName) {
                var titleMsg = new ViewModel.ScrollMsgVM(this.uiLayer, function (_bUILayer) {
                    _bUILayer.removeChild(titleMsg);
                }, Model.SceneLocalService.SceneData.st.sceneName);
            }
            if (Model.SceneLocalService.SceneData.st.scenePic) {
                this.bg.source = Model.SceneLocalService.SceneData.st.scenePic;
            }
            else {
                var scenePid = Math.ceil(Model.SceneLocalService.SceneData.st.id / 5);
                this.bg.source = "scene_pic_" + scenePid;
            }
        };
        /**
         * @扣血动画.
         */
        MainGameVM.prototype.cutHpAnim = function (_isClick, _onAnimFinish) {
            var critFactor = Model.Mathf.random(0, 100);
            var damage = 0;
            if (_isClick) {
                //飘血动画.
                var cutHpItem = new ViewModel.CutHpItemVM(this.levelUpLight);
                if (critFactor <= Model.PlayerLocalService.PlayerData.CritRate) {
                    cutHpItem.y = 200;
                    damage = Model.PlayerLocalService.PlayerData.CritDamage;
                    var damgeUnit = Model.MainLocalService.toUnitConversion(Number(damage));
                    Model.PlayerLocalService.setPerSecondTapDamage(Number(damage));
                    cutHpItem.setCriticalAttack(damgeUnit, damage); //暴击显示
                    this.shockTool.shock(this, 3);
                }
                else {
                    cutHpItem.y = 270;
                    damage = Model.PlayerLocalService.PlayerData.dy.clickDamage;
                    var damgeUnit = Model.MainLocalService.toUnitConversion(Number(damage));
                    Model.PlayerLocalService.setPerSecondTapDamage(Number(damage));
                    cutHpItem.setNoramlAttack(damgeUnit, damage); //普通攻击
                }
                cutHpItem.x = 900 - cutHpItem.width / 2; //by zhu_jun,2017.03.01.
            }
            else {
                // cutHpItem.y = 270;
                damage = Model.PlayerLocalService.PlayerData.dy.friendDamage;
            }
            _onAnimFinish(damage);
        };
        /**
         * 点击特效
         */
        MainGameVM.prototype.clickEffect = function (evt) {
            var _this = this;
            if (evt) {
                this.tapEffect.x = evt.stageX - this.tapEffect.width / 2;
                this.tapEffect.y = evt.stageY - this.tapEffect.height / 2;
            }
            else {
                this.tapEffect.x = Model.Mathf.random(0, this.stage.width - this.tapEffect.width / 2);
                this.tapEffect.y = Model.Mathf.random(0, this.stage.height - this.tapEffect.height / 2);
            }
            this.tapEffect.visible = true;
            egret.setTimeout(function () {
                _this.tapEffect.visible = false;
            }, this, 80);
        };
        /**
         * @秒伤监听事件.(初始化完挚友执行.)
         */
        MainGameVM.prototype.onDpsEvent = function () {
            var _this = this;
            this.cutHp(false);
            egret.setTimeout(function () {
                _this.onDpsEvent();
            }, this, 1000 - Model.PlayerLocalService.PlayerData.friendFrameRate);
        };
        /**
         * @主角待机动画.
         * @by zhu_jun,2017.02.21.
         */
        MainGameVM.prototype.initPlayerIdle = function () {
            this.playerDB = new Model.DragonBones(this.guanyuGroup, Model.PlayerLocalService.PlayerData.DBJson, Model.PlayerLocalService.PlayerData.DBPngJson, Model.PlayerLocalService.PlayerData.DBPng, Model.PlayerLocalService.PlayerData.st.playerDragonBones, 640, 360);
            this.playerDB.play(Model.PlayerLocalService.PlayerData.PlayerIdle, 0);
        };
        /**
         * @主角攻击动画.
         */
        MainGameVM.prototype.initPlayerAttack = function () {
            var _this = this;
            this.onAttackAnim(this.playerDB, Model.PlayerLocalService.PlayerData.PlayerAttack, function () {
                _this.playerDB.play(Model.PlayerLocalService.PlayerData.PlayerIdle, 0);
            });
            this.onAttackEffect(this.yungeClickEffectGroup, //by zhu_jun,2017.02.26.
            [Model.PlayerLocalService.PlayerData.Effect,
                Model.PlayerLocalService.PlayerData.EffectPngJson,
                Model.PlayerLocalService.PlayerData.EffectPng,
                Model.PlayerLocalService.PlayerData.st.playerEffect]);
        };
        /**
         * @选择挚友动画
         */
        MainGameVM.prototype.switchFriend = function (_data) {
            switch (_data.dy.friendId) {
                case 1:
                    this.friendAnimal(this.baiheGroup, _data);
                    break;
                case 7:
                    this.friendAnimal(this.bingyiGroup, _data);
                    break;
                case 13:
                    this.friendAnimal(this.xupingjunGroup, _data);
                    break;
                case 19:
                    this.friendAnimal(this.mengjueGroup, _data);
                    break;
                case 25:
                    this.friendAnimal(this.liufulingGroup, _data);
                    break;
                default: ;
            }
        };
        /**
         * @初始化单个挚友动画.
         */
        MainGameVM.prototype.friendAnimal = function (_uiGroup, _data) {
            var _this = this;
            if (_data.dy.sealCD > 0) {
                _uiGroup.visible = false;
            }
            else {
                _uiGroup.visible = true;
            }
            if (_uiGroup.numChildren > 0) {
                if (Model.WebServiceBase.isDebug) {
                    console.log("zhujun: 大于0则是更新挚友，挚友挚友更新的时候才存在现实隐藏 ! ");
                }
                return;
            }
            var friendDB = new Model.DragonBones(_uiGroup, //mc改db by zhu_jun.
            _data.DBJson, _data.DBPngJson, _data.DBPng, _data.st.dragonBones, 640, 360);
            this.playerDB.play(_data.Idle, 0);
            // _item.initMovieClip(_data.IdleJson, _data.IdlePng, _data.st.idle);//待机动画by zhu_jun,2017.02.26.
            egret.setInterval(function () {
                //TODO:by zhu_jun,mc改db.
                _this.onAttackAnim(friendDB, _data.Attack, function () {
                    console.log("zhujun: friend _data.name " + _data.st.name + " play attack effect ! ");
                    _this.onAttackEffect(_uiGroup, [_data.Effect, _data.EffectPngJson, _data.EffectPng, _data.st.effect], function () { });
                });
                Model.AudioService.Shared().PlaySound(_data.st.attackAudio);
            }, this, Model.Mathf.random(Model.PlayerLocalService.PlayerData.st.effectTimeMin * 1000, Model.PlayerLocalService.PlayerData.st.effectTimeMax * 1000));
        };
        /**
         * @播放攻击动画.
         * @by zhu_jun,2017.02.21.mc改龙骨.
         */
        MainGameVM.prototype.onAttackAnim = function (_db, _actionName, _onCallBack) {
            if (_onCallBack === void 0) { _onCallBack = null; }
            _db.play(_actionName, 1, _onCallBack);
            //by zhu_jun,下面这段针对原来mc的，不确定还有没有用了.
            // if (Model.PlayerLocalService.PlayerData.friendFrameRate != 0) {
            //     mc.frameRate = 24 + Model.PlayerLocalService.PlayerData.friendFrameRate;
            // }
            // mc.once(egret.MovieClipEvent.FRAME_LABEL, () => {//根据序列帧动画中的事件触发特效动画
            //     if (_onCallBack) {
            //         _onCallBack();
            //     }
            // }, this);
        };
        /**
         * @攻击特效.
         * @by zhu_jun,2017.02.26.
         * @_data:
         * @_data.DBJson,
         * @_data.DBPngJson,
         * @_data.DBPng,
         * @_data.st.dragonBones,
         * @特效的动作和骨架相同,所以都是_data[3].
         */
        MainGameVM.prototype.onAttackEffect = function (_uiGroup, _data, _onCallBack) {
            if (_onCallBack === void 0) { _onCallBack = null; }
            if (Model.WebServiceBase.isDebug) {
                console.log("zhujun: on attack effect start !  " + JSON.stringify(_data));
            }
            var roleDB = new Model.DragonBones(_uiGroup, _data[0], _data[1], _data[2], _data[3], 640, 360);
            roleDB.play(_data[3], 1, function (evt) {
                _uiGroup.removeChild(evt.armature.display);
                dragonBones.WorldClock.clock.remove(evt.armature);
                evt.armature.dispose();
                if (_onCallBack != null)
                    _onCallBack();
                if (Model.WebServiceBase.isDebug)
                    console.log("zhujun: attack effect play finished ! ");
            });
        };
        /**
         * @改变敌人.
         */
        MainGameVM.prototype.changeEnemy = function (_index) {
            if (Model.WebServiceBase.isDebug) {
                console.log("zhujun: change Enemy " + _index + " Model.MonsterLocalService.MonsterList[_index].DBJson " + Model.MonsterLocalService.MonsterList[_index].DBJson);
            }
            // this.enemyDB.armature.dispose();
            this.enemyDB.changeArmature(Model.MonsterLocalService.MonsterList[_index].DBJson, Model.MonsterLocalService.MonsterList[_index].DBPngJson, Model.MonsterLocalService.MonsterList[_index].DBPng, Model.MonsterLocalService.MonsterList[_index].st.dragonBones);
            this.enemyDB.play(Model.MonsterLocalService.MonsterList[_index].Idle);
        };
        /**
         * @金币掉落.
         */
        MainGameVM.prototype.goldDrop = function () {
            var dropMoney = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].dropMoney;
            var dropMoneyAndUnit = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].DropMoneyAndUnit;
            this.onGoldAnimel(dropMoney, dropMoneyAndUnit);
        };
        /**
         * @灵石掉落.
         */
        MainGameVM.prototype.jewelDrop = function () {
            if (Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType == Model.MonsterType.MONSTER_TYPE_BOSS) {
                var bossDropJewelProbability = Model.Mathf.random(0, 10000);
                if (bossDropJewelProbability < Model.PlayerLocalService.PlayerData.st.bossDropJewelProbability) {
                    this.jewelAnimel(Model.PlayerLocalService.PlayerData.st.bossDropJewelCount, Model.PlayerLocalService.PlayerData.st.bossDropJewelCount + "");
                }
                ;
            }
        };
        /**
         * @敌人死亡时动画
         * @by zhu_jun,2017.02.21.去掉活动相关.
         * @by zhu_jun,2017.02.26.修改动画相关.
         */
        MainGameVM.prototype.enemyKilled = function (_onKilled) {
            var _this = this;
            // alert("go in enemyKilled ");
            //这段作为正常游戏流程的调用
            //调用成就方法 by cai_haotian 
            this.achievement();
            if (Model.WebServiceBase.isDebug) {
                console.log("zhujun: enemy killed ! ");
            }
            this.cutFlag = false; //先停止点击事件 by cai_haotian 2016.3.8.
            this.goldDrop(); //要在怪物死亡后，切换index之前调用金币模块.
            this.jewelDrop(); //如果为Boss则有几率掉落灵石.
            var effect = new Model.MovieClipService(this.enemyGroup); //by zhu_jun,2017.02.26.
            effect.initMovieClip("Tx_siwang_json", "Tx_siwang_png", "Tx_siwang", 1, function () {
                // alert("_onKill call back ! " + Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType);
                _this.enemyGroup.removeChild(effect.movieClip);
                _onKilled();
                if (Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType == Model.MonsterType.MONSTER_TYPE_BOSS) {
                    _this.swardIcon.visible = false; //关小剑.
                    _this.bossInfoGroup.visible = true; //显示倒计时，逃跑按钮，进度条
                    _this.countTimeImage.visible = true; //显示倒计时 by cai_haotian 2016.4.18
                    _this.countTimeLabel.visible = true; //显示进度条 by cai_haotian 2016.4.18
                    _this.bossBtn.currentState = "down"; //设置按钮显示 by cai_haotian 2016.4.18
                    //倒计时初始化.                    
                    _this.setCountDown(function () {
                        if (Model.WebServiceBase.isDebug) {
                            console.log("zhujun: boss倒计时结束,进入刷怪模式 ! ");
                        }
                        Model.MonsterLocalService.setFarmMonsterData();
                        Model.SceneLocalService.SceneData.currentMonster = 0; //强制切换怪物.
                        _this.changeEnemy(Model.SceneLocalService.SceneData.currentMonster); //怪物死后调用
                        _this.setMonsterHp(); //倒计时到了,强制切换怪物数据，更新UIhp.
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
                    });
                }
                else {
                    if (Model.SceneLocalService.SceneData.currentMonster == Model.SceneLocalService.SceneData.monsterCount - 1) {
                        // alert("1");
                        Model.MonsterLocalService.setFarmMonsterData();
                        Model.SceneLocalService.SceneData.currentMonster = 0; //强制切换怪物.
                    }
                    else {
                        //  alert("2");
                        if (Model.WebServiceBase.isDebug) {
                            console.log("zhujun: 这边进入了循环战斗,UI应该不变,等点击按钮时,修改数据,切换回挑战boss ! ");
                        }
                    }
                }
                _this.setMonsterHp(); //普通怪物死亡更新UIhp.
                _this.changeEnemy(Model.SceneLocalService.SceneData.currentMonster); //怪物死后调用
                _this.setMonsterIndex();
                _this.cutFlag = true; //重新开始扣血事件 by cai_haotian 2016.3.8.
                _this.commitAuto(); //自动提交数据
            }, false); //TODO: by zhu_jun，这边应该传false，进帧事件.
            effect.ScaleX = 1.5;
            effect.ScaleY = 1.5;
            effect.X = 900;
            effect.Y = 300;
        };
        /**
         * @敌人被攻击时动画
         * @by zhu_jun,2017.02.21.
         */
        MainGameVM.prototype.enemyHit = function () {
            var _this = this;
            console.log("zhujun： enemy Hit " + Model.SceneLocalService.SceneData.currentMonster);
            //之前这边是两个mc，播完受击动作需要切换mc回到待机动作.现在播一次攻击会默认回到循环待机.
            this.enemyDB.play(Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].Hit, 1, function () {
                _this.enemyDB.play(Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].Idle);
            });
            var enemyHit = new Model.MovieClipService(this.levelUpLight); //敌人受到攻击时的特效.by zhu_jun,2017.02.06.
            var enemyHitMc = enemyHit.initMovieClip("Tx_shouji_json", "Tx_shouji_png", "Tx_shouji", 1, function () {
                if (Model.WebServiceBase.isDebug)
                    ("remove enemy hit mc ! ");
                _this.levelUpLight.removeChild(enemyHitMc); //移除受击特效.
            });
            enemyHit.X = 920; //这个是对着界面调整的.
            enemyHit.Y = 300;
            enemyHit.ScaleX = 1.5;
            enemyHit.ScaleY = 1.5;
        };
        /**
         * @金币动画.
         */
        MainGameVM.prototype.onGoldAnimel = function (_goldAdd, _goldAddAndUnit) {
            var _this = this;
            var max = Model.Mathf.random(1, 5);
            for (var i = 0; i < max; i++) {
                var coin = new eui.Image();
                coin.source = "icon_yinbi_png";
                coin.x = 500;
                coin.y = 300;
                var endRandomX = Model.Mathf.random(0, 600); //掉落终点的x坐标
                var bezierP1X = endRandomX + Model.Mathf.random(-100, 100); //返回时贝塞尔曲线的P1点x坐标 Y坐标在TweenCustom中固定
                var startPos = new Model.Vector2(300, 300); //设置出现点的起始坐标
                var endPos = new Model.Vector2(endRandomX, Model.Mathf.random(530, 550)); //设置掉落点的终点坐标
                var finalPos = new Model.Vector2(225, 155); //金币最终飞到的坐标
                var tween = new Model.TweenCustom(coin, this.goldAndTextGroup, startPos, endPos, finalPos); //进行掉落返回曲线的函数   
                tween.sAnimTime = Model.Mathf.random(1200, 1400); //总时长
                tween.bezierP1X = bezierP1X; //设置回收动画，贝塞尔曲线的P1点x坐标
                var recycleCallBack = function (_bTween) {
                    _bTween.obj.touchEnabled = false;
                    _this.addHpText(_bTween, _goldAddAndUnit);
                    _bTween.GoldRecycleAnim(function () {
                        Main.singleton.mainMenuVM.goldAnimelStart(); //点击后播放呼吸动画
                        Model.PlayerLocalService.PlayerData.AddGold = _goldAdd; //收到钱后更新金币数量
                        //调用成就 by cai_haotian 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_COIN, _goldAdd);
                    });
                };
                tween.GoldProductionAnim(function (_bTween) {
                    var waitBackAnim = egret.setTimeout(function () {
                        recycleCallBack(_bTween);
                        egret.clearTimeout(waitBackAnim);
                    }, _this, _bTween.goldWaitTime);
                    _bTween.obj.once(egret.TouchEvent.TOUCH_TAP, function () {
                        recycleCallBack(_bTween);
                        egret.clearTimeout(waitBackAnim);
                    }, _this);
                }); //开启掉落曲线.
            }
        };
        /**
         * @处理显示钱币
         */
        MainGameVM.prototype.addHpText = function (_tween, _goldAddAndUnit) {
            var label = new eui.BitmapLabel();
            label.font = RES.getRes("gold-font_fnt");
            label.text = _goldAddAndUnit;
            label.x = _tween.ePos.x - label.textWidth / 2;
            label.y = _tween.ePos.y - _tween.obj.height;
            Main.singleton.mainMenuVM.addChild(label);
            egret.Tween.get(label).to({ y: 350, alpha: 0 }, 1200).call(function () {
                Main.singleton.mainMenuVM.removeChild(label);
            });
        };
        /**
         * @灵石动画.
         */
        MainGameVM.prototype.jewelAnimel = function (_jewelAdd, _jewelAddAndUnit) {
            var _this = this;
            var jewel = new eui.Image();
            jewel.source = "icon_lingshi_png";
            jewel.width = 23;
            jewel.height = 23;
            jewel.x = 500;
            jewel.y = 300;
            Main.singleton.mainMenuVM.addChild(jewel);
            var endRandomX = Model.Mathf.random(0, 600); //掉落终点的x坐标
            var bezierP1X = endRandomX + Model.Mathf.random(-100, 100); //返回时贝塞尔曲线的P1点x坐标 Y坐标在TweenCustom中固定
            var startPos = new Model.Vector2(300, 300); //设置出现点的起始坐标
            var endPos = new Model.Vector2(endRandomX, Model.Mathf.random(530, 550)); //设置掉落点的终点坐标
            var finalPos = new Model.Vector2(266, 387); //灵石最终飞入坐标
            var tween = new Model.TweenCustom(jewel, this.goldAndTextGroup, startPos, endPos, finalPos); //进行掉落返回曲线的函数      
            tween.sAnimTime = Model.Mathf.random(1200, 1400); //总时长
            tween.bezierP1X = bezierP1X; //设置回收动画，贝塞尔曲线的P1点x坐标
            var recycleCallBack = function (_bTween) {
                _bTween.obj.touchEnabled = false;
                _this.addJewelText(_bTween, _jewelAddAndUnit);
                _bTween.GoldRecycleAnim(function () {
                    Model.PlayerLocalService.PlayerData.AddJewel = Number(_jewelAdd); //收到钱后更新金币数量
                    //调用成就 2016.4.5
                    Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_JEWEL, Number(_jewelAdd));
                });
            };
            tween.GoldProductionAnim(function (_bTween) {
                var waitBackAnim = egret.setTimeout(function () {
                    recycleCallBack(_bTween);
                    egret.clearTimeout(waitBackAnim);
                }, _this, _bTween.goldWaitTime);
                _bTween.obj.once(egret.TouchEvent.TOUCH_TAP, function () {
                    recycleCallBack(_bTween);
                    egret.clearTimeout(waitBackAnim);
                }, _this);
            }); //开启掉落曲线.
        };
        /**
         * @处理显示灵石
         */
        MainGameVM.prototype.addJewelText = function (_tween, _goldAddAndUnit) {
            var label = new eui.BitmapLabel();
            label.font = RES.getRes("gold-font_fnt");
            label.text = _goldAddAndUnit;
            label.x = _tween.ePos.x - label.textWidth / 2;
            label.y = _tween.ePos.y - _tween.obj.height;
            Main.singleton.mainMenuVM.addChild(label);
            egret.Tween.get(label).to({ y: 350, alpha: 0 }, 1200).call(function () {
                Main.singleton.mainMenuVM.removeChild(label);
            });
        };
        /**
         * @自动提交方法
         * @by cai_haotian 2016.3.30
         */
        MainGameVM.prototype.commitAuto = function () {
            this.commitFlag++;
            if (this.commitFlag == 10) {
                this.commitFlag = 0;
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
            }
        };
        /**
         * @怪物与成就相关数据
         * @by cai_haotian 2016.4.5
         */
        MainGameVM.prototype.achievement = function () {
            //调用成就 by cai_haotian 2016.4.5
            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_KILL_ENEMY, 1);
            switch (Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType) {
                case Model.MonsterType.MONSTER_TYPE_BOSS:
                    //调用成就 by cai_haotian 2016.4.5
                    Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_KILL_BOSS, 1);
                    break;
                case Model.MonsterType.MONSTER_TYPE_BOX:
                    //调用成就 by cai_haotian 2016.4.5
                    Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_BOX, 1);
                    break;
                case Model.MonsterType.MONSTER_TYPE_PERSON:
                    break;
                default: alert("怪物类型出错！请联系管理员！c");
            }
        };
        //        protected childrenCreated() {
        //     super.childrenCreated();
        // }
        MainGameVM.prototype.initMainGameInfo = function () {
            this.setMoney(Model.PlayerLocalService.PlayerData.GoldAndUnit);
            this.setMonsterIndex();
            this.setSceneIndex();
            this.setMonsterHp();
            this.bossBtn.addEventListener(egret.Event.CHANGE, this.bossBtnEvent, this);
            //            this.bossBtn.currentState = "upAndSelected";
            //            console.log("zhujun bossBtn 默认状态: " + this.bossBtn.selected);//默认是false.
        };
        /**
         * @boss按钮切换事件.
         * @false:逃跑状态,进入方法变true,按钮变绿,倒计时去掉.
         * @true:挑战状态,进入方法变false,按钮变红,
         */
        MainGameVM.prototype.bossBtnEvent = function () {
            if (this.bossBtn.selected) {
                this.timeLeftComplete(); //重置倒计时.
            }
            else {
                //重置回调事件，逃跑时，回调事件是构造boss关卡数据,切换到boss.
                //TODO: 这段最好是传下来.
                Model.MonsterLocalService.setMonsterData();
                Model.SceneLocalService.SceneData.currentMonster = Model.MonsterLocalService.MonsterList.length - 1;
                this.bossBtn.currentState = "upAndSelected";
                this.countTimeLabel.visible = true;
                this.countTimeImage.visible = true;
                this.sceneNumLabel.visible = false;
                this.swardIcon.visible = false;
                this.setCountDown(this.onTimeLeft);
                this.bossBtn.removeEventListener(egret.Event.CHANGE, this.bossBtnEvent, this);
                this.initMainGameInfo();
            }
        };
        /**
         * @boss死亡事件.
         * @切换回普通战斗.
         */
        MainGameVM.prototype.bossDeathEvent = function () {
            //终止所有计时.
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER, this.timeLeftEvent, this);
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeLeftComplete, this);
            this.bossTimer.stop();
            //            this.bossBtn.removeEventListener(egret.Event.CHANGE,this.bossBtnEvent,this);
            //重置为正常战斗UI.
            this.swardIcon.visible = true; //关小剑.
            this.bossInfoGroup.visible = false; //显示倒计时，逃跑按钮，进度条
            this.sceneNumLabel.visible = true;
        };
        /**
         * @倒计时到0,或者点击逃跑,UI重置.
         */
        MainGameVM.prototype.runAwayEvent = function () {
            this.bossBtn.currentState = "downAndSelected"; //"down";
            this.countTimeLabel.visible = false;
            this.countTimeImage.visible = false;
            this.sceneNumLabel.visible = false;
            this.swardIcon.visible = false;
        };
        /**
         * @设置金币.
         * @TODO: by zhu_jun,2017.02.19.
         */
        MainGameVM.prototype.setMoney = function (_value) {
            // this.charMoney.font = RES.getRes("gold-show-font_fnt");
            // this.charMoney.text = _value;
            if (this.onCallBack)
                this.onCallBack(); // Main.singleton.mainMenuVM.refreshMenu();//改钱之后，会更新相关模块UI.执行的是刷新.
        };
        /**
         * @设置怪物index.
         * @怪物切换时候更新.
         */
        MainGameVM.prototype.setMonsterIndex = function () {
            this.sceneNumLabel.text = String(Model.SceneLocalService.SceneData.currentMonster + 1 + "/" + Model.SceneLocalService.SceneData.monsterCount);
        };
        /**
         * @设置关卡序号.
         */
        MainGameVM.prototype.setSceneIndex = function () {
            this.preRound.text = String(Model.SceneLocalService.SceneData.sceneId - 1);
            this.currentRound.text = Model.SceneLocalService.SceneData.sceneId + "";
            this.nextRound.text = String(Model.SceneLocalService.SceneData.sceneId + 1);
            //TODO: by zhu_jun,2017.02.20.关卡id背景不变了.
            // this.preImage.source = String("guanshu_" + String((Model.SceneLocalService.SceneData.sceneId - 1) % 3));
            // this.currentImage.source = String("guanshu_" + String(Model.SceneLocalService.SceneData.sceneId % 3));
            // this.nextImage.source = String("guanshu_" + String((Model.SceneLocalService.SceneData.sceneId + 1) % 3));
            //调用成就 2016.4.5
            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_ARRIVE_SCENE, Model.SceneLocalService.SceneData.sceneId);
        };
        /**
         * @设置boss血量.
         */
        MainGameVM.prototype.setMonsterHp = function () {
            var hp = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hp;
            var hpMax = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hpMax;
            if (hp == hpMax) {
                this.bossHp.slideDuration = 0;
            }
            else {
                this.bossHp.slideDuration = 500; //0
            }
            this.bossHpLabel.text = String(Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].HpAndUnit
                + "/"
                + Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].HpMaxAndUnit);
            this.bossHp.maximum = hpMax;
            this.bossHp.minimum = 0;
            //            console.log("1111111:" + hp)
            this.bossHp.value = hp;
        };
        /**
         * @设置挑战boss血量
         * @by cai_haotian 2016.4.15.
         */
        MainGameVM.prototype.setChallengeBoss = function () {
            var hpMax = Model.ChallengeLoaclService.challengeBossData.hpMax;
            var hp = Model.ChallengeLoaclService.challengeBossData.hp;
            if (hp == hpMax) {
                this.bossHp.slideDuration = 0;
            }
            else {
                this.bossHp.slideDuration = 500; //0
            }
            var leftHp = Model.MainLocalService.toUnitConversion(hp);
            var maxHp = Model.ChallengeLoaclService.challengeBossData.GetHpMax;
            this.bossHpLabel.text = leftHp + "/" + maxHp;
            this.bossHp.maximum = hpMax;
            this.bossHp.minimum = 0;
            this.bossHp.value = hp;
        };
        /**
         * @设置倒计时.
         */
        MainGameVM.prototype.setCountDown = function (_onTimeLeft, _time) {
            if (_time) {
            }
            else {
                this.onTimeLeft = _onTimeLeft;
            }
            this.currentLeftTime = _time ? _time : Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].leftTime;
            this.countTimeImage.width = 220;
            this.countDownTimes = _time ? _time * 1000 / 100 : Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].leftTime * 1000 / 100;
            this.countTimePercent = 220 / this.countDownTimes;
            this.bossTimer = new egret.Timer(100, this.countDownTimes); //0.1秒更新一次记时条.
            if (_time) {
            }
            else {
                this.bossTimer.addEventListener(egret.TimerEvent.TIMER, this.timeLeftEvent, this);
                this.bossTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeLeftComplete, this);
                this.bossTimer.start();
            }
        };
        /**
         * @剩余时间.
         */
        MainGameVM.prototype.timeLeftEvent = function () {
            this.currentLeftTime -= 0.1;
            this.countTimeLabel.text = this.currentLeftTime.toFixed(1);
            this.countTimeImage.width -= this.countTimePercent;
            console.log("每100毫秒执行一次!");
        };
        /**
         * @剩余时间结束时调用.
         */
        MainGameVM.prototype.timeLeftComplete = function () {
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER, this.timeLeftEvent, this);
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeLeftComplete, this);
            this.bossTimer.stop();
            this.runAwayEvent();
            if (this.onTimeLeft)
                this.onTimeLeft();
        };
        return MainGameVM;
    }(eui.Component));
    ViewModel.MainGameVM = MainGameVM;
    __reflect(MainGameVM.prototype, "ViewModel.MainGameVM");
})(ViewModel || (ViewModel = {}));
