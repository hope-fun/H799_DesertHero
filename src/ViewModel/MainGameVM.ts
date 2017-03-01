module ViewModel {
	/**
	 * @author: zhu_jun.
	 * @date: 2015.12.25.
	 */
    export enum Camp {
        Player,
        Opponent
    }

    export class MainGameVM extends eui.Component {
    	/**
    	 * @舞台父节点.
    	 */
        private uiLayer: eui.UILayer;
        /**
         * @回调方法.
         */
        private onCallBack: Function;
        /**
         * @金币和飘字父节点.
         */
        private goldAndTextGroup: eui.Group;
        /**
         * @核心点击控件，重要!
         */
        public clickBtn: eui.Button;
        /**
         * @背景图片
         */
        public bg: eui.Image;
        /**
         * @孟珏父节点.
         */
        public mengjueGroup: eui.Group;
        /**
         * @孟珏升级特效
         */
        public mengjueLevelUp: eui.Group;
        /**
         * @刘弗陵父节点.
         */
        public liufulingGroup: eui.Group;
        /**
         * @刘弗陵升级特效.
         */
        public liufulingLevelUp: eui.Group;
        /**
         * @病已父节点.
         */
        public bingyiGroup: eui.Group;
        /**
         * @病已升级特效.
         */
        public bingyiLevelUp: eui.Group;
        /**
         * @许平君父节点.
         */
        public xupingjunGroup: eui.Group;
        /**
         * @许平君升级特效.
         */
        public xupingjunLevelUp: eui.Group;
        /**
         * @关羽父节点.
         */
        public guanyuGroup: eui.Group;
        /**
         * @云歌升级特效.
         */
        public yungeLevelUp: eui.Group;
        /**
         * @云歌点击特效父节点.
         */
        public yungeClickEffectGroup: eui.Group;
        /**
         * @云歌前排技能
         */
        public yungeFrontSkill: eui.Group;
        /**
         * @云歌后排技能0
         */
        public yungeSkill0: eui.Group;
        /**
         * @云歌后排技能1
         */
        public yungeSkill1: eui.Group;
        /**
         * @百合父节点.
         */
        private baiheGroup: eui.Group;
        /**
         * @百合龙骨.
         */
        private playerDB: Model.DragonBones;
        /**
         * @百合升级特效.
         */
        public baiheLevelUp: eui.Group;
        /**
         * @敌人父节点.
         */
        public enemyGroup: eui.Group;
        /**
         * @敌人龙骨对象.
         */
        private enemyDB: Model.DragonBones;

        /**
         * @点击效果图
         * @by cai_haotian
         */
        private tapEffect: eui.Image;

        /**
         * @抖动方法
         * @by cai_haotian.
         */
        private shockTool: Model.ShockTools;

        /**
         * @扣血标示
         * @by cai_haotian 2016.3.8
         */
        private cutFlag: boolean = true;

        /**
         * @作弊标示
         * @by cai_haotian 2016.3.9
         */
        private cheatFlag: boolean = true;

        /**
         * @点击频率计数
         * @by cai_haotian 2016.3.8
         */
        private clickFrequence: number = 0;

        /**
         * @挚友的播放帧率
         */
        public friendFrameRate: number = 0;

        /**
         * @自动提交数据标示
         * @by cai_haotian 2016.3.30
         */
        public commitFlag: number = 0;

        /**
         * @升级光特效
         * @by cai_haotian 2016.3.14
         */
        public levelUpLight: eui.Group;
        /**
         * @挑战结束之后胜利失败的图片.
         */
        public challengeFinishTitle: eui.Image;

        public constructor(_uiLayer: eui.UILayer, _onCallBack: Function) {
            super();
            this.skinName = View.MainGameView;
            this.uiLayer = _uiLayer;
            this.onCallBack = _onCallBack;
            this.uiLayer.addChildAt(this, 0);
        }

        protected createChildren() {
            super.createChildren();

        }

        protected childrenCreated() {
            super.childrenCreated();
            Model.AudioService.Shared().PlayBGM("bgm-003_mp3");
            //TODO: by zhu_jun,2017.02.20.
            this.initDragonBones();
            this.initSceneInfo();
            this.initPlayer();
            this.initFriend();
            this.initEnemy();
            this.initCheatingDetection();
            this.shockTool = new Model.ShockTools();
            Model.WebValue.eventList.Set("onClickBtn", (evt: egret.TouchEvent) => {
                this.onClickBtn(evt);
            });
            this.clickBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Model.WebValue.eventList.Get("onClickBtn"), this);
            /***********************************SceneInfoInit****************************************/
            this.bossHp.labelDisplay.visible = false;
            this.bossInfoGroup.visible = false;
            this.initMainGameInfo();
        }

        private initDragonBones() {
            egret.startTick(this.onTicker, this);
        }
        private _time: number;
        /**
         * @龙骨时钟事件.
         */
        private onTicker(timeStamp: number) {
            if (!this._time) {
                this._time = timeStamp;
            }
            var now = timeStamp;
            var pass = now - this._time;
            this._time = now;
            //心跳时钟开启
            dragonBones.WorldClock.clock.advanceTime(pass / 1000);
            return false;
        }


        /**
         * @初始化监听是否作弊
         * @by cai_haotian 2016.3.9.
         */
        private initCheatingDetection() {
            var detection = egret.setInterval(() => {
                if (Model.MainLocalService.cheatingDetection(this.clickFrequence)) {
                    this.cheatFlag = false;
                    egret.clearInterval(detection);
                }
                this.clickFrequence = 0;
            }, this, 1000);
        }

        /**
         * @初始化场景信息界面.
         */
        public initSceneInfo() {
            this.changeScene();
        }

        /**
         * @初始化玩家角色.
         */
        public initPlayer() {
            this.initPlayerIdle();
        }

        /**
         * @初始挚友.
         */
        public initFriend() {
            var fDatas: Model.FriendData[] = Model.FriendLocalService.FriendList;
            var hadFDatas: Model.FriendData[] = Enumerable.From(fDatas).Select((x) => {
                if (x.dy != null) {
                    this.switchFriend(x);
                    return x;
                }
            }).ToArray();
            this.onDpsEvent();
        }

        /**
         * @初始化敌人角色.
         * @by zhu_jun,2017.02.21.
         */
        public initEnemy() {
            this.enemyDB = new Model.DragonBones(this.enemyGroup,
                Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].DBJson,
                Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].DBPngJson,
                Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].DBPng,
                Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].st.dragonBones,
                640, 360);//1280,720//640,360
            this.enemyDB.play(Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].Idle, 0);
        }

        /**
         * @点击按钮事件.
         */
        private onClickBtn(evt?: egret.TouchEvent): void {
            this.clickFrequence++;
            this.clickEffect(evt ? evt : null);
            this.initPlayerAttack();//主角攻击,隐藏待机,回调关攻击,显示待机.
            Model.AudioService.Shared().PlaySound(Model.PlayerLocalService.PlayerData.st.playerAttackAudio);
            this.cutHp(true);
        }

        /**
         * @减血事件.
         * @触发点击伤害.
         * @减血.
         * @更新UI
         */
        public cutHp(_isClick: boolean = false) {
            // alert("this.cutFlag " + this.cutFlag);
            // alert("this.cheatFlag " + this.cheatFlag);
            if (this.cutFlag && this.cheatFlag) {
                this.cutHpAnim(_isClick, (damage: number) => {
                    //此段作为正常扣血
                    Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].AddHp = -damage;//model层扣血.
                    this.setMonsterHp();
                    if (Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hp <= 0) {//当前怪的血够小于零，说明怪物已经死亡.                    
                        // alert("enemyKilled ! ");
                        this.enemyKilled(() => {
                            // alert("Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType " + Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType);

                            if (Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType == Model.MonsterType.MONSTER_TYPE_BOSS) {//如果是boss死了，切换整组怪物数据.
                                this.bossDeathEvent();
                                Model.SceneLocalService.setNextSceneData();//更新关卡数据.
                                this.setSceneIndex();
                                this.changeScene();
                                Model.MonsterLocalService.setMonsterData();
                                //保护挚友 by cai_haotian 2016.3.21
                                if (!Model.PlayerLocalService.PlayerData.protectFriend) {
                                    Model.FriendLocalService.sealFriendAndSkills();//判断是否触发挚友技能锁定。
                                }
                            } else {
                                // alert("Model.SceneLocalService.SceneData.currentMonster " + Model.SceneLocalService.SceneData.currentMonster);
                                Model.SceneLocalService.SceneData.currentMonster++;
                            }
                        });//先死后加index.
                    } else {
                        if (Model.WebServiceBase.isDebug) {
                            // console.log("zhujun: monster have been alive ! ");
                        }

                    }
                });
            }
        }

        /**
         * @改变场景.
         */
        private changeScene() {
            //            //判断当前关卡号.
            //            if(parseInt(Model.SceneLocalService.SceneData.sceneId.sceneId) >= Model.PlayerLocalService.PlayerData.st.startScene){
            //                //TODO:在这里改。
            ////                Model.SceneLocalService.
            //            }
            if (Model.SceneLocalService.SceneData.st.sceneName) {
                var titleMsg: ScrollMsgVM = new ScrollMsgVM(this.uiLayer, (_bUILayer) => {
                    _bUILayer.removeChild(titleMsg);
                }, Model.SceneLocalService.SceneData.st.sceneName);
            }
            if (Model.SceneLocalService.SceneData.st.scenePic) {
                this.bg.source = Model.SceneLocalService.SceneData.st.scenePic;
            } else {
                var scenePid = Math.ceil(Model.SceneLocalService.SceneData.st.id / 5);
                this.bg.source = "scene_pic_" + scenePid;
            }
        }

        /**
         * @扣血动画.
         */
        private cutHpAnim(_isClick: boolean, _onAnimFinish: Function) {
            var critFactor: number = Model.Mathf.random(0, 100);
            var damage: number = 0;
            if (_isClick) {
                //飘血动画.
                var cutHpItem: ViewModel.CutHpItemVM = new ViewModel.CutHpItemVM(this.levelUpLight);
                if (critFactor <= Model.PlayerLocalService.PlayerData.CritRate) {//暴击.
                    cutHpItem.y = 200;
                    damage = Model.PlayerLocalService.PlayerData.CritDamage;
                    var damgeUnit = Model.MainLocalService.toUnitConversion(Number(damage));
                    Model.PlayerLocalService.setPerSecondTapDamage(Number(damage));
                    cutHpItem.setCriticalAttack(damgeUnit, damage);//暴击显示
                    this.shockTool.shock(this, 3);
                } else {
                    cutHpItem.y = 270;
                    damage = Model.PlayerLocalService.PlayerData.dy.clickDamage;
                    var damgeUnit = Model.MainLocalService.toUnitConversion(Number(damage));
                    Model.PlayerLocalService.setPerSecondTapDamage(Number(damage));
                    cutHpItem.setNoramlAttack(damgeUnit, damage);//普通攻击
                }
                cutHpItem.x = 900 - cutHpItem.width / 2;//by zhu_jun,2017.03.01.
            } else {
                // cutHpItem.y = 270;
                damage = Model.PlayerLocalService.PlayerData.dy.friendDamage;
            }
            _onAnimFinish(damage);
        }

        /**
         * 点击特效
         */
        private clickEffect(evt?: egret.TouchEvent): void {//
            if (evt) {
                this.tapEffect.x = evt.stageX - this.tapEffect.width / 2;
                this.tapEffect.y = evt.stageY - this.tapEffect.height / 2;
            } else {
                this.tapEffect.x = Model.Mathf.random(0, this.stage.width - this.tapEffect.width / 2);
                this.tapEffect.y = Model.Mathf.random(0, this.stage.height - this.tapEffect.height / 2);
            }

            this.tapEffect.visible = true;
            egret.setTimeout(() => {
                this.tapEffect.visible = false;
            }, this, 80);
        }

        /**
         * @秒伤监听事件.(初始化完挚友执行.)
         */
        private onDpsEvent() {
            this.cutHp(false);
            egret.setTimeout(() => {//触发秒伤伤害.
                this.onDpsEvent();
            }, this, 1000 - Model.PlayerLocalService.PlayerData.friendFrameRate);
        }

        /**
         * @主角待机动画.
         * @by zhu_jun,2017.02.21.
         */
        private initPlayerIdle() {
            this.playerDB = new Model.DragonBones(this.guanyuGroup,
                Model.PlayerLocalService.PlayerData.DBJson,
                Model.PlayerLocalService.PlayerData.DBPngJson,
                Model.PlayerLocalService.PlayerData.DBPng,
                Model.PlayerLocalService.PlayerData.st.playerDragonBones,
                640, 360);
            this.playerDB.play(Model.PlayerLocalService.PlayerData.PlayerIdle, 0);
        }

        /**
         * @主角攻击动画.
         */
        private initPlayerAttack() {
            this.onAttackAnim(this.playerDB, Model.PlayerLocalService.PlayerData.PlayerAttack, () => {
                this.playerDB.play(Model.PlayerLocalService.PlayerData.PlayerIdle, 0);
            });
            this.onAttackEffect(this.yungeClickEffectGroup, //by zhu_jun,2017.02.26.
                [Model.PlayerLocalService.PlayerData.Effect,
                Model.PlayerLocalService.PlayerData.EffectPngJson,
                Model.PlayerLocalService.PlayerData.EffectPng,
                Model.PlayerLocalService.PlayerData.st.playerEffect]);
        }

        /**
         * @选择挚友动画
         */
        public switchFriend(_data: Model.FriendData) {
            switch (_data.dy.friendId) {
                case 1: this.friendAnimal(this.baiheGroup, _data);
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
        }

        /**
         * @初始化单个挚友动画.
         */
        private friendAnimal(_uiGroup: eui.Group, _data: Model.FriendData) {
            if (_data.dy.sealCD > 0) {//无论有没有对象，都要判断是否已经封印,初始化的时候是没有对象的.
                _uiGroup.visible = false;
            } else {
                _uiGroup.visible = true;
            }
            if (_uiGroup.numChildren > 0) {//大于0则显示隐藏之后直接return.
                if (Model.WebServiceBase.isDebug) {
                    console.log("zhujun: 大于0则是更新挚友，挚友挚友更新的时候才存在现实隐藏 ! ");
                }
                return;
            }
            var friendDB = new Model.DragonBones(_uiGroup,//mc改db by zhu_jun.
                _data.DBJson,
                _data.DBPngJson,
                _data.DBPng,
                _data.st.dragonBones,
                640, 360);
            this.playerDB.play(_data.Idle, 0);
            // _item.initMovieClip(_data.IdleJson, _data.IdlePng, _data.st.idle);//待机动画by zhu_jun,2017.02.26.
            egret.setInterval(() => {//攻击动画
                //TODO:by zhu_jun,mc改db.
                this.onAttackAnim(friendDB, _data.Attack, () => {
                    console.log("zhujun: friend _data.name " + _data.st.name + " play attack effect ! ");
                    this.onAttackEffect(_uiGroup,
                        [_data.Effect, _data.EffectPngJson, _data.EffectPng, _data.st.effect], () => { });
                });
                Model.AudioService.Shared().PlaySound(_data.st.attackAudio);
            }, this, Model.Mathf.random(Model.PlayerLocalService.PlayerData.st.effectTimeMin * 1000, Model.PlayerLocalService.PlayerData.st.effectTimeMax * 1000));

        }

        /**
         * @播放攻击动画.
         * @by zhu_jun,2017.02.21.mc改龙骨.
         */
        private onAttackAnim(_db: Model.DragonBones, _actionName: string, _onCallBack: Function = null) {
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
        }

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
        private onAttackEffect(_uiGroup: eui.Group, _data: string[], _onCallBack: Function = null) {
            if (Model.WebServiceBase.isDebug) {
                console.log("zhujun: on attack effect start !  " + JSON.stringify(_data));
            }
            var roleDB: Model.DragonBones = new Model.DragonBones(_uiGroup,
                _data[0], _data[1], _data[2], _data[3], 640, 360);
            roleDB.play(_data[3], 1, (evt: dragonBones.AnimationEvent) => {
                _uiGroup.removeChild(evt.armature.display);
                dragonBones.WorldClock.clock.remove(evt.armature);
                evt.armature.dispose();
                if (_onCallBack != null) _onCallBack();
                if (Model.WebServiceBase.isDebug) console.log("zhujun: attack effect play finished ! ");
            });
        }

        /**
         * @改变敌人.
         */
        public changeEnemy(_index: number) {
            if (Model.WebServiceBase.isDebug) {
                console.log("zhujun: change Enemy " + _index + " Model.MonsterLocalService.MonsterList[_index].DBJson " + Model.MonsterLocalService.MonsterList[_index].DBJson);
            }
            // this.enemyDB.armature.dispose();
            this.enemyDB.changeArmature(Model.MonsterLocalService.MonsterList[_index].DBJson,
                Model.MonsterLocalService.MonsterList[_index].DBPngJson,
                Model.MonsterLocalService.MonsterList[_index].DBPng,
                Model.MonsterLocalService.MonsterList[_index].st.dragonBones
            );
            this.enemyDB.play(Model.MonsterLocalService.MonsterList[_index].Idle);
        }

        /**
         * @金币掉落.
         */
        private goldDrop() {
            var dropMoney = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].dropMoney;
            var dropMoneyAndUnit = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].DropMoneyAndUnit;
            this.onGoldAnimel(dropMoney, dropMoneyAndUnit);
        }

        /**
         * @灵石掉落.
         */
        private jewelDrop() {
            if (Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType == Model.MonsterType.MONSTER_TYPE_BOSS) {//判断当前怪是不是boss.
                var bossDropJewelProbability = Model.Mathf.random(0, 10000);
                if (bossDropJewelProbability < Model.PlayerLocalService.PlayerData.st.bossDropJewelProbability) {
                    this.jewelAnimel(Model.PlayerLocalService.PlayerData.st.bossDropJewelCount, Model.PlayerLocalService.PlayerData.st.bossDropJewelCount + "");
                };
            }
        }

        /**
         * @敌人死亡时动画
         * @by zhu_jun,2017.02.21.去掉活动相关.
         * @by zhu_jun,2017.02.26.修改动画相关.
         */
        public enemyKilled(_onKilled: Function) {
            // alert("go in enemyKilled ");
            //这段作为正常游戏流程的调用
            //调用成就方法 by cai_haotian 
            this.achievement();
            if (Model.WebServiceBase.isDebug) {
                console.log("zhujun: enemy killed ! ");
            }
            this.cutFlag = false;//先停止点击事件 by cai_haotian 2016.3.8.
            this.goldDrop();//要在怪物死亡后，切换index之前调用金币模块.
            this.jewelDrop();//如果为Boss则有几率掉落灵石.
            var effect: Model.MovieClipService = new Model.MovieClipService(this.enemyGroup);//by zhu_jun,2017.02.26.

            effect.initMovieClip("Tx_siwang_json", "Tx_siwang_png", "Tx_siwang", 1, () => {
                // alert("_onKill call back ! " + Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType);
                this.enemyGroup.removeChild(effect.movieClip);
                _onKilled();
                if (Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].MonsterType == Model.MonsterType.MONSTER_TYPE_BOSS) {//判断当前怪是不是boss.
                    this.swardIcon.visible = false;//关小剑.
                    this.bossInfoGroup.visible = true;//显示倒计时，逃跑按钮，进度条
                    this.countTimeImage.visible = true;//显示倒计时 by cai_haotian 2016.4.18
                    this.countTimeLabel.visible = true;//显示进度条 by cai_haotian 2016.4.18
                    this.bossBtn.currentState = "down";//设置按钮显示 by cai_haotian 2016.4.18
                    //倒计时初始化.                    
                    this.setCountDown(() => {
                        if (Model.WebServiceBase.isDebug) {
                            console.log("zhujun: boss倒计时结束,进入刷怪模式 ! ");
                        }
                        Model.MonsterLocalService.setFarmMonsterData();
                        Model.SceneLocalService.SceneData.currentMonster = 0;//强制切换怪物.
                        this.changeEnemy(Model.SceneLocalService.SceneData.currentMonster);//怪物死后调用
                        this.setMonsterHp();//倒计时到了,强制切换怪物数据，更新UIhp.

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
                        }
                        );
                    });
                } else {
                    if (Model.SceneLocalService.SceneData.currentMonster == Model.SceneLocalService.SceneData.monsterCount - 1) {//如果最后一位非boss,则是循环模式.
                        // alert("1");
                        Model.MonsterLocalService.setFarmMonsterData();
                        Model.SceneLocalService.SceneData.currentMonster = 0;//强制切换怪物.
                    } else {
                        //  alert("2");
                        if (Model.WebServiceBase.isDebug) {
                            console.log("zhujun: 这边进入了循环战斗,UI应该不变,等点击按钮时,修改数据,切换回挑战boss ! ");
                        }

                    }
                }
                this.setMonsterHp();//普通怪物死亡更新UIhp.
                this.changeEnemy(Model.SceneLocalService.SceneData.currentMonster);//怪物死后调用
                this.setMonsterIndex();
                this.cutFlag = true;//重新开始扣血事件 by cai_haotian 2016.3.8.
                this.commitAuto();//自动提交数据
            }, false);//TODO: by zhu_jun，这边应该传false，进帧事件.
            effect.ScaleX = 1.5;
            effect.ScaleY = 1.5;
            effect.X = 900;
            effect.Y = 300;
        }

        /**
         * @敌人被攻击时动画
         * @by zhu_jun,2017.02.21.
         */
        public enemyHit() {
            console.log("zhujun： enemy Hit " + Model.SceneLocalService.SceneData.currentMonster);
            //之前这边是两个mc，播完受击动作需要切换mc回到待机动作.现在播一次攻击会默认回到循环待机.
            this.enemyDB.play(Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].Hit, 1, () => {
                this.enemyDB.play(Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].Idle);
            });
            var enemyHit: Model.MovieClipService = new Model.MovieClipService(this.levelUpLight);//敌人受到攻击时的特效.by zhu_jun,2017.02.06.
            var enemyHitMc = enemyHit.initMovieClip("Tx_shouji_json", "Tx_shouji_png", "Tx_shouji", 1, () => {
                if (Model.WebServiceBase.isDebug) ("remove enemy hit mc ! ");
                this.levelUpLight.removeChild(enemyHitMc);//移除受击特效.
            });
            enemyHit.X = 920;//这个是对着界面调整的.
            enemyHit.Y = 300;
            enemyHit.ScaleX = 1.5;
            enemyHit.ScaleY = 1.5;
        }

        /**
         * @金币动画.
         */
        public onGoldAnimel(_goldAdd: number, _goldAddAndUnit: string) {
            var max = Model.Mathf.random(1, 5);
            for (var i = 0; i < max; i++) {//控制掉过个数
                var coin: eui.Image = new eui.Image();
                coin.source = "icon_yinbi_png";
                coin.x = 500;
                coin.y = 300;
                var endRandomX = Model.Mathf.random(0, 600);//掉落终点的x坐标
                var bezierP1X = endRandomX + Model.Mathf.random(-100, 100);//返回时贝塞尔曲线的P1点x坐标 Y坐标在TweenCustom中固定
                var startPos: Model.Vector2 = new Model.Vector2(300, 300);//设置出现点的起始坐标
                var endPos: Model.Vector2 = new Model.Vector2(endRandomX, Model.Mathf.random(530, 550));//设置掉落点的终点坐标
                var finalPos: Model.Vector2 = new Model.Vector2(225, 155);//金币最终飞到的坐标
                var tween = new Model.TweenCustom(coin, this.goldAndTextGroup, startPos, endPos, finalPos);//进行掉落返回曲线的函数   
                tween.sAnimTime = Model.Mathf.random(1200, 1400);//总时长
                tween.bezierP1X = bezierP1X;//设置回收动画，贝塞尔曲线的P1点x坐标
                var recycleCallBack = (_bTween: Model.TweenCustom) => {
                    _bTween.obj.touchEnabled = false;
                    this.addHpText(_bTween, _goldAddAndUnit);
                    _bTween.GoldRecycleAnim(() => {
                        Main.singleton.mainMenuVM.goldAnimelStart();//点击后播放呼吸动画
                        Model.PlayerLocalService.PlayerData.AddGold = _goldAdd; //收到钱后更新金币数量
                        //调用成就 by cai_haotian 2016.4.5
                        Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_COIN, _goldAdd);
                    });
                }
                tween.GoldProductionAnim((_bTween: Model.TweenCustom) => {
                    var waitBackAnim = egret.setTimeout(() => {
                        recycleCallBack(_bTween);
                        egret.clearTimeout(waitBackAnim);
                    }, this, _bTween.goldWaitTime);

                    _bTween.obj.once(egret.TouchEvent.TOUCH_TAP, () => {
                        recycleCallBack(_bTween);
                        egret.clearTimeout(waitBackAnim);
                    }, this);
                });//开启掉落曲线.
            }
        }

        /**
         * @处理显示钱币
         */
        private addHpText(_tween: Model.TweenCustom, _goldAddAndUnit: string) {
            var label = new eui.BitmapLabel();
            label.font = RES.getRes("gold-font_fnt");
            label.text = _goldAddAndUnit;
            label.x = _tween.ePos.x - label.textWidth / 2;
            label.y = _tween.ePos.y - _tween.obj.height;
            Main.singleton.mainMenuVM.addChild(label);
            egret.Tween.get(label).to({ y: 350, alpha: 0 }, 1200).call(() => {
                Main.singleton.mainMenuVM.removeChild(label);
            });
        }

        /**
         * @灵石动画.
         */
        public jewelAnimel(_jewelAdd: number, _jewelAddAndUnit: string) {
            var jewel: eui.Image = new eui.Image();
            jewel.source = "icon_lingshi_png";
            jewel.width = 23;
            jewel.height = 23;
            jewel.x = 500;
            jewel.y = 300;
            Main.singleton.mainMenuVM.addChild(jewel);
            var endRandomX = Model.Mathf.random(0, 600);//掉落终点的x坐标
            var bezierP1X = endRandomX + Model.Mathf.random(-100, 100);//返回时贝塞尔曲线的P1点x坐标 Y坐标在TweenCustom中固定
            var startPos: Model.Vector2 = new Model.Vector2(300, 300);//设置出现点的起始坐标
            var endPos: Model.Vector2 = new Model.Vector2(endRandomX, Model.Mathf.random(530, 550));//设置掉落点的终点坐标
            var finalPos: Model.Vector2 = new Model.Vector2(266, 387);//灵石最终飞入坐标
            var tween = new Model.TweenCustom(jewel, this.goldAndTextGroup, startPos, endPos, finalPos);//进行掉落返回曲线的函数      
            tween.sAnimTime = Model.Mathf.random(1200, 1400);//总时长
            tween.bezierP1X = bezierP1X;//设置回收动画，贝塞尔曲线的P1点x坐标
            var recycleCallBack = (_bTween: Model.TweenCustom) => {
                _bTween.obj.touchEnabled = false;
                this.addJewelText(_bTween, _jewelAddAndUnit);
                _bTween.GoldRecycleAnim(() => {
                    Model.PlayerLocalService.PlayerData.AddJewel = Number(_jewelAdd); //收到钱后更新金币数量
                    //调用成就 2016.4.5
                    Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_GET_JEWEL, Number(_jewelAdd));
                });
            }
            tween.GoldProductionAnim((_bTween: Model.TweenCustom) => {
                var waitBackAnim = egret.setTimeout(() => {
                    recycleCallBack(_bTween);
                    egret.clearTimeout(waitBackAnim);
                }, this, _bTween.goldWaitTime);

                _bTween.obj.once(egret.TouchEvent.TOUCH_TAP, () => {
                    recycleCallBack(_bTween);
                    egret.clearTimeout(waitBackAnim);
                }, this);
            });//开启掉落曲线.
        }

        /**
         * @处理显示灵石
         */
        private addJewelText(_tween: Model.TweenCustom, _goldAddAndUnit: string) {
            var label = new eui.BitmapLabel();
            label.font = RES.getRes("gold-font_fnt");
            label.text = _goldAddAndUnit;
            label.x = _tween.ePos.x - label.textWidth / 2;
            label.y = _tween.ePos.y - _tween.obj.height;
            Main.singleton.mainMenuVM.addChild(label);
            egret.Tween.get(label).to({ y: 350, alpha: 0 }, 1200).call(() => {
                Main.singleton.mainMenuVM.removeChild(label);
            });
        }

        /**
         * @自动提交方法
         * @by cai_haotian 2016.3.30
         */
        private commitAuto() {
            this.commitFlag++;
            if (this.commitFlag == 10) {
                this.commitFlag = 0;
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
                })
            }
        }

        /**
         * @怪物与成就相关数据
         * @by cai_haotian 2016.4.5
         */
        private achievement() {
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
        }

        /*******************************************SceneInfoVM******************************************/
        /**
 * @boss血条.
 */
        public bossHp: ViewModel.ProgressHp;
        /**
         * @剩余时间条.
         */
        public countTimeImage: eui.Image;
        /**
        *@剩余时间数值显示
        */
        public countTimeLabel: eui.Label;
        // /**
        //  * @玩家拥有金币
        //  */
        // public charMoney: eui.BitmapLabel;
        /**
         * @boss挑战切换按钮.
         */
        public bossBtn: eui.ToggleButton;
        /**
         * @当前闯关数
         */
        public sceneNumLabel: eui.Label;
        /**
         * @当前关数
         */
        public currentRound: eui.Label;
        /**
         * @当前关数图片 
         */
        public currentImage: eui.Image;
        /**
         * @前一关数
         */
        public preRound: eui.Label;
        /**
         * @前一关数图片
         */
        public preImage: eui.Image;
        /**
         * @下一关数
         */
        public nextRound: eui.Label;
        /**
         * @下一关数图片
         */
        public nextImage: eui.Image
        /**
         * @金币
         */
        public gold: eui.Image;
        /**
         * @剑
         */
        public swardIcon: eui.Image;
        /**
         * @boss血量数字.
         */
        public bossHpLabel: eui.Label;
        /**
         * @boss详情父节点.
         */
        public bossInfoGroup: eui.Group;
        /**
         * @boss计时器声明.
         */
        private bossTimer: egret.Timer;

        /**
         * @boss倒计时结束事件.
         */
        public onTimeLeft: Function = null;
        /**
         * @当前剩余时间.
         */
        private currentLeftTime: number = 0;
        /**
         * @倒计时次数.
         */
        private countDownTimes: number;
        /**
         * @进度条减去的每份长度.
         */
        private countTimePercent: number;
        /**
         * @正常ui显示组
         * @by cai_haotian 2016.4.18
         */
        private currentInfo: eui.Group;

        //        protected childrenCreated() {
        //     super.childrenCreated();

        // }

        public initMainGameInfo() {
            this.setMoney(Model.PlayerLocalService.PlayerData.GoldAndUnit);
            this.setMonsterIndex();
            this.setSceneIndex();
            this.setMonsterHp();

            this.bossBtn.addEventListener(egret.Event.CHANGE, this.bossBtnEvent, this);
            //            this.bossBtn.currentState = "upAndSelected";
            //            console.log("zhujun bossBtn 默认状态: " + this.bossBtn.selected);//默认是false.
        }


        /**
         * @boss按钮切换事件.
         * @false:逃跑状态,进入方法变true,按钮变绿,倒计时去掉.
         * @true:挑战状态,进入方法变false,按钮变红,
         */
        public bossBtnEvent() {
            if (this.bossBtn.selected) {//true: 执行true的方法.
                this.timeLeftComplete();//重置倒计时.
            } else {//false: 默认是逃跑状态.这里是点击按钮重新过来挑战boss.
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
        }

        /**
         * @boss死亡事件.
         * @切换回普通战斗.
         */
        public bossDeathEvent() {
            //终止所有计时.
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER, this.timeLeftEvent, this);
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeLeftComplete, this);
            this.bossTimer.stop();
            //            this.bossBtn.removeEventListener(egret.Event.CHANGE,this.bossBtnEvent,this);
            //重置为正常战斗UI.
            this.swardIcon.visible = true;//关小剑.
            this.bossInfoGroup.visible = false;//显示倒计时，逃跑按钮，进度条
            this.sceneNumLabel.visible = true;
        }

        /**
         * @倒计时到0,或者点击逃跑,UI重置.
         */
        public runAwayEvent() {
            this.bossBtn.currentState = "downAndSelected";//"down";
            this.countTimeLabel.visible = false;
            this.countTimeImage.visible = false;
            this.sceneNumLabel.visible = false;
            this.swardIcon.visible = false;
        }

        /**
         * @设置金币.
         * @TODO: by zhu_jun,2017.02.19.
         */
        public setMoney(_value: string) {
            // this.charMoney.font = RES.getRes("gold-show-font_fnt");
            // this.charMoney.text = _value;
            if (this.onCallBack) this.onCallBack();  // Main.singleton.mainMenuVM.refreshMenu();//改钱之后，会更新相关模块UI.执行的是刷新.

        }

        /**
         * @设置怪物index.
         * @怪物切换时候更新.
         */
        public setMonsterIndex() {
            this.sceneNumLabel.text = String(Model.SceneLocalService.SceneData.currentMonster + 1 + "/" + Model.SceneLocalService.SceneData.monsterCount);
        }

        /**
         * @设置关卡序号.
         */
        public setSceneIndex() {
            this.preRound.text = String(Model.SceneLocalService.SceneData.sceneId - 1);
            this.currentRound.text = Model.SceneLocalService.SceneData.sceneId + "";
            this.nextRound.text = String(Model.SceneLocalService.SceneData.sceneId + 1);
            //TODO: by zhu_jun,2017.02.20.关卡id背景不变了.
            // this.preImage.source = String("guanshu_" + String((Model.SceneLocalService.SceneData.sceneId - 1) % 3));
            // this.currentImage.source = String("guanshu_" + String(Model.SceneLocalService.SceneData.sceneId % 3));
            // this.nextImage.source = String("guanshu_" + String((Model.SceneLocalService.SceneData.sceneId + 1) % 3));
            //调用成就 2016.4.5
            Model.AchievementLocalService.setCurrentGet(Model.AchievementType.ACHIEVEMENT_TYPE_ARRIVE_SCENE, Model.SceneLocalService.SceneData.sceneId);
        }

        /**
         * @设置boss血量.
         */
        public setMonsterHp() {
            var hp: number = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hp;
            var hpMax: number = Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].hpMax;
            if (hp == hpMax) {
                this.bossHp.slideDuration = 0;
            } else {
                this.bossHp.slideDuration = 500;//0
            }
            this.bossHpLabel.text = String(Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].HpAndUnit
                + "/"
                + Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].HpMaxAndUnit);
            this.bossHp.maximum = hpMax;
            this.bossHp.minimum = 0;
            //            console.log("1111111:" + hp)
            this.bossHp.value = hp;
        }

        /**
         * @设置挑战boss血量
         * @by cai_haotian 2016.4.15.
         */
        public setChallengeBoss() {
            var hpMax: number = Model.ChallengeLoaclService.challengeBossData.hpMax;
            var hp: number = Model.ChallengeLoaclService.challengeBossData.hp;
            if (hp == hpMax) {
                this.bossHp.slideDuration = 0;
            } else {
                this.bossHp.slideDuration = 500;//0
            }
            var leftHp = Model.MainLocalService.toUnitConversion(hp);
            var maxHp = Model.ChallengeLoaclService.challengeBossData.GetHpMax
            this.bossHpLabel.text = leftHp + "/" + maxHp;
            this.bossHp.maximum = hpMax;
            this.bossHp.minimum = 0;
            this.bossHp.value = hp;
        }

        /**
         * @设置倒计时.
         */
        public setCountDown(_onTimeLeft: Function, _time?: number) {
            if (_time) {

            } else {
                this.onTimeLeft = _onTimeLeft;
            }
            this.currentLeftTime = _time ? _time : Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].leftTime;
            this.countTimeImage.width = 220;

            this.countDownTimes = _time ? _time * 1000 / 100 : Model.MonsterLocalService.MonsterList[Model.SceneLocalService.SceneData.currentMonster].leftTime * 1000 / 100
            this.countTimePercent = 220 / this.countDownTimes;
            this.bossTimer = new egret.Timer(100, this.countDownTimes);//0.1秒更新一次记时条.
            if (_time) {

            } else {
                this.bossTimer.addEventListener(egret.TimerEvent.TIMER, this.timeLeftEvent, this);
                this.bossTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeLeftComplete, this);
                this.bossTimer.start();
            }
        }



        /**
         * @剩余时间.
         */
        private timeLeftEvent() {
            this.currentLeftTime -= 0.1;
            this.countTimeLabel.text = this.currentLeftTime.toFixed(1);
            this.countTimeImage.width -= this.countTimePercent;
            console.log("每100毫秒执行一次!");
        }

        /**
         * @剩余时间结束时调用.
         */
        public timeLeftComplete() {
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER, this.timeLeftEvent, this);
            this.bossTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeLeftComplete, this);
            this.bossTimer.stop();
            this.runAwayEvent();
            if (this.onTimeLeft) this.onTimeLeft();
        }



    }
}